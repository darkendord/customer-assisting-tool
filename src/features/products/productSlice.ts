import { createSlice } from "@reduxjs/toolkit";
import { ProductData, ProductModel } from "./ProductModel";
import { getCustomerProducts } from "./productThunk";

interface ProductState {
    data: ProductData[];
    isLoading: boolean;
    error: string | null;
}

const initialState: ProductState = {
    data: [],
    isLoading: false,
    error: null,
};

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCustomerProducts.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getCustomerProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(getCustomerProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string || "Failed to fetch products";
            });
    },
});

export default productSlice.reducer;