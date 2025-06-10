import axios from "axios";
import { LoanData } from "../features/products/ProductModel";
import { CardData } from "../features/products/ProductModel";

const API_URI = import.meta.env.VITE_CTM_BASE_API;

export const getLoans = async (accountNumber: string): Promise<LoanData[]> => {
    const res = await axios.get(`${API_URI}/get_loans/${accountNumber}`);
    return res.data.items || [];
};

export const getCards = async (accountNumber: string): Promise<CardData[]> => {
    const res = await axios.get(`${API_URI}/get_debit_credit_card/${accountNumber}`);
    return res.data.items || [];
};