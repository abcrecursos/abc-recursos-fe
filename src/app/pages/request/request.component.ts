import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { Province } from 'src/app/models/province-model';
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


  provinceCtrl = new FormControl();
  localityCtrl = new FormControl();
  EffectorCtrl = new FormControl();
  filteredProvinces: Observable<string[]>;
  filteredLocalities: Observable<string[]>;
  filteredEffectors: Observable<string[]>;

  province: Province[] = [];
  locality: Locality[] = [];
  effector: Effector[] = [];
  provinceId: string;
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
    this.refreshProvinceList(); 
  }

  private _filter(value: string): string[] {
    const searchedProvinceName = value.toLowerCase();
    let provinciaFiltrada = this.province.filter(function (provincia) {
      return provincia.nombre.toLowerCase() == searchedProvinceName;
    });
    let myJSON = JSON.stringify(provinciaFiltrada);
    let obj = JSON.parse(myJSON);
    if (obj[0] !== undefined) {
      this.provinceId = obj[0].id;
    }
    this.refreshLocalityList(this.provinceId);
    return this.province.map(x => x.nombre).filter(option => option.toLowerCase().includes(searchedProvinceName));
  }



  private _filterLocality(value: string): string[] { 
    let searchedLocalityName = value.toLowerCase();
    return this.locality.map(x => x.localidad).filter(option => option.toLowerCase().includes(searchedLocalityName));
  }


  private _filterEffector(value: string): string[] {
    const searchedEffectorName = value.toLowerCase();
    return this.effector.map(x => x.name).filter(option => option.toLowerCase().includes(searchedEffectorName));
  }

  refreshProvinceList() {
    this.service.getLocationList(Province).subscribe(resultados => {
      this.province = resultados;
      this.filteredProvinces = this.provinceCtrl.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filter(value))
        );
    });
  }




  refreshLocalityList(theProvinceId) {
    theProvinceId = this.provinceId;
    this.service.getLocalityList(Locality, theProvinceId).subscribe(localidades => {
      this.locality = localidades;
      this.filteredLocalities = this.localityCtrl.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filterLocality(value))
        );
    });
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