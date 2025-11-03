
import React from 'react';
import { MutualFund } from '../types';

interface FundCardProps {
  fund: MutualFund;
  onSelect: (fund: MutualFund) => void;
  onCompare: (fundId: string, isSelected: boolean) => void;
  isComparing: boolean;
}

const FundCard: React.FC<FundCardProps> = ({ fund, onSelect, onCompare, isComparing }) => {
  const returnColor = fund.oneYearReturn >= 0 ? 'text-green-500' : 'text-red-500';

  const handleCompareChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onCompare(fund.id, e.target.checked);
  };
  
  return (
    <div className="bg-light-card dark:bg-dark-card rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-4 flex flex-col justify-between border border-gray-200 dark:border-dark-border">
      <div>
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-bold text-primary dark:text-secondary-hover">{fund.name}</h3>
          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
            fund.riskLevel === 'Low' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
            fund.riskLevel === 'Moderate' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
            'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
          }`}>
            {fund.riskLevel} Risk
          </span>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">{fund.symbol} &bull; {fund.category}</p>
        <div className="my-4 grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">NAV</p>
            <p className="text-lg font-semibold">${fund.nav.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">1Y Return</p>
            <p className={`text-lg font-semibold ${returnColor}`}>{fund.oneYearReturn.toFixed(2)}%</p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between mt-2">
        <button
          onClick={() => onSelect(fund)}
          className="w-1/2 bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-hover transition"
        >
          Details
        </button>
        <label className="ml-4 flex items-center space-x-2 text-sm cursor-pointer">
          <input 
            type="checkbox"
            checked={isComparing}
            onChange={handleCompareChange}
            className="form-checkbox h-5 w-5 text-secondary rounded focus:ring-secondary-hover" />
          <span>Compare</span>
        </label>
      </div>
    </div>
  );
};

export default FundCard;
