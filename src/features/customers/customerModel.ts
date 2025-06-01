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

    private validate(): void {
        if (!this.first_name || !this.last_name) {
            throw new Error('First name and last name are required');
        }
        if (!this.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
            throw new Error('Valid email is required');
        }
        if (!this.account_number) {
            throw new Error('Account number is required');
        }
        if (!(this.customer_type in CustomerType)) {
            throw new Error(`Invalid customer type: ${this.customer_type}`);
        }
        if (!(this.status in CustomerStatus)) {
            throw new Error(`Invalid status: ${this.status}`);
        }
        if (this.phone_number && !/^[0-9]{10,15}$/.test(this.phone_number)) {
            throw new Error('Phone number must be 10-15 digits');
        }
        if (this.postal_code && !/^[0-9]{5}(-[0-9]{4})?$/.test(this.postal_code)) {
            throw new Error('Postal code must be 5 or 9 digits (e.g., 12345 or 12345-6789)');
        }
        // Optional: Validate ISO date strings for created_at and updated_at
        const dateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.*Z$/;
        if (this.created_at && !dateRegex.test(this.created_at)) {
            throw new Error('created_at must be a valid ISO date string');
        }
        if (this.updated_at && !dateRegex.test(this.updated_at)) {
            throw new Error('updated_at must be a valid ISO date string');
        }
    }
}