import { Component, Input } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {    
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'phone', 'role'];
  @Input() users: User[] = [];


}
