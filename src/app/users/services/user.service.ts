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

  private apiUrl = 'https://dummyjson.com/users';

  constructor(private http: HttpClient) { }


  getUsers(): Observable<User[]> {
    return this.http.get<UserResponse>(this.apiUrl).pipe(
      map((response) => {
        return response.users.map((user: User) => {
          const userItem: User = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
            role: user.role
          };
          return userItem;
        });
      })
    );
  }

  getUser(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/1`).pipe(
      map((response) => {
        return response;
      })
    );
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/add`, user).pipe(
      map((response) => {
          return response;
      })
    );
  }

  updateUser(user: User): Observable<User> {
    const url = `${this.apiUrl}/${user.id}`;
    return this.http.put<User>(url, user).pipe(
      map((response) => {
         return response;
      })
    );
  }

  deleteUser(id: number): Observable<User> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<User>(url).pipe(
      map((response) => {
        return response;
      })
    );
  }





}
