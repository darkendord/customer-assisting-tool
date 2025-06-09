import { createSlice } from "@reduxjs/toolkit";
import { ProductData } from "./ProductModel";
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
    reducers: {
        resetError(state) {
            state.error = null;
        },
        clearProductData(state) {
            state.data = [];
            state.error = null;
        },
    },
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
export const { resetError, clearProductData } = productSlice.actions;
export default productSlice.reducer;