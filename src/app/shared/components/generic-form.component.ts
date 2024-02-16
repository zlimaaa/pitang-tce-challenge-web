import {
  OnInit,
  AfterContentChecked,
  Injector,
  Injectable,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { switchMap } from 'rxjs';
import toastr from 'toastr';

import { GenericModel } from '../models/generic.model';
import { GenericService } from '../services/generic.service';
import { Conversions } from '../../utils/conversions';

@Injectable({
  providedIn: 'root',
})
export abstract class GenericFormComponent<T extends GenericModel>
  implements OnInit, AfterContentChecked
{
  currentAction: string = '';
  pageTitle: string = '';
  submittingForm: boolean = false;
  form: FormGroup;

  protected route: ActivatedRoute;
  protected router: Router;
  protected formBuilder: FormBuilder;
  protected primeNGConfig: PrimeNGConfig;

  protected translateCalendar() {
    this.primeNGConfig.setTranslation(Conversions.calendarPtBr());
  }

  constructor(
    protected injector: Injector,
    public resource: T,
    private resourceName: string,
    protected resourceService: GenericService<T>,
    protected jsonDataToResourceFn: (jsonData: any) => T
  ) {
    this.route = this.injector.get(ActivatedRoute);
    this.router = this.injector.get(Router);
    this.formBuilder = this.injector.get(FormBuilder);
    this.primeNGConfig = this.injector.get(PrimeNGConfig);
    this.form = this.formBuilder.group({});
  }

  ngOnInit(): void {
    this.setCurrentAction();
    this.loadResource();
    this.buildForm();
    this.translateCalendar();
  }

  ngAfterContentChecked(): void {
    this.setPageTitle();
  }

  get field() {
    return this.form.controls;
  }

  submitForm() {
    this.submittingForm = true;

    if (this.currentAction == 'new') this.createResource();
    else this.updtateResource();
  }

  protected setCurrentAction() {
    if (this.route.snapshot.url[0].path == 'new') {
      this.currentAction = 'new';
    } else if (this.route.snapshot.url.length == 2) {
      this.currentAction = 'edit';
    } else {
      this.currentAction = 'view';
    }
  }

  protected setPageTitle() {
    if (this.currentAction == 'new')
      this.pageTitle = `Cadastro de ${this.resourceName}`;
    else if (this.currentAction == 'edit')
      this.pageTitle = `Atualização de ${this.resourceName}`;
    else this.pageTitle = `Vizualição de ${this.resourceName}`;
  }

  protected loadResource() {
    if (this.currentAction != 'new') {
      this.route.paramMap
        .pipe(
          switchMap((params) =>
            this.resourceService.getById(this.castNumber(params.get('id')))
          )
        )
        .subscribe({
          next: (resource) => {
            this.resource = resource;
            this.form.patchValue(resource);
          },
          error: (error) => toastr.error(error.error.message),
        });
    }
  }

  protected createResource() {
    const resource: T = this.jsonDataToResourceFn(this.form.value);

    this.resourceService.create(resource).subscribe({
      next: this.actionsForSuccess.bind(this),
      error: this.actionsForError.bind(this),
    });
  }

  protected updtateResource() {
    const resource: T = this.jsonDataToResourceFn(this.form.value);

    this.resourceService.update(resource).subscribe({
      next: this.actionsForSuccess.bind(this),
      error: this.actionsForError.bind(this),
    });
  }

  protected actionsForSuccess(resource: T) {
    if (this.currentAction == 'new')
      toastr.success(`${this.resourceName} cadastrado com sucesso`);
    else toastr.success(`${this.resourceName} atualizado com sucesso`);
    const resourcePath = this.route.snapshot.parent?.url[0].path;
    this.router
      .navigateByUrl(resourcePath == null ? 'users' : resourcePath, {
        skipLocationChange: true,
      })
      .then(() => this.router.navigate([resourcePath, resource.id, 'edit']));
  }

  protected actionsForError(error: any) {
    toastr.error(error.error.message);
    this.submittingForm = false;
  }

  protected abstract buildForm(): void;

  private castNumber(number: string | null): number {
    if (number != null) return +number;
    return 0;
  }

}
