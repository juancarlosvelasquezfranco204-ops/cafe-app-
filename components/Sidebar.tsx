import React from 'react';
import { LayoutDashboard, Sprout, Package, Users, MessageSquareText, Menu, X } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isOpen, setIsOpen }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Panel General', icon: <LayoutDashboard size={20} /> },
    { id: 'crops', label: 'Mis Cultivos', icon: <Sprout size={20} /> },
    { id: 'inventory', label: 'Bodega e Insumos', icon: <Package size={20} /> },
    { id: 'labor', label: 'Personal', icon: <Users size={20} /> },
    { id: 'advisor', label: 'Asistente IA', icon: <MessageSquareText size={20} /> },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed top-0 left-0 z-30 h-screen w-64 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
      `}>
        <div className="h-full flex flex-col">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
               <div className="w-8 h-8 bg-coffee-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                 CM
               </div>
               <span className="font-bold text-gray-800 text-lg tracking-tight">CoffeeManager</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="md:hidden text-gray-500">
              <X size={24} />
            </button>
          </div>

          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeTab === item.id 
                    ? 'bg-coffee-50 text-coffee-700 shadow-sm border border-coffee-100' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </nav>

          <div className="p-4 border-t border-gray-100">
            <div className="bg-gradient-to-br from-coffee-600 to-coffee-800 rounded-xl p-4 text-white">
              <p className="text-xs font-medium text-coffee-100 mb-1">Plan Premium</p>
              <p className="text-sm font-bold mb-3">Tu suscripción expira en 15 días</p>
              <button className="w-full bg-white/10 hover:bg-white/20 text-xs py-2 rounded border border-white/20 transition-colors">
                Renovar Ahora
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;