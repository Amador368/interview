import { Component, Inject, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from "@angular/material/dialog";


@Component({
  selector: 'dialog-animations-example-dialog',
  template: `<h2 mat-dialog-title>{{ data.title }}</h2>
<mat-dialog-content>
  {{ data.message }}
</mat-dialog-content>
<mat-dialog-actions>
  <button mat-button mat-dialog-close (click)="onCancel()" >No</button>
  <button mat-button mat-dialog-close cdkFocusInitial (click)="onConfirm()" >Si</button>
</mat-dialog-actions>`,
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent]
})
export class ConfirmationDialogComponent {
  readonly dialogRef = inject(MatDialogRef<ConfirmationDialogComponent>);
  constructor(@Inject(MAT_DIALOG_DATA) public data: {title: string, message: string}) {}
  
  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}