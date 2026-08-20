import { Component, OnInit } from '@angular/core';
import { User } from './models/user.model';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
  constructor(private userService: UserService) {}
  ngOnInit() {
    this.userService.getUser().subscribe((user: User) => {
      console.log('User data:', user);
    });
  }
}
