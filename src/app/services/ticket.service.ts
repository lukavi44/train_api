import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Ticket } from '../train/model/ticket';

const baseUrl: string = "http://localhost:3000/api/tickets";

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private http: HttpClient) { }

  postRequest(ticket: Ticket): Observable<any> {
    return this.http.post(baseUrl, ticket).pipe(
      map((data: any) => {
        return new Ticket(data);
      })
    );
  }

  getAll(params: any): Observable<any> {
    let options = {};
    if (params) {
      options = {
        params: new HttpParams()
          .set("sort", params.sort || "")
          .set("sortDirection", params.sortDirection || "")
      };
    }
    return this.http.get(baseUrl, params).pipe(
      map((data: any) => {
        return data && data.results.map((elem: Ticket) => {
          return new Ticket(elem)
        })
      })
    );
  }

  deleteOne(id: number) {
    return this.http.delete(`${baseUrl}/${id}`)
  }
}
