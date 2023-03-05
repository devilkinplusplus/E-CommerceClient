import { MatDialogRef } from "@angular/material/dialog";

export class BaseDialog<TDialogComponent> {

  constructor(public dialogRef: MatDialogRef<TDialogComponent>,) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
