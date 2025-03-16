import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrlLogin = "https://reqres.in/api/login";
  constructor(private http: HttpClient) { }
  
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(this.apiUrlLogin, credentials);
  }

  private apiUrlRegister = "http://localhost:9000/api/users";

  registerUser(credentials: { email: string; age: Number; name: string; }): Observable<any> {
    return this.http.post(this.apiUrlRegister, credentials);
  }
}
