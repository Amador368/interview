import { Component, OnInit } from '@angular/core';
import { User } from './models/user.model';
import { UserService } from './services/user.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { selectAllUsers, selectUsersLoading } from './store/users.selectors';
import * as usersActions from './store/users.actions';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {

  users$: Observable<User[]>;
  loading$: Observable<boolean>;

  constructor(private userService: UserService, private store: Store) {
    this.users$ = this.store.select(selectAllUsers);
    this.loading$ = this.store.select(selectUsersLoading);
  }
  ngOnInit() {
    this.store.dispatch(usersActions.getUsers());
    // this.userService.getUser().subscribe((user: User) => {
    //   console.log('User data:', user);
    // });
  }
}
