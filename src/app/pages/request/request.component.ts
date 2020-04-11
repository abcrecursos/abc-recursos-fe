import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {
  order: string;
  showMe: boolean;   
  ordersData = [
    { id: "barbijosCheck", name: 'Barbijos', checked: 'false' },
    { id: "guantesCheck", name: 'Guantes', checked: 'false'  },
    { id: "valvulasCheck", name: 'Válvulas', checked: 'false'  },
    { id: "alcoholCheck", name: 'Alcohol', checked: 'false'  },
    { id: "batasCheck", name: 'Batas', checked: 'false'  },
    { id: "otroCheck", name: 'Otro', checked: 'false'  }
  ];
  ordersDataChecked = [];
  constructor(private formBuilder: FormBuilder) { 

    
    
  }

  ngOnInit(): void {
    
  }


 
}




