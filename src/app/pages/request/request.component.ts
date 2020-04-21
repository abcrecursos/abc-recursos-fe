import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { Observable, empty, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { LocationService } from '../../services/location.service';
import { Locality } from 'src/app/models/locality-model';
import { Effector } from 'src/app/models/effector-model';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {
  order: string;
  showMe: boolean;
  ordersData = [
    { id: "barbijosCheck", name: 'Barbijos' },
    { id: "guantesCheck", name: 'Guantes', checked: 'false' },
    { id: "valvulasCheck", name: 'Válvulas', checked: 'false' },
    { id: "alcoholCheck", name: 'Alcohol', checked: 'false' },
    { id: "batasCheck", name: 'Batas', checked: 'false' },
    { id: "otroCheck", name: 'Otro', checked: 'false' }
  ];

  EffectorCtrl = new FormControl();
   filteredEffectors: Observable<string[]>;
  effector: Effector[] = [];
  localityId: string;
  selectedLocality: string = '';
  allLocalitiesList: Locality[] = [];



  getlocality(selectedLocality) {
    this.selectedLocality = selectedLocality;
    console.log(this.selectedLocality);
    console.log(this.allLocalitiesList);
    let lalocalidacita = selectedLocality;
    let filteredLocality = this.allLocalitiesList.filter(function (localidad) {
      return localidad.localidad == lalocalidacita;
    });
    if (filteredLocality[0] !== undefined) {
      console.log(filteredLocality[0]._id);
      this.localityId = filteredLocality[0]._id;
    }
    this.refreshEffectorList(this.localityId);
  }


  getAllLocalities(allLocalitiesList) {
    this.allLocalitiesList = allLocalitiesList; 
  }

  constructor(@Inject(LocationService) private service: LocationService) {
  }

  ngOnInit(): void {
  
  }

  private _filterEffector(value: string): string[] {
    const searchedEffectorName = value.toLowerCase();
    return this.effector.map(x => x.name).filter(option => option.toLowerCase().includes(searchedEffectorName));
  }

  refreshEffectorList(thelocalityId) {
    thelocalityId = this.localityId;
    this.service.getEffectorList(Effector, thelocalityId).subscribe(efectores => {
      this.effector = efectores;
      console.log(efectores);
      this.filteredEffectors = this.EffectorCtrl.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filterEffector(value))
        );
    });
  }

}