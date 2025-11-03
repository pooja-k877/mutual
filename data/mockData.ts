
import { MutualFund, PortfolioItem } from '../types';

const generateHistoricalData = (base: number): { date: string; value: number }[] => {
  const data = [];
  let currentValue = base;
  for (let i = 60; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    currentValue += (Math.random() - 0.45) * (base / 100);
    data.push({
      date: date.toISOString().split('T')[0],
      value: parseFloat(currentValue.toFixed(2)),
    });
  }
  return data;
};

export const mockFunds: MutualFund[] = [
  {
    id: 'F01',
    name: 'Tech Growth Fund',
    symbol: 'TGF',
    category: 'Equity',
    riskLevel: 'High',
    nav: 150.75,
    oneYearReturn: 25.5,
    threeYearReturn: 18.2,
    fiveYearReturn: 20.1,
    expenseRatio: 0.85,
    description: 'A fund focusing on high-growth technology companies with strong market potential. Aims for long-term capital appreciation.',
    topHoldings: [
      { name: 'Apple Inc.', percentage: 9.8 },
      { name: 'Microsoft Corp.', percentage: 8.5 },
      { name: 'Amazon.com Inc.', percentage: 7.2 },
    ],
    historicalData: generateHistoricalData(120),
  },
  {
    id: 'F02',
    name: 'Stable Income Bond Fund',
    symbol: 'SIBF',
    category: 'Debt',
    riskLevel: 'Low',
    nav: 105.20,
    oneYearReturn: 5.8,
    threeYearReturn: 4.5,
    fiveYearReturn: 4.9,
    expenseRatio: 0.40,
    description: 'Invests in a diversified portfolio of government and corporate bonds to provide stable income and capital preservation.',
    topHoldings: [
      { name: 'US Treasury Bond 10Y', percentage: 15.0 },
      { name: 'Investment Grade Corporate Bonds', percentage: 12.5 },
      { name: 'Municipal Bonds', percentage: 10.1 },
    ],
    historicalData: generateHistoricalData(100),
  },
  {
    id: 'F03',
    name: 'Balanced Advantage Fund',
    symbol: 'BAF',
    category: 'Hybrid',
    riskLevel: 'Moderate',
    nav: 125.40,
    oneYearReturn: 15.2,
    threeYearReturn: 12.1,
    fiveYearReturn: 13.5,
    expenseRatio: 0.95,
    description: 'A balanced fund that dynamically allocates assets between equity and debt to optimize returns based on market conditions.',
    topHoldings: [
      { name: 'Reliance Industries', percentage: 6.5 },
      { name: 'HDFC Bank', percentage: 5.8 },
      { name: 'Government Securities', percentage: 10.2 },
    ],
    historicalData: generateHistoricalData(110),
  },
  {
    id: 'F04',
    name: 'Global Index Tracker',
    symbol: 'GIT',
    category: 'Index',
    riskLevel: 'Moderate',
    nav: 210.90,
    oneYearReturn: 18.9,
    threeYearReturn: 14.5,
    fiveYearReturn: 16.3,
    expenseRatio: 0.25,
    description: 'This fund tracks a major global index, offering broad diversification across international markets at a low cost.',
    topHoldings: [
        { name: 'S&P 500 Index Fund', percentage: 40.0 },
        { name: 'MSCI World Index Fund', percentage: 30.0 },
        { name: 'FTSE 100 Index Fund', percentage: 15.0 },
    ],
    historicalData: generateHistoricalData(180),
  },
];


export const mockPortfolio: PortfolioItem[] = [
    { ...mockFunds[0], investedValue: 5000, currentValue: 6275, units: 41.62 },
    { ...mockFunds[2], investedValue: 8000, currentValue: 9216, units: 73.49 },
]
