export class RequestForm{
    
priority: number;
state: string;
healthCenterId: string;
items: Array<{
  
    supplyId: string, quantity: number
         
    }>;
person: Array<{
    name: string,
    lastname: string,
    email: string,

    phone: Array<{
        type: string,
        prefix: number,
        number: number
        }>,
    address: Array<{
        street: string,
        number: number,
        postalCode: string,
        location: string,
        departmento: string,
        province: string
        }>
    }>

}