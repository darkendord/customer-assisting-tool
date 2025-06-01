import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import employeeReducer from "../features/employees/employeeSlice";
import customerReducer from "../features/customers/customerSlice"
import productsReducer from "../features/products/productSlice";


export const store = configureStore({
    reducer: {
        auth: authReducer,
        employees: employeeReducer,
        customers: customerReducer,
        products: productsReducer
    },

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

