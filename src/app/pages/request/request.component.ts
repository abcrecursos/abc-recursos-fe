import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { LocationService } from '../../services/location.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {
  order: string;
  showMe: boolean;
  provinces;
  ordersData = [
    { id: "barbijosCheck", name: 'Barbijos' },
    { id: "guantesCheck", name: 'Guantes', checked: 'false' },
    { id: "valvulasCheck", name: 'Válvulas', checked: 'false' },
    { id: "alcoholCheck", name: 'Alcohol', checked: 'false' },
    { id: "batasCheck", name: 'Batas', checked: 'false' },
    { id: "otroCheck", name: 'Otro', checked: 'false' }
  ];
  constructor(public json: LocationService) {
    this.json.getJson('https://abc-back.herokuapp.com/api/locations/provinces').subscribe((res:any) => {
      this.provinces = res;
    })

  }

  ngOnInit(): void {

  }



}




