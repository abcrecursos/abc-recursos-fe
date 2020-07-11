import { Injectable } from '@angular/core';
import { HttpRequesterService } from './http-requester.service';
import {Observable} from 'rxjs';
import { Effector } from 'src/app/models/effector-model';

@Injectable({
  providedIn: 'root'
})
export class TrackingService {

  private static getHealthCenter: string = "/donations/tracking/";

  constructor(private httpRequester: HttpRequesterService) { }

  getHealthCenter(Effector, trackingNumber): Observable<Effector>{
    const auxiliar = TrackingService.getHealthCenter + trackingNumber;
    return this.httpRequester.doGet(auxiliar);
  }
}
