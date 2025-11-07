import React, { useState } from "react";

interface Fund {
  id: number;
  name: string;
  description: string;
  returns: string;
}

const InvestorView: React.FC = () => {
  const [investedFund, setInvestedFund] = useState<Fund | null>(null);

  const funds: Fund[] = [
    { id: 1, name: "HDFC Equity Fund", description: "High growth large-cap equity fund.", returns: "12.4%" },
    { id: 2, name: "SBI Bluechip Fund", description: "Balanced blue-chip fund with moderate risk.", returns: "10.1%" },
    { id: 3, name: "Axis Growth Fund", description: "Mid-cap focused fund with aggressive returns.", returns: "14.2%" },
  ];

  const handleInvest = (fund: Fund) => {
    setInvestedFund(fund);
    localStorage.setItem("investedFund", JSON.stringify(fund));
    alert(`✅ You have successfully invested in ${fund.name}!`);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-center">Available Mutual Funds</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {funds.map((fund) => (
          <div key={fund.id} className="p-4 border rounded-xl shadow-md bg-white dark:bg-gray-800">
            <h3 className="text-xl font-semibold mb-2">{fund.name}</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-2">{fund.description}</p>
            <p className="font-medium mb-3">Expected Returns: {fund.returns}</p>
            <button
              onClick={() => handleInvest(fund)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Invest
            </button>
          </div>
        ))}
      </div>

      {investedFund && (
        <div className="mt-8 p-4 border-t border-gray-400 text-center">
          <h3 className="text-xl font-semibold">Your Investment</h3>
          <p className="mt-2">
            You have invested in <strong>{investedFund.name}</strong> with expected returns of{" "}
            {investedFund.returns}.
          </p>
        </div>
      )}
    </div>
  );
};

export default InvestorView;
