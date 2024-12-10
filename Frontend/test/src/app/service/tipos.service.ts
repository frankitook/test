import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TiposService {
  private url = 'http://localhost:5115/tipos';

  constructor(private http: HttpClient) {}

  obtenerTipos(): Observable<any> {
    return this.http.get<any>(this.url);
  }
}
