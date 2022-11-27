import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Result } from '../models/result.model';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {

  constructor(private http: HttpClient) { }

  list(): Observable<Result[]> {
    return this.http.get<Result[]>(`${environment.url_api_gateway}/resuls`);
  }

  getOne(id: String): Observable<Result> {
    return this.http.get<Result>(`${environment.url_api_gateway}/result/${id}`);
  }

  create(result: Result){
    return this.http.post<Result>(`${environment.url_api_gateway}/result/insert`, result)
  }

  edit(id: String, result: Result){
    return this.http.put<Result>(`${environment.url_api_gateway}/result/update/${id}`, result)
  }

  delete(id: String){
    return this.http.delete<Result>(`${environment.url_api_gateway}/result/delete/${id}`)
  }
}
