export class SuggestedPlaceToDonate {

  constructor(
    readonly id: string,
    readonly healthCenterName: string,
    readonly address: string,
    readonly calculatedDistance: number
    ) {

  }
}