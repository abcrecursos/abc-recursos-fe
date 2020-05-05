import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
declare var $:any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  email: string;

  ngAfterViewInit(){
    $('.third-button').on('click', function () {
      $('.animated-icon3').toggleClass('open');
    });
    $(window).scroll(function () {
      var scroll = $(window).scrollTop();
      if ($(this).scrollTop() > 20){
        $('.navtop').addClass("my-bg-light");
      } else {
        $('.navtop').removeClass("my-bg-light");
      }
    });
  }
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    
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

}
