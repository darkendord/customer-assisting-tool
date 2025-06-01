
export interface CommentData {
    customer_id: number;
    employee_id: string;
    comment_id: number;
    comment_text: string;
    created_at: string;
}


export class CommentModel {
    customer_id: number;
    employee_id: string;
    comment_id: number;
    comment_text: string;
    created_at: string;

    constructor(data: CommentData) {
        this.customer_id = data.comment_id;
        this.employee_id = data.employee_id;
        this.comment_id = data.comment_id;
        this.comment_text = data.comment_text;
        this.created_at = data.created_at;
    }

    static parseList(rawData: any[]): CommentModel[] {
        return rawData.map(item => new CommentModel(item));
    }
}