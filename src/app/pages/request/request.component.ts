import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { Province } from 'src/app/models/province-model';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { LocationService } from '../../services/location.service';
import { Department } from 'src/app/models/department-model';

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
  departmentCtrl = new FormControl();
  filteredProvinces: Observable<string[]>;
  filteredDepartments: Observable<string[]>;
  province: Province[] = [];
  department: Department[] = [];
  provinceId: string;

  constructor(@Inject(LocationService) private service: LocationService) {
  }

  ngOnInit(): void {

    this.filteredProvinces = this.provinceCtrl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );


    this.filteredDepartments = this.departmentCtrl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterDepartment(value))
      );

    this.refreshProvinceList();

  }

  private _filter(value: string): string[] {
    const searchedProvinceName = value.toLowerCase();
    let provinciaFiltrada = this.province.filter(function (provincia) {
      return provincia.nombre.toLowerCase() == searchedProvinceName;
    });
    var myJSON = JSON.stringify(provinciaFiltrada);
    var obj = JSON.parse(myJSON);
    if (obj[0] !== undefined) {
      this.provinceId = obj[0].id;
    }
    this.refreshDepartmentList(this.provinceId);
    console.log(this.refreshDepartmentList(this.provinceId));
    return this.province.map(x => x.nombre).filter(option => option.toLowerCase().includes(searchedProvinceName));
  }

  private _filterDepartment(value: string): string[] {
    const searchedDepartmentName = value.toLowerCase();
    return this.department.map(x => x.nombre).filter(option => option.toLowerCase().includes(searchedDepartmentName));
  }

  refreshProvinceList() {
    this.service.getLocationList(Province).subscribe(resultados => {
      this.province = resultados;
    });
  }
  refreshDepartmentList(theProvinceId) {
    theProvinceId = this.provinceId;
    this.service.getDepartmentList(Department, theProvinceId).subscribe(departamentos => {
      this.department = departamentos;
    });
  }

}