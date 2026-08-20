import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { map } from 'rxjs/internal/operators/map';
import { UserResponse } from '../models/user-response.model';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'https://dummyjson.com/users/1'; 

  constructor(private http: HttpClient) { }

  getUser(): Observable<User> {
    return this.http.get<UserResponse>(this.apiUrl).pipe(
      map((response) => {
        const user: User = {
          id: response.id,
          firstName: response.firstName,
          lastName: response.lastName,
          email: response.email,
          phone: response.phone,
          role: response.role
        };
        return user;
      })
    );
  }

}
