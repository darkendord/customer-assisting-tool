import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { getCustomerProducts } from "../features/products/productThunk";
import { ProductData } from "../features/products/ProductModel";
import { LoanData } from "../features/products/ProductModel";
import { CardData } from "../features/products/ProductModel";
import PageWrapper from "../Components/PageWrapper";
import { getCards, getLoans } from "../services/productServices";

export default function Products() {
  const dispatch = useDispatch();
  const { selectedCustomer } = useSelector((state: RootState) => state.customers);
  const { data: products, isLoading, error } = useSelector((state: RootState) => state.products);

  const [loans, setLoans] = useState<Record<string, LoanData[]>>({});
  const [cards, setCards] = useState<Record<string, CardData[]>>({});
  const [loadingExtras, setLoadingExtras] = useState(false);

  useEffect(() => {
    if (selectedCustomer?.customer_id) {
      dispatch(getCustomerProducts(selectedCustomer.customer_id) as any);
    }
  }, [selectedCustomer, dispatch]);

  useEffect(() => {
    const fetchExtras = async () => {
      setLoadingExtras(true);
      const loansObj: Record<string, LoanData[]> = {};
      const cardsObj: Record<string, CardData[]> = {};
      await Promise.all(
        products.map(async (prod) => {
          try {
            loansObj[prod.account_number] = await getLoans(prod.account_number);
          } catch {
            loansObj[prod.account_number] = [];
          }
          try {
            cardsObj[prod.account_number] = await getCards(prod.account_number);
          } catch {
            cardsObj[prod.account_number] = [];
          }
        })
      );
      setLoans(loansObj);
      setCards(cardsObj);
      setLoadingExtras(false);
    };
    if (products.length > 0) fetchExtras();
    else {
      setLoans({});
      setCards({});
    }
  }, [products]);

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
        <h2 className="text-3xl font-extrabold text-[#3a1b10] mb-8 text-center tracking-tight">Products</h2>
        {isLoading && <div className="text-[#3a1b10] text-center text-lg">Loading products...</div>}
        {error && <div className="bg-red-100 text-red-700 p-4 rounded mb-4 text-center">{error}</div>}
        {!isLoading && !error && products.length === 0 && (
          <div className="text-gray-500 text-center">No products found for this customer.</div>
        )}
        <div className="space-y-12 flex justify-center">
          {Object.entries(grouped).map(([type, items]) => (
            <div key={type}>
              <div className="flex flex-col justify-center w-3xl">
                {/* SAVINGS */}
                {items.map((prod) => (
                  <div
                    key={prod.account_number}
                    className="bg-white border border-[#e0d6c3] rounded-2xl p-6 shadow-md flex flex-col"
                  >
                    <div className="font-semibold text-[#3a1b10]">{type} Account</div>

                    <div className="w-full">
                      <div className="bg-[#f7fafc] border border-[#e0d6c3] rounded-lg p-3 shadow-sm mb-2 text-center">
                        <span className="font-semibold text-[#3a1b10] text-base mb-1 text-center">
                          Account #: {prod.account_number}
                        </span>
                        <div className="font-semibold text-[#3a1b10]">Balance</div>
                        <div className="text-base text-gray-700 font-bold">
                          ${prod.balance}
                        </div>
                        {prod.created_at && (
                          <>
                            <div className="font-semibold text-[#3a1b10]">Opened</div>
                            <div className="text-xs text-gray-600">
                              {new Date(prod.created_at).toLocaleDateString()}
                            </div>
                          </>
                        )}
                        <div className="text-xs mt-1 text-center">
                          Status:{" "}
                          <span className={prod.status === "Active" ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
                            {prod.status}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* LOANS */}
                    <div className="mt-4 w-full">
                      <span className="font-semibold text-[#3a1b10]">Loans:</span>
                      {loadingExtras ? (
                        <span className="ml-2 text-gray-500">Loading...</span>
                      ) : loans[prod.account_number]?.length ? (
                        <div className="grid grid-cols-1 gap-3 mt-2">
                          {loans[prod.account_number].map((loan) => (
                            <div
                              key={loan.loan_id}
                              className="bg-[#f7fafc] border border-[#e0d6c3] rounded-lg p-3 shadow-sm text-center"
                            >
                              <div className="font-semibold text-[#3a1b10]">{loan.loan_type} Loan</div>
                              <div className="text-sm text-gray-700">
                                Amount: <b>${loan.amount}</b> @ {loan.interest_rate}%<br />
                                <span className="text-xs text-gray-600">
                                  {new Date(loan.start_date).toLocaleDateString()} - {new Date(loan.end_date).toLocaleDateString()}
                                </span>
                              </div>
                              <div className="text-xs mt-1">
                                Status:{" "}
                                <span className={loan.status === "Active" ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
                                  {loan.status}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <span className="ml-2 text-gray-500">No loans</span>
                      )}
                    </div>
                    {/* CARDS */}
                    <div className="mt-4 w-full">
                      <span className="font-semibold text-[#3a1b10]">Cards:</span>
                      {loadingExtras ? (
                        <span className="ml-2 text-gray-500">Loading...</span>
                      ) : cards[prod.account_number]?.length ? (
                        <div className="grid grid-cols-1 gap-3 mt-2">
                          {cards[prod.account_number].map((card) => (
                            <div
                              key={card.card_id}
                              className="bg-[#f7fafc] border border-[#e0d6c3] rounded-lg p-3 shadow-sm text-center"
                            >
                              <div className="font-semibold text-[#3a1b10]">{card.card_type} Card</div>
                              <div className="text-sm text-gray-700">
                                Number: <span className="font-mono tracking-widest">**** **** **** {card.card_number.slice(-4)}</span>
                              </div>
                              <div className="text-xs text-gray-600">
                                Expires: {new Date(card.expiry_date).toLocaleDateString()}
                              </div>
                              <div className="text-xs mt-1">
                                Status:{" "}
                                <span className={card.status === "Active" ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
                                  {card.status}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <span className="ml-2 text-gray-500">No cards</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}