import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { Province } from 'src/app/models/province-model';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ProvinceService } from 'src/app/services/province.service';


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
  filteredProvinces: Observable<string[]>;

  province: Province[] = [
    {
      "centroide": {
        "lat": -26.8753965086829,
        "lon": -54.6516966230371
      },
      "id": "54",
      "nombre": "Misiones"
    },
    {
      "centroide": {
        "lat": -33.7577257449137,
        "lon": -66.0281298195836
      },
      "id": "74",
      "nombre": "San Luis"
    }
  ];

  constructor(@Inject(ProvinceService) private service: ProvinceService) {
  }

  ngOnInit(): void {
    this.filteredProvinces = this.provinceCtrl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    this.refreshProvinceList();
  }

  private _filter(value: string): string[] {
    const searchedProvinceName = value.toLowerCase();
    return this.province.map(x => x.nombre).filter(option => option.toLowerCase().includes(searchedProvinceName));
  }

  refreshProvinceList() {
    this.service.getProvinceList(Province).subscribe(resultados => {
      console.log(resultados);
      this.province = resultados;
    });
  }
}