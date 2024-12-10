import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
 
  private url = 'http://localhost:5115/productos';
  
  constructor(private http : HttpClient) {}

  eliminarProductos(id: number):  Observable<any> {
    return this.http.delete<any>(`${this.url}/eliminar/${id}`);

  }


  agregarProductos(productoData:any): Observable<any> {

    return this.http.post<any>(this.url+'/agregar', productoData);
  }


  modificarProducto(productoData:any): Observable<any> {

    return this.http.put<any>(this.url+'/modificar', productoData);
  }

}
