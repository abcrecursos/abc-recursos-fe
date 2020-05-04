import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PropertyError, ServiceEntityException } from './exceptions';

/**
Performs HTTP request to a server and parses response.
*/
@Injectable({
  providedIn: 'root'
})
export class HttpRequesterService {

  //fixme Esto debe venir por configuración de la aplicación en el constructor
  private host: string = "https://abc-back.herokuapp.com/api";

  constructor(private http:HttpClient) { }

  /**
  Resolves the final URL based on this object
  configuration.

  @param resource Desired resource.

  @returns the final URL based on #resource and configuration.
  */
  private resolveUrl(resource: string): string {

    let sanitizedResource = resource.trim()

    if (!sanitizedResource.startsWith("/")) {
      sanitizedResource = "/" + sanitizedResource;
    }

    return this.host + sanitizedResource;
  }

  /**
  Wrapps a request to the server.

  This wrapp is based on configuration and will handle errors
  provided by server.

  @param wrappedObservable Request to perform.

  @type T body type of server response.
  */
  private wrappRequest<T>(wrappedObservable: Observable<T>): Observable<T> {

    return new Observable<T>(subscriber => {

      wrappedObservable
      .toPromise()
      .then(data => {
        subscriber.next(data);
        subscriber.complete();
      })
      .catch(error => {

        //default error
        let convertedError = new ServiceEntityException(
          [{
            property: "general",
            error: "Ha ocurrido un error inesperado."
          }]
          );
        
        //TODO analizar otros códigos HTTP (404, 401, 403)
        switch (error.status) {
          case 422://Unprocessable entity
            convertedError = new ServiceEntityException(
              error.error.message.map(function(current): PropertyError {

                //only gets first error
                let errorDescription: string = Object.values(current.errors)[0].toString();

                return {
                  property: current.property,
                  error: errorDescription
                };
              })
              );
            break;
        }
        
        subscriber.error(convertedError);
        subscriber.complete();
      });
    });
  }

  /**
  Performs a GET HTTP request.

  @param resource - Resource to request, without protocol, host and port.
  Example: "path/to/resource".

  @type T Data type of server response.

  @returns An Observable<T>.
  */
  doGet<T>(resource: string): Observable<T> {

    const finalUrl = this.resolveUrl(resource);
    return this.wrappRequest(this.http.get<T>(finalUrl));
  }

  /**
  Performs a POST HTTP request.

  @param resource - Resource to request, without protocol, host and port.
  Example: "path/to/resource".
  @param data - Data as body of the request.

  @type T Data type of server response.

  @returns An Observable<T>
  */
  doPost<T>(resourse: string, data:any): Observable<T> {

    const finalUrl = this.resolveUrl(resourse);
    return this.wrappRequest(this.http.post<T>(finalUrl, data));
  }

  /**
  Performs a PUT HTTP request.

  @param resource - Resource to request, without protocol, host and port.
  Example: "path/to/resource".
  @param data - Data as body of the request.

  @type T Data type of server response.

  @returns An Observable<T>
  */
  doPut<T>(resource: string, data: any): Observable<T> {

    const finalUrl = this.resolveUrl(resource);
    return this.wrappRequest(this.http.put<T>(finalUrl, data));
  }

  /**
  Performs a DELETE HTTP request.

  @param resource - Resource to request, without protocol, host and port.
  Example: "path/to/resource".

  @returns An Observable<Object>
  */
  doDelete(resource: string): Observable<Object> {

    const finalUrl = this.resolveUrl(resource);
    return this.wrappRequest(this.http.delete(finalUrl));
  }
}