import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../../modal/modal.component';
import { LoginComponent } from '../login/login.component';

interface DialogData {
  email: string;
}

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {
  email: string;

  constructor(public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: DialogData, public dialogRef: MatDialogRef<ForgotComponent>,) { }

  ngOnInit(): void {
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '400px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.email = result;
    });
  }
  openRecuperar(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '400px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.email = result;
    });
  }
  openModalLogin(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '400px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.email = result;
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
