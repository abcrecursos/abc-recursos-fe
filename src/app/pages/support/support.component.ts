import { Component, OnInit } from '@angular/core';
import { faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent implements OnInit {
  faUser= faUser;
  numbers: number[];
  constructor() {

    this.numbers = Array(15).fill(0).map((x,i)=>i);
   }

  ngOnInit(): void {
  }

}
