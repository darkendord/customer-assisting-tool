export enum ProductType {
    Checking = "Checking",
    Savings = "Savings",
    Loan = "Loan",
    CreditCard = "Credit Card",
    DebitCard = "Debit Card",
}

export interface ProductData {
    account_number: string;
    customer_id: number;
    account_type: ProductType | string;
    balance?: number;
    status: string;
    created_at?: string;
    updated_at?: string;
}

export interface LoanData {
    loan_id: number;
    account_number: string;
    loan_type: string;
    amount: number;
    interest_rate: number;
    start_date: string;
    end_date: string;
    status: string;
    created_at: string;
}


export interface CardData {
    card_id: number;
    account_number: string;
    card_type: string;
    card_number: string;
    expiry_date: string;
    cvv: number;
    status: string;
    created_at: string;
}

// export class ProductModel {
//     account_number: string;
//     customer_id: number;
//     account_type: ProductType | string;
//     balance?: number;
//     status: string;
//     created_at?: string;
//     updated_at?: string;

//     constructor(data: ProductData) {
//         this.account_number = data.account_number;
//         this.customer_id = data.customer_id;
//         this.account_type = data.account_type;
//         this.balance = data.balance;
//         this.status = data.status;
//         this.created_at = data.created_at;
//         this.updated_at = data.updated_at;
//     }

//     static parseList(rawData: any[]): ProductModel[] {
//         return rawData.map(item => new ProductModel(item));
//     }
// }