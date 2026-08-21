import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatFormFieldModule } from "@angular/material/form-field";
import { MatSelect, MatSelectModule } from "@angular/material/select";
import { User } from '../../models/user.model';
import { Store } from '@ngrx/store';
import * as UsersActions from '../../store/users.actions';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { selectUsersLoading } from '../../store/users.selectors';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-edit-user-page',
  standalone: true,
  imports: [MatFormField, MatSelect, 
    MatSelectModule, 
    ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule,
    AsyncPipe, MatProgressSpinnerModule,
  ],
  templateUrl: './edit-user-page.component.html',       
  styleUrl: './edit-user-page.component.scss'
})
export class EditUserPageComponent {

  readonly store = inject(Store);
  private formBuilder = inject(NonNullableFormBuilder);
  readonly user: User = history.state.user;
  readonly router = inject(Router);
  loading$: Observable<boolean>;

  constructor() {
    this.loading$ = this.store.select(selectUsersLoading);
  }

  userForm = this.formBuilder.group({
    id: [1],
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
    this.store.dispatch(UsersActions.updateUser({ user }));
  }

  cancelEdit() {
    this.router.navigate(['/users'])
  }

  ngOnInit(): void {
    if (this.user) {
      this.userForm.patchValue(this.user);
    }
  }
}
