import { createSlice } from "@reduxjs/toolkit";
import { CustomerModel } from "./customerModel";
import { getAllCustomers, getSingleCustomer } from "./customerThunk";

interface CustomerState {
    data: CustomerModel[];
    selectedCustomer: CustomerModel | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: CustomerState = {
    data: [],
    selectedCustomer: null,
    isLoading: false,
    error: null,
};

const customerSlice = createSlice({
    name: "customer",
    initialState,
    reducers: {
        resetError(state) {
            state.error = null;
        },
        clearCustomerData(state) {
            state.data = [];
            state.selectedCustomer = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        // getAllCustomers
        builder
            .addCase(getAllCustomers.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getAllCustomers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload; // action.payload is CustomerModel[]
            })
            .addCase(getAllCustomers.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string || "Failed to fetch customers";
            })
            // getSingleCustomer
            .addCase(getSingleCustomer.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getSingleCustomer.fulfilled, (state, action) => {
                state.isLoading = false;
                state.selectedCustomer = action.payload; // action.payload is CustomerModel
            })
            .addCase(getSingleCustomer.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string || "Failed to fetch customer";
            });
    },
});

export const { resetError, clearCustomerData } = customerSlice.actions;
export default customerSlice.reducer;