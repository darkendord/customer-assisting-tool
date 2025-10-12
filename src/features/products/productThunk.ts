import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ProductData } from "./ProductModel";

const API_URI = import.meta.env.VITE_SUPABASE_URL;

// Fetch products for a customer (same format as comments)
export const getCustomerProducts = createAsyncThunk<
    { items: ProductData[]; offset: number; hasMore: boolean },
    number, // customer_id
    { rejectValue: string }
>("products/getCustomerProducts", async (customer_id, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${API_URI}/accounts?customer_id=${customer_id}`);
        console.log(response);

        return {
            items: response.data || [],
            offset: response.data.offset ?? 0,
            hasMore: response.data.hasMore ?? false,
        };
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.error || error.message || "Failed to fetch products");
    }
});