import { Injectable } from '@angular/core';
import { HttpRequesterService } from './http-requester.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private static getProvinces: string = "locations/provinces";
  private static getLocality: string = "health-centers/localitieslist?provinceId=";
  private static getEffector: string = "health-centers/localities?localityId=";

  constructor(private httpRequester: HttpRequesterService) { }

  getLocationList(Province): Observable<any[]>{
    return this.httpRequester.doGet(LocationService.getProvinces);
  }

  getLocalityList(Locality, provinceId): Observable<any[]>{
    const auxiliar = LocationService.getLocality + provinceId;
    return this.httpRequester.doGet(auxiliar);
  }

  getEffectorList(Effector, localityId): Observable<any[]>{
    const auxiliar2 = LocationService.getEffector + localityId;
    return this.httpRequester.doGet(auxiliar2);
  }
  
}