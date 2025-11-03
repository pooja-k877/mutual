
import React, { useState } from 'react';
import { UserRole } from '../types';
import { USER_ROLES, ICONS } from '../constants';

interface HeaderProps {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ userRole, setUserRole, isDarkMode, toggleDarkMode }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="bg-light-card dark:bg-dark-card shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <h1 className="text-xl font-bold text-primary dark:text-secondary">
              <span className="text-2xl">📈</span> FundFolio
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-2 bg-gray-100 dark:bg-slate-700 px-4 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-slate-600 transition"
              >
                <span>{userRole}</span>
                {ICONS.chevronDown}
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-light-card dark:bg-dark-card rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5">
                  {USER_ROLES.map((role) => (
                    <a
                      key={role}
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setUserRole(role);
                        setDropdownOpen(false);
                      }}
                      className="block px-4 py-2 text-sm text-light-text dark:text-dark-text hover:bg-gray-100 dark:hover:bg-slate-700"
                    >
                      {role}
                    </a>
                  ))}
                </div>
              )}
            </div>
            <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-slate-700 transition">
              {isDarkMode ? ICONS.sun : ICONS.moon}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
