import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Crops from './components/Crops';
import Inventory from './components/Inventory';
import Labor from './components/Labor';
import AIAdvisor from './components/AIAdvisor';
import { Menu } from 'lucide-react';
import { MOCK_LOTS, MOCK_INVENTORY, MOCK_WORKERS, MOCK_FINANCIALS } from './constants';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard financials={MOCK_FINANCIALS} lots={MOCK_LOTS} inventory={MOCK_INVENTORY} />;
      case 'crops':
        return <Crops lots={MOCK_LOTS} />;
      case 'inventory':
        return <Inventory items={MOCK_INVENTORY} />;
      case 'labor':
        return <Labor workers={MOCK_WORKERS} />;
      case 'advisor':
        return <AIAdvisor lots={MOCK_LOTS} inventory={MOCK_INVENTORY} workers={MOCK_WORKERS} financials={MOCK_FINANCIALS} />;
      default:
        return <Dashboard financials={MOCK_FINANCIALS} lots={MOCK_LOTS} inventory={MOCK_INVENTORY} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isOpen={sidebarOpen} 
        setIsOpen={setSidebarOpen} 
      />

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 flex flex-col min-h-screen transition-all duration-300">
        {/* Mobile Header */}
        <header className="md:hidden bg-white border-b border-gray-200 p-4 sticky top-0 z-10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-coffee-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">CM</div>
            <span className="font-bold text-gray-800">CoffeeManager</span>
          </div>
          <button onClick={() => setSidebarOpen(true)} className="text-gray-600 hover:text-coffee-600 p-1">
            <Menu size={24} />
          </button>
        </header>

        {/* Content Padding */}
        <div className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full">
           {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;