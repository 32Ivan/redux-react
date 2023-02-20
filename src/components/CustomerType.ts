export interface ICustomer {
    _id: string;
    name: string;
    surname: string;
    email: string;
    city: string;
    dateOfBirth: Date;
}

export interface ICustomerUpdate {
    name: string;
    surname: string;
    email: string;
    city: string;
    dateOfBirth: Date;
}

export interface IPrice {
    amount: number;
    city: string;
}

export enum PageEnum {
    list,
    add,
    edit
}
