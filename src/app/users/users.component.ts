import { Component, inject, OnInit } from '@angular/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {AsyncPipe} from '@angular/common';
import { User } from './models/user.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { selectAllUsers, selectUsersLoading } from './store/users.selectors';
import * as usersActions from './store/users.actions';
import { UserListComponent } from './components/user-list/user-list.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [UserListComponent, AsyncPipe, MatProgressSpinnerModule, MatIconModule, MatButtonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {

  users$: Observable<User[]>;
  loading$: Observable<boolean>;

  constructor(private store: Store) {
    this.users$ = this.store.select(selectAllUsers);
    this.loading$ = this.store.select(selectUsersLoading);
  }
  ngOnInit() {
    this.store.dispatch(usersActions.getUsers());
  }
}
