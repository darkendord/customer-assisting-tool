import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { CustomerModel } from '../features/customers/customerModel';

function CustomerInformation() {
    const { selectedCustomer, isLoading, error } = useSelector((state: RootState) => state.customers);

    // Format address from multiple fields
    const getAddress = (customer: CustomerModel) => {
        const parts = [
            customer.address_line1,
            customer.address_line2,
            customer.city,
            customer.state,
            customer.postal_code,
            customer.country,
        ].filter(Boolean); // Remove undefined/null
        return parts.join(', ') || 'N/A';
    };

    return (
        <div className="bg-white rounded-2xl shadow p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 text-[#3a1b10]">Customer Information</h2>
            {isLoading && <p className="text-gray-600">Loading customer...</p>}
            {error && (
                <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
                    <p>Error: {error}</p>
                </div>
            )}
            {!isLoading && !error && !selectedCustomer && (
                <p className="text-gray-600">No customer selected.</p>
            )}
            {selectedCustomer && (
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                        <p className="font-bold">
                            Name:{' '}
                            <span className="font-normal">
                                {selectedCustomer.first_name} {selectedCustomer.last_name}
                            </span>
                        </p>
                        <p className="font-bold">
                            Email: <span className="font-normal">{selectedCustomer.email}</span>
                        </p>
                        <p className="font-bold">
                            Phone:{' '}
                            <span className="font-normal">
                                {selectedCustomer.phone_number || 'N/A'}
                            </span>
                        </p>
                    </div>
                    <div className="flex-1">
                        <p className="font-bold">
                            Address:{' '}
                            <span className="font-normal">{getAddress(selectedCustomer)}</span>
                        </p>
                        <p className="font-bold">
                            Customer Type:{' '}
                            <span className="font-normal">{selectedCustomer.customer_type}</span>
                        </p>
                        <p className="font-bold">
                            Status: <span
                                style={{ color: 'white', padding: '2px 8px', borderRadius: '20px', backgroundColor: selectedCustomer.status === 'Active' ? '#28a745' : '#dc3545' }}
                                className="font-normal"
                            >{selectedCustomer.status}</span>
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default React.memo(CustomerInformation);