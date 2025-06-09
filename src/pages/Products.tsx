import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { getCustomerProducts } from "../features/products/productThunk";
import { ProductData, ProductModel } from "../features/products/ProductModel";
import PageWrapper from "../Components/PageWrapper";

export default function Products() {
  const dispatch = useDispatch();
  const { selectedCustomer } = useSelector((state: RootState) => state.customers);
  const { data: products, isLoading, error } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    if (selectedCustomer?.customer_id) {
      dispatch(getCustomerProducts(selectedCustomer.customer_id) as any);
    }
  }, [selectedCustomer, dispatch]);

  // Group products by account_type
  const grouped = products.reduce<Record<string, ProductData[]>>((acc, prod) => {
    const type = prod.account_type || "Other";
    acc[type] = acc[type] || [];
    acc[type].push(prod);
    return acc;
  }, {});

  return (
    <PageWrapper>
      <div>
        <h2 className="text-2xl font-bold text-[#3a1b10] mb-6">Products</h2>
        {isLoading && <div className="text-[#3a1b10]">Loading products...</div>}
        {error && <div className="bg-red-100 text-red-700 p-4 rounded mb-4">{error}</div>}
        {!isLoading && !error && products.length === 0 && (
          <div className="text-gray-500">No products found for this customer.</div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Object.entries(grouped).map(([type, items]) => (
            <div key={type} className="bg-[#fbf4e9] rounded-2xl shadow p-6">
              <h3 className="text-xl font-semibold text-[#3a1b10] mb-4">{type}</h3>
              <ul className="divide-y divide-[#e0d6c3]">
                {items.map((prod) => (
                  <li key={prod.account_number} className="py-3 flex flex-col">
                    <span className="font-medium text-[#3a1b10]">Account #: {prod.account_number}</span>
                    <span className="text-sm text-gray-700" style={{ color: prod.status === 'Active' ? '#28a745' : '#dc3545' }}>Status: {prod.status}</span>
                    {prod.balance !== undefined && (
                      <span className="text-sm text-gray-700">
                        Balance: {prod.balance}
                      </span>
                    )}
                    {prod.created_at && (
                      <span className="text-xs text-gray-500">Opened: {new Date(prod.created_at).toLocaleDateString()}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}