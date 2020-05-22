export type TrackingStep = {
  description: string,
  order: number
}

export type DonationItem = {
  supply: string,
  quantity: number
}

export class CreatedDonation {

  readonly id: string;
  readonly state: string;
  readonly order: any;
  readonly person: any;
  readonly tracking: {
    readonly number: string,
    readonly steps: TrackingStep[]
  }

  constructor(
    id: string,
    state: string,
    order: any,
    person: any,
    trackingNumber: string,
    steps: TrackingStep[]
    ) {
    this.id = id;
    this.state = state;
    this.order = order;
    this.person = person;
    this.tracking = {
      number: trackingNumber,
      steps: steps
    }
  }
}