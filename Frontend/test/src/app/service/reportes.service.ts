import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {
 private url = 'http://localhost:5115/reporte';

  constructor(private http : HttpClient) { }

obtenerReportes(): Observable<any> {

return this.http.get<any>(this.url);

}


}
