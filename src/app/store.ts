import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import employeeReducer from "../features/employees/employeeSlice";
import customerReducer from "../features/customers/customerSlice"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        employees: employeeReducer,
        customers: customerReducer
    },

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

