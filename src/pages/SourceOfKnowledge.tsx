import { useState } from "react";
import PageWrapper from "../Components/PageWrapper";

const knowledgeData = [
    {
        category: "Account Cycles",
        items: [
            {
                question: "What are the account cycles?",
                answer: (
                    <ul>
                        <li>
                            <b>Cycle A:</b> 1st–30th of each month
                        </li>
                        <li>
                            <b>Cycle B:</b> 7th–6th of next month
                        </li>
                        <li>
                            <b>Cycle C:</b> 15th–14th of next month
                        </li>
                        <li>
                            <b>Payment Due:</b> 21 days after cut-off
                        </li>
                    </ul>
                ),
            },
        ],
    },
    {
        category: "FAQs",
        items: [
            {
                question: "How do I create a report?",
                answer: "Go to Reports, select a customer, fill in the details, and submit.",
            },
            {
                question: "What is the late payment policy?",
                answer: "Payments after the due date may incur fees and affect credit.",
            },
        ],
    },
    {
        category: "Company Policies",
        items: [
            {
                question: "What is the Code of Conduct?",
                answer: (
                    <ul>
                        <li>Treat customers with respect and professionalism.</li>
                        <li>Maintain confidentiality of customer information.</li>
                        <li>Follow ethical standards in all interactions.</li>
                    </ul>
                ),
            },
            {
                question: "What is the Customer Privacy Policy?",
                answer: (
                    <ul>
                        <li>Customer data is protected under GDPR and CCPA regulations.</li>
                        <li>Data is only shared with authorized personnel or with customer consent.</li>
                        <li>Secure storage and encrypted transmission of sensitive information.</li>
                    </ul>
                ),
            },
            {
                question: "What are the escalation procedures?",
                answer: (
                    <ul>
                        <li>Level 1: Addressed by customer service agent.</li>
                        <li>Level 2: Escalate to supervisor if unresolved within 24 hours.</li>
                        <li>Level 3: Compliance team for regulatory issues (contact: compliance@bank.com).</li>
                    </ul>
                ),
            },
            {
                question: "What are the compliance guidelines?",
                answer: (
                    <ul>
                        <li>Adhere to AML (Anti-Money Laundering) and KYC (Know Your Customer) regulations.</li>
                        <li>Verify customer identity for transactions above $10,000.</li>
                    </ul>
                ),
            },
            {
                question: "What is the dress code and remote work policy?",
                answer: (
                    <ul>
                        <li>Business casual for in-office staff.</li>
                        <li>Remote work: Professional appearance for video calls, stable internet required.</li>
                    </ul>
                ),
            },
        ],
    },
    {
        category: "Product & Service Information",
        items: [
            {
                question: "What are the types of accounts?",
                answer: (
                    <ul>
                        <li>
                            <b>Savings Account:</b> High-yield interest (2.5% APR), online banking, 18+, min. deposit $100, 6 free withdrawals/month.
                        </li>
                        <li>
                            <b>Checking Account:</b> Free online banking, debit card, mobile app, $35 overdraft fee, no monthly fee with $1,000 min. balance.
                        </li>
                        <li>
                            <b>Business Account:</b> Business registration, EIN, $500 min. deposit, free wire transfers, dedicated account manager.
                        </li>
                        <li>
                            <b>Credit Cards:</b> Rewards (1% cashback), Travel (2x points), Secured Card. 18+, credit score 600+ for Rewards/Travel.
                        </li>
                        <li>
                            <b>Loans:</b> Personal, Auto, Mortgage, Business. See FAQ for details.
                        </li>
                    </ul>
                ),
            },
            {
                question: "What are the features and requirements for loans?",
                answer: (
                    <ul>
                        <li>
                            <b>Personal Loan:</b> $1,000-$50,000, 5-12% APR, 1-5 year terms.
                        </li>
                        <li>
                            <b>Auto Loan:</b> $5,000-$100,000, 4-8% APR, 2-7 year terms.
                        </li>
                        <li>
                            <b>Mortgage:</b> Fixed (3.5-5.5% APR) or adjustable, 15-30 year terms.
                        </li>
                        <li>
                            <b>Business Loan:</b> $10,000-$500,000, 6-10% APR, collateral required.
                        </li>
                    </ul>
                ),
            },
        ],
    },
    {
        category: "Account Cycles & Cut-Offs",
        items: [
            {
                question: "What are the account cycles and payment windows?",
                answer: (
                    <ul>
                        <li><b>Cycle A:</b> 1st to 30th of each month</li>
                        <li><b>Cycle B:</b> 7th to 6th of next month</li>
                        <li><b>Cycle C:</b> 15th to 14th of next month</li>
                        <li><b>Payment Window:</b> 21 days from cut-off date to pay</li>
                    </ul>
                ),
            },
            {
                question: "What is the late payment policy?",
                answer: (
                    <ul>
                        <li>Fee: $25 for payments after 21-day window.</li>
                        <li>Grace Period: 5 days after due date, no credit impact if paid.</li>
                        <li>Credit Impact: Reported to credit bureaus after 30 days late.</li>
                    </ul>
                ),
            },
        ],
    },
    {
        category: "Technical Help",
        items: [
            {
                question: "How do I resolve system login issues?",
                answer: (
                    <ul>
                        <li>Clear browser cache, try incognito mode, contact IT if unresolved.</li>
                    </ul>
                ),
            },
            {
                question: "How do I reset my password?",
                answer: (
                    <ul>
                        <li>Use 'Forgot Password' link, contact IT for manual reset.</li>
                    </ul>
                ),
            },
            {
                question: "How do I use the Customer Lookup Tool?",
                answer: (
                    <ul>
                        <li>Access via intranet, search by name/SSN/account number.</li>
                    </ul>
                ),
            },
            {
                question: "How do I file a report?",
                answer: (
                    <ul>
                        <li>Use Report Portal, select issue type, submit within 24 hours.</li>
                    </ul>
                ),
            },
            {
                question: "How do I contact IT support?",
                answer: (
                    <ul>
                        <li>Email: it@bank.com</li>
                        <li>Phone: 1-800-555-1234</li>
                        <li>Hours: 9 AM-5 PM</li>
                    </ul>
                ),
            },
        ],
    },
    {
        category: "Process Flows & How-Tos",
        items: [
            {
                question: "How do I open a new account?",
                answer: (
                    <ol>
                        <li>Verify customer identity (ID, SSN, address).</li>
                        <li>Check eligibility in Customer Lookup Tool.</li>
                        <li>Create account in Banking System, issue account number.</li>
                        <li>Provide welcome kit (online or physical).</li>
                    </ol>
                ),
            },
            {
                question: "How do I process a loan application?",
                answer: (
                    <ol>
                        <li>Collect application and documents (ID, income proof).</li>
                        <li>Run credit check via Credit Bureau API.</li>
                        <li>Approve/deny based on credit score and policy.</li>
                        <li>Notify customer within 3 business days.</li>
                    </ol>
                ),
            },
            {
                question: "How do I handle customer complaints?",
                answer: (
                    <ol>
                        <li>Log complaint in CRM system.</li>
                        <li>Acknowledge within 24 hours, resolve within 5 days.</li>
                        <li>Escalate to supervisor if needed.</li>
                    </ol>
                ),
            },
            {
                question: "How do I report suspicious activity?",
                answer: (
                    <ol>
                        <li>Flag account in Fraud Detection System.</li>
                        <li>Collect details (transaction ID, date, amount).</li>
                        <li>Submit report to Compliance Team.</li>
                    </ol>
                ),
            },
        ],
    },
    {
        category: "Glossary",
        items: [
            {
                question: "What is a Cut-off Date?",
                answer: "The last day of an account cycle or billing period.",
            },
            {
                question: "What is Overdraft?",
                answer: "A withdrawal exceeding the account balance.",
            },
            {
                question: "What is APR?",
                answer: "Annual Percentage Rate, the cost of borrowing money.",
            },
            {
                question: "What is AUX?",
                answer: "Agent status (Ready, Break, etc.) shown in the Agent Bar.",
            },
        ],
    },
    {
        category: "Contact Directory",
        items: [
            {
                question: "Who are the internal contacts?",
                answer: (
                    <ul>
                        <li>Supervisors: Jane Doe (jane.doe@bank.com, 1-800-555-5678)</li>
                        <li>IT: it@bank.com, 1-800-555-1234</li>
                        <li>HR: hr@bank.com, 1-800-555-9012</li>
                        <li>Compliance: compliance@bank.com, 1-800-555-3456</li>
                    </ul>
                ),
            },
            {
                question: "Who are the external contacts?",
                answer: (
                    <ul>
                        <li>Emergency: 911</li>
                        <li>Partner Banks: First National (1-800-555-7890), City Bank (1-800-555-2345)</li>
                    </ul>
                ),
            },
        ],
    },
    {
        category: "Quick Reference Charts",
        items: [
            {
                question: "Account Types Comparison",
                answer: (
                    <table className="min-w-full text-left border mt-2">
                        <thead>
                            <tr>
                                <th className="border px-2">Account Type</th>
                                <th className="border px-2">Min. Deposit</th>
                                <th className="border px-2">Fees</th>
                                <th className="border px-2">Benefits</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border px-2">Savings</td>
                                <td className="border px-2">$100</td>
                                <td className="border px-2">$5/withdrawal after 6</td>
                                <td className="border px-2">2.5% APR</td>
                            </tr>
                            <tr>
                                <td className="border px-2">Checking</td>
                                <td className="border px-2">$0</td>
                                <td className="border px-2">$12/month if &lt; $1,000</td>
                                <td className="border px-2">Free debit card</td>
                            </tr>
                            <tr>
                                <td className="border px-2">Business</td>
                                <td className="border px-2">$500</td>
                                <td className="border px-2">None</td>
                                <td className="border px-2">Free wire transfers</td>
                            </tr>
                        </tbody>
                    </table>
                ),
            },
            {
                question: "Cycle and Payment Calendar",
                answer: (
                    <table className="min-w-full text-left border mt-2">
                        <thead>
                            <tr>
                                <th className="border px-2">Cycle</th>
                                <th className="border px-2">Dates</th>
                                <th className="border px-2">Payment Due</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border px-2">A</td>
                                <td className="border px-2">1st-30th</td>
                                <td className="border px-2">21 days after 30th</td>
                            </tr>
                            <tr>
                                <td className="border px-2">B</td>
                                <td className="border px-2">7th-6th</td>
                                <td className="border px-2">21 days after 6th</td>
                            </tr>
                            <tr>
                                <td className="border px-2">C</td>
                                <td className="border px-2">15th-14th</td>
                                <td className="border px-2">21 days after 14th</td>
                            </tr>
                        </tbody>
                    </table>
                ),
            },
            {
                question: "Fee Schedules",
                answer: (
                    <ul>
                        <li>Overdraft: $35</li>
                        <li>Late Payment: $25</li>
                        <li>Checking Account: $12/month if balance &lt; $1,000</li>
                    </ul>
                ),
            },
        ],
    },
    // Add more categories and items as needed
];

