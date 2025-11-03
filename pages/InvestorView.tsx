
import React, { useState } from 'react';
import { mockFunds } from '../data/mockData';
import { MutualFund } from '../types';
import FundCard from '../components/FundCard';
import Modal from '../components/Modal';
import PerformanceChart from '../components/PerformanceChart';

const InvestorView: React.FC = () => {
  const [funds] = useState<MutualFund[]>(mockFunds);
  const [selectedFund, setSelectedFund] = useState<MutualFund | null>(null);
  const [compareList, setCompareList] = useState<string[]>([]);

  const handleCompare = (fundId: string, isSelected: boolean) => {
    if (isSelected) {
      if (compareList.length < 3) {
        setCompareList([...compareList, fundId]);
      } else {
        alert("You can compare a maximum of 3 funds.");
      }
    } else {
      setCompareList(compareList.filter(id => id !== fundId));
    }
  };
  
  const fundsToCompare = funds.filter(fund => compareList.includes(fund.id));

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold mb-2">Explore Mutual Funds</h2>
        <p className="text-gray-600 dark:text-gray-400">Discover and compare funds to find the perfect match for your investment goals.</p>
      </div>

      {compareList.length > 0 && (
        <div className="bg-light-card dark:bg-dark-card p-6 rounded-lg shadow-lg border border-gray-200 dark:border-dark-border">
          <h3 className="text-2xl font-bold mb-4">Fund Comparison</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fundsToCompare.map(fund => (
              <div key={fund.id} className="p-4 bg-gray-50 dark:bg-slate-800 rounded-lg">
                <h4 className="font-bold text-lg text-primary dark:text-secondary">{fund.name}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">{fund.symbol}</p>
                <ul className="mt-4 space-y-2 text-sm">
                  <li><strong>NAV:</strong> ${fund.nav.toFixed(2)}</li>
                  <li><strong>1Y Return:</strong> <span className={fund.oneYearReturn >= 0 ? 'text-green-500' : 'text-red-500'}>{fund.oneYearReturn.toFixed(2)}%</span></li>
                  <li><strong>3Y Return:</strong> <span className={fund.threeYearReturn >= 0 ? 'text-green-500' : 'text-red-500'}>{fund.threeYearReturn.toFixed(2)}%</span></li>
                  <li><strong>Risk:</strong> {fund.riskLevel}</li>
                  <li><strong>Expense Ratio:</strong> {fund.expenseRatio}%</li>
                </ul>
              </div>
            ))}
          </div>
           <button onClick={() => setCompareList([])} className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition">Clear Comparison</button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {funds.map((fund) => (
          <FundCard 
            key={fund.id} 
            fund={fund} 
            onSelect={setSelectedFund} 
            onCompare={handleCompare}
            isComparing={compareList.includes(fund.id)}
          />
        ))}
      </div>

      <Modal isOpen={!!selectedFund} onClose={() => setSelectedFund(null)} title={selectedFund?.name || ''}>
        {selectedFund && (
          <div className="space-y-6">
            <div className="p-4 bg-gray-100 dark:bg-slate-800 rounded-lg">
              <p className="text-gray-700 dark:text-gray-300">{selectedFund.description}</p>
            </div>

            <h4 className="text-xl font-bold">Performance History (NAV)</h4>
            <PerformanceChart data={selectedFund.historicalData} />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div><p className="font-bold text-lg">{selectedFund.oneYearReturn}%</p><p className="text-sm text-gray-500">1Y Return</p></div>
                <div><p className="font-bold text-lg">{selectedFund.threeYearReturn}%</p><p className="text-sm text-gray-500">3Y Return</p></div>
                <div><p className="font-bold text-lg">{selectedFund.fiveYearReturn}%</p><p className="text-sm text-gray-500">5Y Return</p></div>
                <div><p className="font-bold text-lg">{selectedFund.expenseRatio}%</p><p className="text-sm text-gray-500">Expense Ratio</p></div>
            </div>

            <div>
              <h4 className="text-xl font-bold mb-2">Top Holdings</h4>
              <ul className="space-y-2">
                {selectedFund.topHoldings.map(holding => (
                  <li key={holding.name} className="flex justify-between p-2 bg-gray-50 dark:bg-slate-800 rounded">
                    <span>{holding.name}</span>
                    <span className="font-semibold">{holding.percentage}%</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default InvestorView;
