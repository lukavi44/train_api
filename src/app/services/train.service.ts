import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Station } from '../train/model/station';
import { Train } from '../train/model/train';
import { TrainSearchResult } from '../train/model/trainSearchResult';

const baseUrl = 'http://localhost:3000/api'

@Injectable({
  providedIn: 'root'
})
export class TrainService {

  constructor(private http: HttpClient) { }

  getAllTrains(params?: any) : Observable<Train[]> {
    let options = {};
    if (params) {
      options = {
        params: new HttpParams()
          .set("sort", params.sort || "")
          .set('sortDirection', params.sortDirection || '')
          .set(
            "filter",
            (params.filter && JSON.stringify(params.filter)) || ""
          ),
      };
    }
    return this.http.get(`${baseUrl}/trains`, options).pipe(map((data:any) => {
      return data && data.results.map((elem: Train) => new Train(elem)) || [];
    }));
  }

  getStations(): Observable<Station[]> {
    return this.http.get(`${baseUrl}/stations`).pipe(
      map((data: any) => {
        return data && data.map((elem: Station) => new Station(elem));
      })
    );
  }

  getOneTrain(id: number): Observable<Train> {
    return this.http.get(`${baseUrl}/trains/${id}`).pipe(
      map((data: any) => {
        return new Train(data);
      })
    )
  }
}
