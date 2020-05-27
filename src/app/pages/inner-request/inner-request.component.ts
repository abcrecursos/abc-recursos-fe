import { Component, OnInit, Inject, Output, EventEmitter, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Locality } from 'src/app/models/locality-model';
import { LocationService } from 'src/app/services/location.service';
import { Province } from 'src/app/models/province-model';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-inner-request',
  templateUrl: './inner-request.component.html',
  styleUrls: ['./inner-request.component.css']
})
export class InnerRequestComponent implements OnInit {
  provinceCtrl = new FormControl();
  localityCtrl = new FormControl();
  filteredProvinces: Observable<string[]>;
  filteredLocalities: Observable<string[]>;
  province: Province[] = [];
  locality: Locality[] = [];
  provinceId: string;
  localityId: string;


  @Output() selectLocality = new EventEmitter<string>();
  @Output() selectLocalityArray = new EventEmitter<Locality[]>();


  constructor(@Inject(LocationService) private service: LocationService) { }

  ngOnChanges(): void {


  }
  ngOnInit(): void {
    this.refreshProvinceList();
    this.provinceCtrl.valueChanges.subscribe(event => {
      this.provinceCtrl.setValue(event.toLowerCase(), { emitEvent: false });
    });
    this.localityCtrl.valueChanges.subscribe(event => {
      this.localityCtrl.setValue(event.toLowerCase(), { emitEvent: false });
    });
  }
  setLocalitySelected(localidadSeleccionada: string) {
    this.selectLocality.emit(localidadSeleccionada);

  }

  setAllLocalities(value: string): string[] {
    let searchedLocalityName = value.toLowerCase();
    let elMapeador = this.locality.map(x => x.localidad);
    this.selectLocalityArray.emit(this.locality);
    return this.locality.map(x => x.localidad).filter(option => option.toLowerCase().includes(searchedLocalityName));
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



  refreshProvinceList() {
    this.service.getLocationList(Province).subscribe(resultados => {
      this.province = resultados;
      console.log(resultados);
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
          map(value => this.setAllLocalities(value))
        );
    });
  }
}
