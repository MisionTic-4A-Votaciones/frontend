import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Party } from '../models/party.model';

@Injectable({
  providedIn: 'root'
})
export class PartiesService {

  constructor(private http: HttpClient) { }

  list(): Observable<Party[]> {
    return this.http.get<Party[]>(`${environment.url_api_gateway}/parties`);
  }

  getOne(id: String): Observable<Party> {
    return this.http.get<Party>(`${environment.url_api_gateway}/party/${id}`);
  }

  create(party: Party){
    return this.http.post<Party>(`${environment.url_api_gateway}/party/insert`, party)
  }

  edit(id: String, party: Party){
    return this.http.put<Party>(`${environment.url_api_gateway}/party/update/${id}`, party)
  }

  delete(id: String){
    return this.http.delete<Party>(`${environment.url_api_gateway}/party/delete/${id}`)
  }
}
