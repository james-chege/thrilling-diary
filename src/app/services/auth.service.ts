import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../models/User";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url: string = 'http://api-thriller-diary.herokuapp.com/api/v1/';

  constructor(private http: HttpClient) { }

  login(user): Observable<User> {
    console.log(user)
    return this.http.post<User>(this.url+'auth/login', user, httpOptions);
  };

  signUp(user): Observable<User> {
    return this.http.post<User>(this.url+'auth/signup', user, httpOptions)
  }

  logout() {
    localStorage.removeItem("access_token");
  }
}
