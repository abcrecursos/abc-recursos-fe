import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Province } from '../models/province-model';
import { Department } from '../models/department-model';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http:HttpClient) { }

  readonly APIUrl = "https://abc-back.herokuapp.com/api/locations/provinces";
  readonly APIUrl2 = "https://abc-back.herokuapp.com/api/locations/departments?provinceId=";
  APIUrl3 = "";

  getLocationList(Province): Observable<any[]>{
    let response1 = this.http.get<Province[]>(this.APIUrl);
    
    return response1;
  }

  getDepartmentList(Department, provinceId): Observable<any[]>{
    this.APIUrl3 = this.APIUrl2 + provinceId;
    let response2 = this.http.get<Department[]>(this.APIUrl3);
    return response2;
  }
  
}