
export enum UserRole {
  Investor = 'Investor',
  FinancialAdvisor = 'Financial Advisor',
  DataAnalyst = 'Data Analyst',
  Admin = 'Admin',
}

export interface HistoricalData {
  date: string;
  value: number;
}

export interface MutualFund {
  id: string;
  name: string;
  symbol: string;
  category: 'Equity' | 'Debt' | 'Hybrid' | 'Index';
  riskLevel: 'Low' | 'Moderate' | 'High';
  nav: number; // Net Asset Value
  oneYearReturn: number;
  threeYearReturn: number;
  fiveYearReturn: number;
  expenseRatio: number;
  description: string;
  topHoldings: { name: string; percentage: number }[];
  historicalData: HistoricalData[];
}

export interface PortfolioItem extends MutualFund {
    investedValue: number;
    currentValue: number;
    units: number;
}
