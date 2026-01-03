import React from 'react';
import { InventoryItem } from '../types';
import { AlertCircle, CheckCircle, Package } from 'lucide-react';

interface InventoryProps {
  items: InventoryItem[];
}

const Inventory: React.FC<InventoryProps> = ({ items }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Inventario Digital</h2>
        <button className="bg-coffee-600 hover:bg-coffee-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          + Registrar Entrada
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-coffee-50 border-b border-coffee-100">
                <th className="p-4 text-sm font-semibold text-gray-600">Producto</th>
                <th className="p-4 text-sm font-semibold text-gray-600">Categoría</th>
                <th className="p-4 text-sm font-semibold text-gray-600">Existencias</th>
                <th className="p-4 text-sm font-semibold text-gray-600">Unidad</th>
                <th className="p-4 text-sm font-semibold text-gray-600">Estado</th>
                <th className="p-4 text-sm font-semibold text-gray-600">Vencimiento</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {items.map((item) => {
                const isLow = item.quantity <= item.minThreshold;
                return (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 font-medium text-gray-800 flex items-center gap-2">
                       <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center text-gray-500">
                         <Package size={16} />
                       </div>
                       {item.name}
                    </td>
                    <td className="p-4 text-gray-600">{item.category}</td>
                    <td className="p-4">
                      <span className={`font-bold ${isLow ? 'text-red-600' : 'text-gray-800'}`}>
                        {item.quantity}
                      </span>
                    </td>
                    <td className="p-4 text-gray-500">{item.unit}</td>
                    <td className="p-4">
                      {isLow ? (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-red-600 bg-red-50 px-2 py-1 rounded-full border border-red-100">
                          <AlertCircle size={12} /> Reabastecer
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full border border-green-100">
                          <CheckCircle size={12} /> Normal
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-sm text-gray-500">
                        {item.expirationDate ? (
                            <span className={new Date(item.expirationDate) < new Date() ? 'text-red-500 font-bold' : ''}>
                                {item.expirationDate}
                            </span>
                        ) : '-'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Inventory;