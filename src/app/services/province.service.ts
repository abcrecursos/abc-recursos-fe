import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Province } from '../models/province-model';


@Injectable({
  providedIn: 'root'
})
export class ProvinceService {

  constructor(private http:HttpClient) { }

  readonly APIUrl = "https://abc-back.herokuapp.com/api/locations/provinces";
  

  getProvinceList(Producto): Observable<any[]>{
    let response1 = this.http.get<Province[]>(this.APIUrl);
    return response1;
  }
  /*
  getProductoList2(Producto): Observable<Producto[]>{
    
    return this.http.get<Producto[]>(this.APIUrl2)
  }
  */
}
