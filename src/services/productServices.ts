import axios from "axios";
import { LoanData } from "../features/products/ProductModel";
import { CardData } from "../features/products/ProductModel";

const API_URI = import.meta.env.VITE_SUPABASE_URL;

export const getLoans = async (accountNumber: string): Promise<LoanData[]> => {
    const res = await axios.get(`${API_URI}/loans?account_number=${accountNumber}`);
    return res.data || [];
};

export const getCards = async (accountNumber: string): Promise<CardData[]> => {
    const res = await axios.get(`${API_URI}/credit_debit_cards?account_number=${accountNumber}`);
    return res.data || [];
};