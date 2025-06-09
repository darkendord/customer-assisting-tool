export enum CustomerType {
    Regular = 'Regular',
    Gold = 'Gold',
    Platinum = 'Platinum',
}

export enum CustomerStatus {
    Active = 'Active',
    Inactive = 'Inactive',
}

export interface CustomerData {
    customer_id?: number;
    first_name: string;
    last_name: string;
    email: string;
    phone_number?: string;
    address_line1?: string;
    address_line2?: string;
    city?: string;
    state?: string;
    postal_code?: string;
    country?: string;
    account_number: string;
    customer_type: CustomerType;
    status: CustomerStatus;
    created_at?: string;
    updated_at?: string;
}

export class CustomerModel {
    customer_id?: number;
    first_name: string;
    last_name: string;
    email: string;
    phone_number?: string;
    address_line1?: string;
    address_line2?: string;
    city?: string;
    state?: string;
    postal_code?: string;
    country?: string;
    account_number: string;
    customer_type: CustomerType;
    status: CustomerStatus;
    created_at?: string;
    updated_at?: string;

    constructor(data: CustomerData) {
        this.customer_id = data.customer_id;
        this.first_name = data.first_name;
        this.last_name = data.last_name;
        this.email = data.email;
        this.phone_number = data.phone_number;
        this.address_line1 = data.address_line1;
        this.address_line2 = data.address_line2;
        this.city = data.city;
        this.state = data.state;
        this.postal_code = data.postal_code;
        this.country = data.country;
        this.account_number = data.account_number;
        this.customer_type = data.customer_type;
        this.status = data.status;
        this.created_at = data.created_at;
        this.updated_at = data.updated_at;

        // Validate data on construction
        //this.validate();
    }

    static parseList(rawData: any[]): CustomerModel[] {
        return rawData.map(item => new CustomerModel(item));
    }
}