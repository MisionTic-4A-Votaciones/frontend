import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Table } from '../models/table.model';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor(private http: HttpClient) { }

  list(): Observable<Table[]> {
    return this.http.get<Table[]>(`${environment.url_api_gateway}/table`);
  }

  getOne(id: String): Observable<Table> {
    return this.http.get<Table>(`${environment.url_api_gateway}/table/${id}`);
  }

  create(table: Table){
    return this.http.post<Table>(`${environment.url_api_gateway}/table/insert`, table)
  }

  edit(id: String, table: Table){
    return this.http.put<Table>(`${environment.url_api_gateway}/table/update/${id}`, table)
  }

  delete(id: String){
    return this.http.delete<Table>(`${environment.url_api_gateway}/table/delete/${id}`)
  }
}
