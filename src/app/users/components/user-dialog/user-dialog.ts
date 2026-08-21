import { Component, inject, Input } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { User } from '../../models/user.model';
import { Store } from '@ngrx/store';
import * as UsersActions from '../../store/users.actions';


@Component({
  selector: 'users-dialog',
  template: `
    <h2 mat-dialog-title>{{ isEditMode ? 'Editar usuario' : 'Agregar usuario' }}</h2>
    <mat-dialog-content>
        <form (ngSubmit)="onSubmit()" [formGroup]="userForm">
            <mat-form-field class="form-field">
              <mat-label>First Name</mat-label>
              <input matInput formControlName="firstName">
            </mat-form-field>

            <mat-form-field class="form-field">
              <mat-label>Last Name</mat-label>
              <input matInput formControlName="lastName">
            </mat-form-field>            

            <mat-form-field class="form-field">
              <mat-label>Email</mat-label>
              <input matInput type="email" formControlName="email">
            </mat-form-field>

            <mat-form-field  class="form-field">
              <mat-label>Phone</mat-label>
              <input matInput type="tel" formControlName="phone">
            </mat-form-field>

            <mat-form-field  class="form-field">
              <mat-label>Role</mat-label>
              <mat-select formControlName="role">
                <mat-option value="">Select a role</mat-option>
                <mat-option value="admin">Admin</mat-option>
                <mat-option value="user">User</mat-option>
                <mat-option value="moderator">Moderator</mat-option>
              </mat-select>
            </mat-form-field>

        </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cancel</button>
      <button mat-button (click)="onSubmit()" [disabled]="userForm.invalid">
        {{ isEditMode ? 'Actualizar' : 'Agregar' }}
      </button>
    </mat-dialog-actions>
  `,
  standalone: true,
  styles: [`
    .form-field {
      width: 100%;
    }
  `],
  imports: [
    MatButtonModule, 
    MatDialogActions, 
    MatDialogClose, 
    MatDialogTitle, 
    MatDialogContent, 
    MatFormFieldModule, 
    MatInputModule, 
    MatSelectModule, 
    ReactiveFormsModule]
})
export class UsersDialogComponent {
  readonly dialogRef = inject(MatDialogRef<UsersDialogComponent>);
  readonly store = inject(Store);

  private fb = inject(NonNullableFormBuilder);
  isEditMode = false;

  userForm = this.fb.group({
    id: [0],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [
      Validators.required,
      Validators.email
    ]],
    phone: ['', Validators.required],
    role: ['', Validators.required]
  });

  onSubmit(): void {

    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    const user: User = this.userForm.getRawValue();

    if (this.isEditMode) {
      this.updateUser(user);
    } else {
      this.createUser(user);
    }
  }

   createUser(user: User): void {
    this.store.dispatch(UsersActions.addUser({ user }));
    this.dialogRef.close();
  }

   updateUser(user: User): void {
    this.store.dispatch(UsersActions.updateUser({ user }));
    this.dialogRef.close();
  }

}