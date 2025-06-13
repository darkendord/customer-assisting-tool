
const WelcomeModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md relative">
                <button
                    className="absolute top-2 right-4 text-2xl"
                    onClick={onClose}
                    aria-label="Close"
                >
                    &times;
                </button>
                <h2 className="text-xl font-bold mb-4 text-[#3a1b10]">Welcome!</h2>
                <p className="mb-6 text-[#3a1b10]">Welcome to the Customer Assisting Tool. Please use the following inputs to test the app:</p>
                <ul className="list-disc pl-5 mb-6 text-[#3a1b10]">
                    <li>Use email: <span className="font-bold">lisa.davis@company.com</span> and password: <span className="font-bold">12345678</span> to login as customer service agent.</li>
                    <li>Use the "Customer Look Up" to search for customers, ID: <span className="font-bold">ACC10001</span> for testing.</li>
                    <li>Use the "Products" section to view available products.</li>
                    <li>Check the "Reports" section for insights.</li>
                </ul>
                <button
                    className="bg-[#3a1b10] text-white font-semibold rounded-lg px-6 py-2 hover:bg-[#5c3a23] transition"
                    onClick={onClose}
                >
                    OK
                </button>
            </div>
        </div>
    );
};

export default WelcomeModal;