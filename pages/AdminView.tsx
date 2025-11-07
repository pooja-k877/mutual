import React, { useState, useEffect } from "react";

interface Fund {
  id: number;
  name: string;
  description: string;
  returns: string;
}

const AdminView: React.FC = () => {
  const [investedFund, setInvestedFund] = useState<Fund | null>(null);
  const [status, setStatus] = useState<string>("Pending");

  useEffect(() => {
    const storedFund = localStorage.getItem("investedFund");
    if (storedFund) {
      setInvestedFund(JSON.parse(storedFund));
    }
  }, []);

  const handleApprove = () => {
    setStatus("Approved");
    alert(`✅ Investment approved for ${investedFund?.name}`);
  };

  const handleReject = () => {
    setStatus("Rejected");
    alert(`❌ Investment rejected for ${investedFund?.name}`);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Admin Dashboard</h2>

      {investedFund ? (
        <div className="p-6 border rounded-lg shadow-lg bg-white dark:bg-gray-800">
          <h3 className="text-xl font-semibold mb-2">Investment Request</h3>
          <p><strong>Fund Name:</strong> {investedFund.name}</p>
          <p><strong>Description:</strong> {investedFund.description}</p>
          <p><strong>Expected Returns:</strong> {investedFund.returns}</p>
          <p className="mt-2"><strong>Status:</strong> {status}</p>

          {status === "Pending" && (
            <div className="mt-4 flex gap-4">
              <button
                onClick={handleApprove}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Approve
              </button>
              <button
                onClick={handleReject}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Reject
              </button>
            </div>
          )}
        </div>
      ) : (
        <p className="text-center text-gray-500">No investment requests found.</p>
      )}
    </div>
  );
};

export default AdminView;
