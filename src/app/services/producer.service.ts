import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpRequesterService } from './http-requester.service';

@Injectable()

export class ProducerService {
  private static getProducers: string = "producers/summary";
    constructor(private httpRequester: HttpRequesterService) {
    }
    getProducersRequest(): Observable<any[]> {
        return this.httpRequester.doGet(ProducerService.getProducers);
    }
} 
