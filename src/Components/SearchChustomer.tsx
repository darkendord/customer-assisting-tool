import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import { getSingleCustomer } from "../features/customers/customerThunk";
import { clearCustomerData } from "../features/customers/customerSlice";
import { clearProductData } from "../features/products/productSlice";
import { clearCommentsData } from "../features/comments/commentSlice.ts";
import { clearReportsData, clearSelectedReportData } from "../features/reports/reportSlice";

const SearchCustomer = () => {
    const [search, setSearch] = useState<string>("");
    const dispatch = useDispatch<AppDispatch>();

    // Handle search
    const handleSearch = () => {
        if (search) {
            dispatch(getSingleCustomer(search));
        }
    };

    const handleClear = () => {
        setSearch("");
        dispatch(clearCustomerData());
        dispatch(clearProductData());
        dispatch(clearCommentsData());
        dispatch(clearSelectedReportData());
        dispatch(clearReportsData());
    };

    return (
        <div className="flex items-center justify-center bg-[#fbf4e9] p-4 rounded-2xl shadow mb-6 w-full  mx-auto">
            <input
                type="search"
                id="default-search"
                className="flex-1 p-3 text-[#3a1b10] border border-gray-300 rounded-l-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#3a1b10] transition"
                placeholder="Input the customer ID number..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                required
                onKeyDown={e => { if (e.key === "Enter") handleSearch(); }}
            />
            <button
                className="bg-[#3a1b10] text-white font-semibold rounded-r-lg px-6 py-3 ml-0 hover:bg-[#5c3a23] transition disabled:opacity-60"
                onClick={handleSearch}
                disabled={!search}
            >
                Search
            </button>
            <button
                className="ml-2 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                onClick={handleClear}
            >
                Clear
            </button>
        </div>
    );
}

export default React.memo(SearchCustomer);