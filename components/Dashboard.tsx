import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { FinancialRecord, Lot, InventoryItem, LotStatus } from '../types';
import { TrendingUp, TrendingDown, AlertTriangle, Leaf, DollarSign, Package } from 'lucide-react';

interface DashboardProps {
  financials: FinancialRecord[];
  lots: Lot[];
  inventory: InventoryItem[];
}

const KPICard = ({ title, value, subtext, icon, trend }: { title: string, value: string, subtext: string, icon: React.ReactNode, trend?: 'up' | 'down' | 'neutral' }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start justify-between">
    <div>
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <h3 className="text-2xl font-bold text-gray-800 mt-1">{value}</h3>
      <p className={`text-xs mt-2 font-medium ${trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-500' : 'text-gray-400'}`}>
        {subtext}
      </p>
    </div>
    <div className={`p-3 rounded-lg ${trend === 'up' ? 'bg-green-100 text-green-700' : trend === 'down' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
      {icon}
    </div>
  </div>
);

const TrafficLight = ({ status }: { status: 'good' | 'warning' | 'critical' }) => {
  const colors = {
    good: 'bg-green-500 shadow-green-200',
    warning: 'bg-yellow-400 shadow-yellow-200',
    critical: 'bg-red-500 shadow-red-200'
  };
  return <div className={`w-4 h-4 rounded-full shadow-lg ${colors[status]} ring-2 ring-white`} />;
};

const Dashboard: React.FC<DashboardProps> = ({ financials, lots, inventory }) => {
  // Logic to determine overall health
  const lowStockItems = inventory.filter(i => i.quantity <= i.minThreshold);
  const criticalLots = lots.filter(l => l.status === LotStatus.CRITICAL || l.status === LotStatus.NEEDS_ATTENTION);
  
  const totalProfit = financials.reduce((acc, curr) => acc + curr.profit, 0);
  const lastMonthProfit = financials[financials.length - 1].profit;
  const prevMonthProfit = financials[financials.length - 2].profit;
  const profitTrend = lastMonthProfit >= prevMonthProfit ? 'up' : 'down';

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Panel de Control</h2>
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
           <span className="text-sm font-medium text-gray-600">Estado General:</span>
           <TrafficLight status={criticalLots.length > 0 || lowStockItems.length > 0 ? 'warning' : 'good'} />
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard 
          title="Rentabilidad Total" 
          value={`$${totalProfit.toLocaleString()}`} 
          subtext={profitTrend === 'up' ? "+12% vs mes anterior" : "-5% vs mes anterior"}
          trend={profitTrend}
          icon={<DollarSign size={20} />}
        />
        <KPICard 
          title="Lotes Activos" 
          value={lots.length.toString()} 
          subtext={`${criticalLots.length} requieren atención`}
          trend={criticalLots.length === 0 ? 'up' : 'down'}
          icon={<Leaf size={20} />}
        />
        <KPICard 
          title="Alertas de Stock" 
          value={lowStockItems.length.toString()} 
          subtext="Items bajo mínimo"
          trend={lowStockItems.length > 0 ? 'down' : 'neutral'}
          icon={<Package size={20} />}
        />
        <KPICard 
          title="Eficiencia Laboral" 
          value="88%" 
          subtext="Promedio general"
          trend="up"
          icon={<TrendingUp size={20} />}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Finanzas (Últimos 6 Meses)</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={financials}>
                <defs>
                  <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#816155" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#816155" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Area type="monotone" dataKey="profit" stroke="#816155" fillOpacity={1} fill="url(#colorProfit)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
           <h3 className="text-lg font-bold text-gray-800 mb-4">Ingresos vs Gastos</h3>
           <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={financials}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                <Legend iconType="circle" />
                <Bar dataKey="income" name="Ingresos" fill="#22c55e" radius={[4, 4, 0, 0]} />
                <Bar dataKey="expenses" name="Gastos" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;