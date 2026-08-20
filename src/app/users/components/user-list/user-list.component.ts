import { Component, inject, Input } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { User } from '../../models/user.model';
import { ɵEmptyOutletComponent } from "@angular/router";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  MatDialog,
} from '@angular/material/dialog';
import { UsersDialogComponent } from '../user-dialog/user-dialog';
import { ConfirmationDialogComponent } from '../../../shared/confirmation-dialog/confirmation-dialog';
import { Store } from '@ngrx/store';
import * as UsersActions from '../../store/users.actions';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [MatTableModule, ɵEmptyOutletComponent, MatIconModule, MatButtonModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {
  readonly dialog = inject(MatDialog);
  readonly store = inject(Store);
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'phone', 'role', 'actions'];
  @Input() users: User[] = [];

  openAddUserDialog() {
     this.dialog.open(UsersDialogComponent, {

      width: '250px'
    });
  }

  editUser(user: User) {
    console.log('Edit user:', user);
  }

  deleteUser(user: User) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Confirmación',
        message: `¿Estás seguro de que deseas eliminar al usuario ${user.firstName} ${user.lastName}?`
      },
      width: '250px'
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.store.dispatch(UsersActions.deleteUser({ id: user.id }));
      }
    });
  }
}