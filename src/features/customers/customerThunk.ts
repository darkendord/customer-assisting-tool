import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { CustomerModel } from './customerModel';


const API_URI = import.meta.env.VITE_CTM_BASE_API;

export const getAllCustomers = createAsyncThunk<
    CustomerModel[],
    void,
    { rejectValue: string }
>("customer/getAllCustomers", async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${API_URI}/get_customers`);

        return CustomerModel.parseList(response.data.items);
    } catch (error: any) {
        return rejectWithValue(error.response?.data || error.message);
    }
})


// Thunk to fetch a single customer by email and account_number
export const getSingleCustomer = createAsyncThunk<
    CustomerModel, // The type of the resolved value
    string,        // The type of the parameter (accountNumber)
    { rejectValue: string } // The type of the rejected value
>(
    "customer/getSingleCustomer",
    async (accountNumber, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URI}/get_customer/${accountNumber}`);

            // Ensure the response data is properly mapped to a CustomerModel instance
            console.log(response.data.items[0]);

            return new CustomerModel(response.data.items[0]);
        } catch (error: any) {
            const errorMessage = error.response?.data?.error || error.message || "Failed to fetch customer";
            return rejectWithValue(errorMessage);
        }
    }
);