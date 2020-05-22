import { CreateDonationItem } from './create-donation-item';

export type Address = {
  street: string,
  streetNumber: number,
  location: string,
  province: string,
  postalCode: number,
  department: string
}

export type Person = {
  name: string,
  lastname: string,
  email: string,
  phonePrefix: number,
  phoneNumber: number,
  address: Address
}

export class CreateDonation {

  constructor(
    readonly orderId,
    readonly person: Person,
    readonly items: CreateDonationItem[]
    ) {

  }
}