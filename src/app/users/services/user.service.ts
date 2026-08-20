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
  private apiUrlAll = 'https://dummyjson.com/users';
  //todo refactor url to enviroment variable or config file

  constructor(private http: HttpClient) { }


  getUsers(): Observable<User[]> {
    return this.http.get<UserResponse>(this.apiUrlAll).pipe(
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
    return this.http.get<UserResponse>(this.apiUrl).pipe(
      map((response) => {
        return response.users[0]; // Assuming the API returns a single user in the 'users' array
      })
    );
  }

  addUser(user: User): Observable<User> {
    return this.http.post<UserResponse>(this.apiUrlAll, user).pipe(
      map((response) => {
          return response.users[0];
      })
    );
  }

  updateUser(user: User): Observable<User> {
    const url = `${this.apiUrlAll}/${user.id}`;
    return this.http.put<UserResponse>(url, user).pipe(
      map((response) => {
         return response.users[0];
      })
    );
  }

  deleteUser(id: string): Observable<User> {
    const url = `${this.apiUrlAll}/${id}`;
    return this.http.delete<UserResponse>(url).pipe(
      map((response) => {
        return response.users[0]; // Assuming the API returns an array of deleted users
      })
    );
  }





}
