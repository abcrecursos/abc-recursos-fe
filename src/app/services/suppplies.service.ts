import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpRequesterService } from './http-requester.service';
import { SupplyModel } from '../models';

@Injectable({
  providedIn: 'root'
})
export class SuppliesService {

  private static GET_ALL_RESOURCE: string = "supplies";

  constructor(private httpRequester: HttpRequesterService) { }

  /**
  Gets all available supply types.

  @returns An observable of type SupplyModel[].
  */
  public getAll(): Observable<SupplyModel[]> {
    return this.httpRequester.doGet<SupplyModel[]>(SuppliesService.GET_ALL_RESOURCE);
  }
}