import { catchError, map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'
import { HttpClient } from '@angular/common/http';
import { Product } from './product.model';
import { EMPTY, Observable } from 'rxjs';


@Injectable({
  // root -> O service será disponível a toda a aplicação
  providedIn: 'root'
})
export class ProductService {

  // Django backend
  baseUrl = "http://127.0.0.1:8000/products/"

  // Node backend
  // baseUrl = "http://localhost:3001/products/"

  constructor(
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) { }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: isError ? ['msg-error'] : ['msg-success'] // Add class based on isError value
    });
  }

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product).pipe(
      map((obj) => {
        obj
      }),
      catchError((e) => this.errorHandler(e))
    )
  }

  read(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl).pipe(
      tap((obj) => {
        console.log("RECEIVING OBJECT: ", { obj })
      }),
      catchError((e) => this.errorHandler(e))
    );
  }

  readyById(id: number): Observable<Product> {
    // const url = `${this.baseUrl}/${id}`
    const url = `${this.baseUrl}${id}/`
    return this.http.get<Product>(url)
  }

  update(product: Product): Observable<Product> {
    // const url = `${this.baseUrl}/${product.id}`
    const url = `${this.baseUrl}${product.id}/`
    return this.http.put<Product>(url, product).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    )
  }

  delete(id: number): Observable<Product> {
    // const url = `${this.baseUrl}/${id}`
    const url = `${this.baseUrl}${id}/`
    return this.http.delete<Product>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    )
  }

  errorHandler(e: any): Observable<any> {
    this.showMessage('Ocorreu um erro!', true)
    return EMPTY
  }
}
