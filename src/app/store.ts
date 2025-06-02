import authReducer from "../features/auth/authSlice";
import employeeReducer from "../features/employees/employeeSlice";
import customerReducer from "../features/customers/customerSlice"
import productsReducer from "../features/products/productSlice";
import commentsReducer from "../features/comments/commentSlice.ts";

import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
    auth: authReducer,
    employee: employeeReducer,
    customers: customerReducer,
    products: productsReducer,
    comments: commentsReducer
});

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["auth", "employee", "customers", "products", "comments"]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        })
});

export const persistor = persistStore(store);

//         employee: employeeReducer,
//         customers: customerReducer,
//         products: productsReducer,
//         comments: commentsReducer
//     },

// });

// const rootReducer = combineReducers({
//     auth: authReducer,
//     employee: employeeReducer,
//     customers: customerReducer,
//     products: productsReducer,
//     comments: commentsReducer
// });

// const persistConfig = {
//     key: "root",
//     storage,
//     whitelist: ["auth", "employee", "customers", "products", "comments"]
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = configureStore({
//   reducer: persistedReducer
// });

// export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

