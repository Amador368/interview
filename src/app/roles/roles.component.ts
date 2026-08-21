import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Role } from './models/role.model';
import { RolesListComponent } from './components/roles-list/roles-list.component';
import { RoleFormComponent } from './components/role-form/role-form.component';
import * as RolesActions from './store/roles.actions';
import { selectAllRoles, selectRolesLoading } from './store/roles.selectors';
import { ConfirmationDialogComponent } from '../shared/confirmation-dialog/confirmation-dialog';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [CommonModule, RolesListComponent, RoleFormComponent],
  template: `
    <div class="roles-page">
      <h2>Gestión de Roles</h2>

      <app-role-form
        [editingRole]="editingRole"
        (save)="onSave($event)"
        (cancel)="onCancelEdit()"
      ></app-role-form>

      <app-roles-list
        [roles]="(roles$ | async) ?? []"
        [loading]="(loading$ | async) ?? false"
        (edit)="onEdit($event)"
        (delete)="onDelete($event)"
      ></app-roles-list>
    </div>
  `
})
export class RolesComponent implements OnInit {
    readonly dialog = inject(MatDialog);
  roles$: Observable<Role[]>;
  loading$: Observable<boolean>;
  editingRole: Role | null = null;

  constructor(private store: Store) {
    this.roles$ = this.store.select(selectAllRoles);
    this.loading$ = this.store.select(selectRolesLoading);
  }

  ngOnInit(): void {
    this.store.dispatch(RolesActions.loadRoles());
  }

  onSave(role: Role): void {
    if (this.editingRole) {
      this.store.dispatch(RolesActions.updateRole({ role }));
      this.editingRole = null;
    } else {
      this.store.dispatch(RolesActions.addRole({ role }));
    }
  }

  onEdit(role: Role): void {
    this.editingRole = role;
  }

  onDelete(id: string): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Confirmación',
        message: `¿Estás seguro de que deseas eliminar el rol?`
      },
      width: '250px'
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.store.dispatch(RolesActions.deleteRole({ id }));
      }
    });
  }

  onCancelEdit(): void {
    this.editingRole = null;
  }
}
