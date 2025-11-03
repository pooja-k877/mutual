
import React, { useState, useEffect } from 'react';
import { UserRole } from './types';
import Header from './components/Header';
import InvestorView from './pages/InvestorView';
import AdminView from './pages/AdminView';
import FinancialAdvisorView from './pages/FinancialAdvisorView';
import DataAnalystView from './pages/DataAnalystView';

const App: React.FC = () => {
  const [userRole, setUserRole] = useState<UserRole>(UserRole.Investor);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const renderView = () => {
    switch (userRole) {
      case UserRole.Admin:
        return <AdminView />;
      case UserRole.FinancialAdvisor:
        return <FinancialAdvisorView />;
      case UserRole.DataAnalyst:
        return <DataAnalystView />;
      case UserRole.Investor:
      default:
        return <InvestorView />;
    }
  };

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text transition-colors duration-300">
      <Header
        userRole={userRole}
        setUserRole={setUserRole}
        isDarkMode={isDarkMode}
        toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
      />
      <main className="p-4 sm:p-6 lg:p-8">
        {renderView()}
      </main>
    </div>
  );
};

export default App;
