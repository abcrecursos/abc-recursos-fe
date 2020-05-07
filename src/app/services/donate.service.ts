import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpRequesterService } from './http-requester.service';
import { CreateDonation, SuggestedPlaceToDonate, TrackingDonation } from '../models';

type GeoLocation = {
  latitude: number,
  longitude: number
}

type DonatedSupplyOut = {
  supplyId: string,
  quantity: number
}

type Phone = {
  type: string,
  number: number,
  prefix: number
}

type Address = {
  street: string,
  number: number,
  postalCode: number,
  localidad: string,
  province: string,
  departamento: string,
  latitude: number,
  longitude: number
}


@Injectable({
  providedIn: 'root'
})
export class DonateService {

  private static CREATE_DONATION_RESOURCE = "donations";
  private static WHERE_TO_DONATE_SUGGESTIONS_RESOURCE = "donations/suggestions";
  private static ADDRESS_LOCATION_RESOURCE = "locations/address/";

  constructor(private httpRequester: HttpRequesterService) { }

  /**
  Creates a donation.
  */
  create(data: CreateDonation): Observable<TrackingDonation> {

    const street: string = data.person.address.street;
    const city: string = data.person.address.city;
    const province: string = data.person.address.province;
    const streetNumber: number = data.person.address.streetNumber;

    return new Observable<TrackingDonation>(subscriber => {

      this
      .getAddressGeoreference(street, streetNumber, city, province)
      .subscribe(location => {
        
        const latitude: number = location.latitude;
        const longitude: number = location.longitude;

        const phone: Phone = {
          number: data.person.phoneNumber,
          prefix: data.person.phonePrefix,
          type: "Cellphone"
        }

        const address: Address = {
          departamento: data.person.address.department,
          latitude: latitude,
          localidad: data.person.address.city,
          longitude: longitude,
          number: data.person.address.streetNumber,
          street: data.person.address.street,
          province: data.person.address.province,
          postalCode: data.person.address.postalCode
        }

        const items = data.items.map(function(current): DonatedSupplyOut {

              return {
                supplyId: current.supplyId,
                quantity: current.quantity
              };
            });

        const bodyData = {
            orderId: data.orderId,
            items: items,
            person: {
              name: data.person.name,
              lastname: data.person.lastname,
              email: data.person.email,
              phone: phone,
              address: address
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

            subscriber.next(model);
            subscriber.complete();
          }

          this
          .httpRequester
          .doPost(
            DonateService.CREATE_DONATION_RESOURCE,
            bodyData
           )
          .subscribe(onSuccess, error => subscriber.error(error), () => subscriber.complete());
          });
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
  getWhereToDonateSuggestions(
    supplyId: string,
    street: string,
    streetNumber: number,
    city: string,
    province: string
    )
  : Observable<SuggestedPlaceToDonate[]> {

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
      .getAddressGeoreference(street, streetNumber, city, province)
      .subscribe(onAddressSuccess, onAddressError);
    });

    return ret;
  }

  /**
  Gets GeoLocation of an address.

  @param address Address to get GetLocation info. Format
  must be = "{street} {number}, {city}, {province}"
  */
  private getAddressGeoreference(
    street: string,
    streetNumber: number,
    city: string,
    province: string
    ): Observable<GeoLocation> {

    const address: string = street.trim() +
                            " " +
                            streetNumber +
                            ", " +
                            city.trim() +
                            ", " +
                            province.trim();

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