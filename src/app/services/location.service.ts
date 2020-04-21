import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Province } from '../models/province-model';
import { Locality } from '../models/locality-model';
import { Effector } from '../models/effector-model';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http:HttpClient) { }

  readonly APIUrl = "https://abc-back.herokuapp.com/api/locations/provinces";
  readonly APIUrl2 = "https://abc-back.herokuapp.com/api/health-centers/localitieslist?provinceId=";
  APIUrl3 = "";
  readonly APIUrl4 = "https://abc-back.herokuapp.com/api/health-centers/localities?localityId=";
  APIUrl5 = "";

  getLocationList(Province): Observable<any[]>{
    let response1 = this.http.get<Province[]>(this.APIUrl);
    
    return response1;
  }

  getLocalityList(Locality, provinceId): Observable<any[]>{
    this.APIUrl3 = this.APIUrl2 + provinceId;
    let response2 = this.http.get<Locality[]>(this.APIUrl3);
    return response2;
  }

  getEffectorList(Effector, localityId): Observable<any[]>{
    this.APIUrl5 = this.APIUrl4 + localityId;
    let response3 = this.http.get<Locality[]>(this.APIUrl5);
    return response3;
  }
  
}