import { Component, OnInit } from '@angular/core';
import { SuppliesService } from '../../services/suppplies.service';

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.css']
})
export class DonateComponent implements OnInit {
  supplies: any;
  showMe: boolean = false
  order: string;
  ordersDataChecked = [];
  constructor(public json: SuppliesService) {
      this.json.getSupplies('https://abc-back.herokuapp.com/api/supplies').subscribe((res:any) => {
      this.supplies = res;
      console.log(this.supplies);
    })
   }

  ngOnInit(): void {
  }
  onCheckboxChange(option, event) {
    if ( event.target.checked ) { }
      this.ordersDataChecked.push(event.target); 
   console.log(this.ordersDataChecked);
   console.log(event.target);
 }
}