import { OnInit, Injectable } from '@angular/core';
import toastr from 'toastr';

import { GenericModel } from '../models/generic.model';
import { GenericService } from '../services/generic.service';

@Injectable({
  providedIn: 'root',
})
export abstract class GenericListComponent<T extends GenericModel>
  implements OnInit {
    
  resources: T[] = [];
  page: any = null;
  pageSize: number = 5;
  pageNumber: number = 0;
  pageSizes: number[] = [5, 10, 15, 20];

  constructor(
    private resourceName: string,
    private resourceService: GenericService<T>
  ) {}

  ngOnInit(): void {
    this.loadResources();
  }

  loadResources() {
    this.resourceService.getAll(this.pageNumber, this.pageSize).subscribe({
      next: (response) => {
        this.page = response;
        this.resources = response.content;
      },
      error: this.handleError.bind(this),
    });
  }

  delete(resource: T) {
    const confirmation = confirm(
      `Deseja realmente excluir esse ${this.resourceName}?`
    );

    if (confirmation) {
      this.resourceService.delete(resource.id).subscribe({
        next: () => {
          toastr.success(`${this.resourceName} deletado com sucesso!`);
          this.resources = this.resources.filter(
            (element) => element != resource
          );
        },
        error: this.handleError.bind(this),
      });
    }
  }

  private handleError(error: any) {

    if(error.statusText == 'Unknown Error') {
        toastr.error("Falha ao conectar com o servidor")
    }else if(error.status == '500'){
        toastr.error("Falha interna do servidor")
    }else if(error.status == '403' || error.status == '401') {
      toastr.error("Unauthorized")
    }else {
      toastr.error(error.error.message)
    }
      
  }


  nextPage() {
    if (!this.page.last) {
      this.pageNumber++;
      this.loadResources();
    }
  }

  previousPage() {
    if (!this.page.first) {
      this.pageNumber--;
      this.loadResources();
    }
  }

  changePageSize(event: any) {
    const value = event?.target?.value ?? 5;
    this.pageSize = value;
    this.pageNumber = 0;
    this.loadResources();
  }

  changePage(pageNumber: number) {
    this.pageNumber = pageNumber;
    this.loadResources();
  }

  getTotalPages(): any[] {
    return Array(this.page.totalPages);
  }
}
