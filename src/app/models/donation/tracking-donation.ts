export type TrackingStep = {
  description: string,
  order: number
}

export type DonationItem = {
  supply: string,
  quantity: number
}

export type Donation = {
  id: string,
  state: string,
  order: any,
  person: any,
  items: DonationItem[]
}

export class TrackingDonation {

  constructor(
    readonly id: string,
    readonly number: string,
    readonly steps: TrackingStep[],
    readonly donation: Donation
    ) {

  }
}