const SourceOfKnowledge = () => {
    const [search, setSearch] = useState("");

    return (
        <PageWrapper>
            <div className="flex flex-col items-center justify-center h-full min-h-[60vh]">
                <h1 className="text-2xl font-bold mb-4 text-[#3a1b10]">
                    Source Of Knowledge (SOK)
                </h1>
                <input
                    className="mb-6 p-2 border rounded w-full max-w-md"
                    placeholder="Search for policies, cycles, FAQs..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <div className="w-full max-w-2xl">
                    {knowledgeData.map((section) => (
                        <div key={section.category} className="mb-6">
                            <h2 className="text-xl font-semibold mb-2 text-[#5c3a23]">
                                {section.category}
                            </h2>
                            {section.items
                                .filter(
                                    (item) =>
                                        item.question
                                            .toLowerCase()
                                            .includes(search.toLowerCase()) ||
                                        (typeof item.answer === "string" &&
                                            item.answer
                                                .toLowerCase()
                                                .includes(search.toLowerCase()))
                                )
                                .map((item, idx) => (
                                    <details
                                        key={idx}
                                        className="mb-2 bg-[#fbf4e9] rounded p-3"
                                    >
                                        <summary className="cursor-pointer font-medium">
                                            {item.question}
                                        </summary>
                                        <div className="mt-2">{item.answer}</div>
                                    </details>
                                ))}
                        </div>
                    ))}
                </div>
            </div>
        </PageWrapper>
    );
};

export default SourceOfKnowledge;