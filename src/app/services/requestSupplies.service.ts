import { Injectable } from '@angular/core';
import { Request } from '../models/request-model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()

export class RequestSuppliesService {

    constructor(private http: HttpClient) {
    }
    createSuppliesRequest(formObject: any): Observable<any> {
        return this.http.post('https://abc-back.herokuapp.com/api/orders', formObject)
    }
} 
