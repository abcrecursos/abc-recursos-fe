import { Component, OnInit } from '@angular/core';
import { SuppliesService } from 'src/app/services/suppplies.service';
import { RequestSuppliesService } from 'src/app/services/requestSupplies.service';
import { RequestForm } from 'src/app/models/requestForm-model';

@Component({
  selector: 'app-profile',
  providers: [RequestSuppliesService],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  RequestSuppliesService: any;
  ordersData = [];
  requestForm: RequestForm = new RequestForm();
  shown: boolean;

  constructor(private json: SuppliesService) { }

  ngOnInit(): void {
    this.getSupplies();
    this.requestForm.items = [];
  }

  private getSupplies() {
    this.json.getAll().subscribe((res: any) => {
      this.ordersData = res;
    })
  }
  onOrderChange(order, event) {
    if (!event.target.checked) {
      let indexId = this.requestForm.items.map(function (e) { return e.supply_id; }).indexOf(order._id);
      this.requestForm.items.splice(indexId, 1);
      this.shown = false;
    }
    this.shown = true;
  }
  onQuantityChange(order, event) {
    let ordersAuxiliary = { supply_id: "", quantity: 0 };
    ordersAuxiliary.quantity = event.target.value;
    ordersAuxiliary.supply_id = order._id;
    this.requestForm.items.push(ordersAuxiliary);
  }

}
