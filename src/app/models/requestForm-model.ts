export class RequestForm{
    
priority: number;
state: string;
healthCenter_id: string;
items: Array<{
  
    supply_id: string, quantity: number
        
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
        localidad: string,
        departmento: string,
        province: string
        }>
    }>

}