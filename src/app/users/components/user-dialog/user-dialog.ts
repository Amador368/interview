import { Component, inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';

@Component({
  selector: 'users-dialog',
  template: `
    <h2 mat-dialog-title>Agregar usuario</h2>
    <mat-dialog-content>
        
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cancel</button>
      <button mat-button>Add</button>
    </mat-dialog-actions>
  `,
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent]
})
export class UsersDialogComponent {
  readonly dialogRef = inject(MatDialogRef<UsersDialogComponent>);
}