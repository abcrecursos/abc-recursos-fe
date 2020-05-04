export type PropertyError = {
  property: string,
  error: string
}

export class ServiceEntityException {
  
  constructor(readonly messages: PropertyError[]) { }

  public propertyHasError(propertyName: string): boolean {
    return this.messages.findIndex(current => current.property == propertyName) >= 0;
  }

  public getErrorMessageForProperty(propertyName: string): string {

    if (!this.propertyHasError(propertyName)) {
      return "";
    }

    return this.messages.find(current => current.property == propertyName).error;
  }

  public getAllMessages(
    prefixWithPropertyName: boolean = true,
    propertyNameSeparator: string = ": "
    ): string[] {

    let prefix = function(propertyError: PropertyError): string {
      return "";
    }

    if (prefixWithPropertyName) {
      prefix = function(propertyError: PropertyError): string {
        return propertyError.property + propertyNameSeparator;
      }
    }

    return this.messages.map(current => prefix(current) + current.error);
  }
}