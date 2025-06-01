import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ProductData, ProductModel } from "./ProductModel";


const API_URI = import.meta.env.VITE_CTM_BASE_API;

export const getCustomerProducts = createAsyncThunk<
    ProductData[],
    number,
    { rejectValue: string }
>("products/getCustomerProducts", async (customerId, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${API_URI}/get_customers/${customerId}/accounts/`);
        return response.data.items;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.error || error.message || "Failed to fetch products");
    }
});