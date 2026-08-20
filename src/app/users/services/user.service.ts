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
    return this.http.get<UserResponse[]>(this.apiUrlAll).pipe(
      map((response) => {
        return response.map((userResponse) => {
          const user: User = {
            id: userResponse.id,
            firstName: userResponse.firstName,
            lastName: userResponse.lastName,
            email: userResponse.email,
            phone: userResponse.phone,
            role: userResponse.role
          };
          return user;
        });
      })
    );
  }

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

  addUser(user: User): Observable<User[]> {
    return this.http.post<UserResponse[]>(this.apiUrlAll, user).pipe(
      map((response) => {
        return response.map((userResponse) => {
          const user: User = {
            id: userResponse.id,
            firstName: userResponse.firstName,
            lastName: userResponse.lastName,
            email: userResponse.email,
            phone: userResponse.phone,
            role: userResponse.role
          };
          return user;
        });
      })
    );
  }

  updateUser(user: User): Observable<User[]> {
    const url = `${this.apiUrlAll}/${user.id}`;
    return this.http.put<UserResponse[]>(url, user).pipe(
      map((response) => {
        return response.map((userResponse) => {
          const updatedUser: User = {
            id: userResponse.id,
            firstName: userResponse.firstName,
            lastName: userResponse.lastName,
            email: userResponse.email,
            phone: userResponse.phone,
            role: userResponse.role
          };
          return updatedUser;
        });
      })
    );
  }

  deleteUser(id: string): Observable<User[]> {
    const url = `${this.apiUrlAll}/${id}`;
    return this.http.delete<UserResponse[]>(url).pipe(
      map((response) => {
        return response.map((userResponse) => {
          const deletedUser: User = {
            id: userResponse.id,
            firstName: userResponse.firstName,
            lastName: userResponse.lastName,
            email: userResponse.email,
            phone: userResponse.phone,
            role: userResponse.role
          };
          return deletedUser;
        });
      })
    );
  }

  



}
