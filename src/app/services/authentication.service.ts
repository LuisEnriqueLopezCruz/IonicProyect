import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, catchError, map, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }
  private currentUser: any;
  login(username: string, password: string): Observable<boolean> {
    return this.http.get<any[]>(`${this.apiUrl}/users`)
      .pipe(
        map(users => {
          const user = users.find(user => user.username === username && user.password === password);
          this.currentUser = user;
          localStorage.setItem('currentUser', JSON.stringify(user));
          return !!user;
        }),
        catchError(error => {
       
          return of(false);
        })
      );
  }
  getCurrentUserId(): string {
    if (!this.currentUser && localStorage.getItem('currentUser')) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }
  return this.currentUser ? this.currentUser.id : null;
  }

  register(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/users`, { username, password });
  }


}