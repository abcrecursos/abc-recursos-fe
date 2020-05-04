import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpRequesterService } from './http-requester.service';
import { CreateDonation, SuggestedPlaceToDonate, TrackingDonation } from '../models';

type GeoLocation = {
  latitude: number,
  longitude: number
}

type donatedSupplyOut = {
  supply_id: string,
  quantity: number
}


@Injectable({
  providedIn: 'root'
})
export class DonateService {

  //fixme Esto debe venir por configuración de la aplicación en el constructor
  //private host: string = "https://abc-back.herokuapp.com/api";
  private static CREATE_DONATION_RESOURCE = "donations";
  private static WHERE_TO_DONATE_SUGGESTIONS_RESOURCE = "donations/suggestions";
  private static ADDRESS_LOCATION_RESOURCE = "locations/address/";

  constructor(private httpRequester: HttpRequesterService) { }

  /**
  Creates a donation.
  */
  create(data: CreateDonation): Observable<TrackingDonation> {

    return new Observable<TrackingDonation>(subscriber => {

      const bodyData = {
                        order_id: data.orderId,
                        items: data.items.map(function(current): donatedSupplyOut {

                          return {
                            supply_id: current.supplyId,
                            quantity: current.quantity
                          };
                        }),
                        person: {
                          name: data.person.name,
                          lastname: data.person.lastname,
                          email: data.person.email,
                          phone: data.person.phoneNumber,
                          address: data.person.address,
                          city: data.person.city,
                          province: data.person.province,
                          postal_code: data.person.phoneNumber
                        }
                      };

      const onSuccess = model => {

        let createdModel: TrackingDonation = {
          id: model.id,
          number: model.number,
          steps: model.steps,
          donation: {
            id: model.donation.id,
            order: model.donation.order,
            person: model.donation.person,
            state: model.donation.state,
            items: model.donation.items
          }
        };
      }

      this
      .httpRequester
      .doPost(
        DonateService.CREATE_DONATION_RESOURCE,
        bodyData
       )
      .subscribe(onSuccess, error => subscriber.error(error), () => subscriber.complete());
    });
  }

  /**
  Based con supply and address, obtains suggestions where to donate
  that supply.

  @param supplyId  Supply ID for the suggestion.
  @param street    Origin street.
  @param city      Origin city.
  @param province  Origin province.

  @returns An Observable of SuggestedPlaceToDonate with suggested places to
  donate provided supply based on address.
  */
  getWhereToDonateSuggestions(supplyId: string, street: string, city: string, province: string)
  : Observable<SuggestedPlaceToDonate[]> {

    const address = street.trim() + ", " + city.trim() + ", " + province.trim();
    let ret = new Observable<SuggestedPlaceToDonate[]>(subscriber => {
      
      const onAddressSuccess = (data: GeoLocation) => {
        
        this
        .httpRequester
        .doPost(DonateService.WHERE_TO_DONATE_SUGGESTIONS_RESOURCE, {
          supplyId: supplyId,
          latitude: data.latitude,
          longitude: data.longitude
        })
        .subscribe(suggestions => {

          let convertedSuggestions: SuggestedPlaceToDonate[] =
            (suggestions as Array<any>)
            .map(current => 
              new SuggestedPlaceToDonate(
                current.order[0]._id,
                current.name,
                  current.address.street +
                  " - " +
                  current.address.city +
                  " - " +
                  current.address.province,
                current.dist.calculated
              )
            );

          subscriber.next(convertedSuggestions);
          subscriber.complete();
        },
        error => {
          subscriber.error(error);
          subscriber.complete();
        },
        () => subscriber.complete()
        );
      }

      const onAddressError = (error: any) => {
        subscriber.error(error);
        subscriber.complete();
      }

      //Gets provided address information GeoLocation
      this
      .getAddressGeoreference(address)
      .subscribe(onAddressSuccess, onAddressError);
    });

    return ret;
  }

  /**
  Gets GeoLocation of an address.

  @param address Address to get GetLocation info. Format
  must be = "{street} {number}, {city}, {province}"
  */
  private getAddressGeoreference(address: string): Observable<GeoLocation> {

    return new Observable<GeoLocation>(subscriber => {

      let finalUrl = DonateService.ADDRESS_LOCATION_RESOURCE + address

      this
      .httpRequester
      .doGet<{x: number, y:number}>(finalUrl)
      .subscribe(
        data => {
          subscriber.next({latitude: data.y, longitude: data.x});
          subscriber.complete();
        },
        error => {
          subscriber.error(error);
          subscriber.complete();
        },
        () => subscriber.complete()
       );
    });
  }
}