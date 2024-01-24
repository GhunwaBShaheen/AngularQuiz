import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersApiService {
  constructor(private http: HttpClient) {}

  // To get users list
  getUsers(page: number): Observable<any> {
    return this.http.get('https://reqres.in/api/users?page=' + page);
  }

  // To get user details
  getUserDetails(value: number): Observable<any> {
    return this.http.get('https://reqres.in/api/users/' + value);
  }
}
