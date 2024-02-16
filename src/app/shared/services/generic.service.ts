import { GenericModel } from '../models/generic.model';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Config } from '../../../config';
import { Injector } from '@angular/core';

export abstract class GenericService<T extends GenericModel> {

  protected http: HttpClient;
  protected apiPath = new Config().apiPath(this.ressource);

  constructor(
    protected ressource: string,
    protected injector: Injector
  ) {
    this.http = injector.get(HttpClient);
  }

  create(resource: T): Observable<T> {
    return this.http
      .post(this.apiPath, resource)
      .pipe(map(this.jsonDataToModel), catchError(this.handleError));
  }

  getById(id: number): Observable<T> {
    return this.http
      .get(`${this.apiPath}/${id}`)
      .pipe(map(this.jsonDataToModel), catchError(this.handleError));
  }

  getAll(pageNumber: number, pageSize: number): Observable<any> {
    return this.http
      .get(`${this.apiPath}?pageNumber=${pageNumber}&pageSize=${pageSize}`)
      .pipe(map(this.jsonDataToResponse), catchError(this.handleError));
  }

  update(resource: T): Observable<T> {
    return this.http
      .put(`${this.apiPath}/${resource.id}`, resource)
      .pipe(map(this.jsonDataToModel), catchError(this.handleError));
  }

  delete(id: number | undefined): Observable<any> {
    return this.http.delete(`${this.apiPath}/${id}`).pipe(
      map(() => null),
      catchError(this.handleError)
    );
  }

  protected jsonDataToResponse(jsonData: any): Observable<any> {
    return jsonData;
  }

  protected jsonDataToModel(jsonData: any): T {
    return jsonData as T;
  }

  protected handleError(error: any): Observable<any> {
    console.log('ERRO NA REQUISIÇÃO => ', error);
    return throwError(() => error);
  }
}
