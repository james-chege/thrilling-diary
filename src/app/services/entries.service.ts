import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Entry } from "../models/Entry";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    "access_token": localStorage.getItem("access_token")
  })
};

@Injectable({
  providedIn: 'root'
})
export class EntriesService {
  url: string = 'http://api-thriller-diary.herokuapp.com/api/v1/';

  constructor(private http: HttpClient) { }

  fetchAllEntries(): Observable<Entry[]> {
    return this.http.get<Entry[]>(this.url+'entries/', httpOptions);
  }

  addEntry(entry){
    return this.http.post<Entry>(this.url+'entries', entry, httpOptions);
  }

  editEntry(entry){
    return this.http.put<Entry>(this.url+`entries/${entry.id}`, entry, httpOptions);
  }

  deleteEntry(entry){
    return this.http.delete<Entry>(this.url+`entries/${entry.id}`, httpOptions);
  }

}
