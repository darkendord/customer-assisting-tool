
export interface CommentData {
    customer_id: number;
    employee_username: string;
    comment_text: string;
    created_at?: string;
}


export class CommentModel {
    customer_id: number;
    employee_username: string;
    comment_text: string;
    created_at?: string;

    constructor(data: CommentData) {
        this.customer_id = data.customer_id;
        this.employee_username = data.employee_username;
        this.comment_text = data.comment_text;
        this.created_at = data.created_at || new Date().toISOString();
    }

    static parseList(rawData: any[]): CommentModel[] {
        return rawData.map(item => new CommentModel(item));
    }
}