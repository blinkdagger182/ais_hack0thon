import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FetchService {

  private jsonUrl = 'assets/json/infobanjir.json'; // Path to your JSON file

  constructor(private http: HttpClient) { }

  getMarkersData(): Observable<any[]> {
    return this.http.get<any[]>(this.jsonUrl);
  }
}
