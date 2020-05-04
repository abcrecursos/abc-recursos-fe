import { CreateDonationItem } from './create-donation-item';

type person = {
  name: string,
  lastname: string,
  email: string,
  phoneNumber: string,
  address: string,
  city: string,
  province: string,
  postalCode: number
}

export class CreateDonation {

  constructor(
    readonly orderId,
    readonly person: person,
    readonly items: CreateDonationItem[]
    ) {

  }
}