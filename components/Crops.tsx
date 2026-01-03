import React from 'react';
import { Lot, LotStatus } from '../types';
import { MapPin, AlertTriangle, Sprout } from 'lucide-react';

interface CropsProps {
  lots: Lot[];
}

const Crops: React.FC<CropsProps> = ({ lots }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Gestión de Lotes</h2>
        <button className="bg-coffee-600 hover:bg-coffee-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          + Nuevo Lote
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lot Cards */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {lots.map((lot) => (
            <div key={lot.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className={`absolute top-0 right-0 w-2 h-full ${
                  lot.status === LotStatus.HEALTHY ? 'bg-green-500' :
                  lot.status === LotStatus.NEEDS_ATTENTION ? 'bg-yellow-400' : 'bg-red-500'
              }`} />
              
              <div className="flex justify-between items-start mb-4">
                <div>
                   <h3 className="font-bold text-lg text-gray-800">{lot.name}</h3>
                   <p className="text-sm text-gray-500">{lot.variety}</p>
                </div>
                <div className="bg-gray-100 p-2 rounded-full text-gray-600">
                    <Sprout size={20} />
                </div>
              </div>

              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <div className="flex justify-between">
                    <span>Hectáreas:</span>
                    <span className="font-medium">{lot.hectares} ha</span>
                </div>
                <div className="flex justify-between">
                    <span>Plantas:</span>
                    <span className="font-medium">{lot.plants.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                    <span>Última Cosecha:</span>
                    <span className="font-medium">{lot.lastHarvestDate}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                 <span className={`text-xs font-bold px-2 py-1 rounded ${
                     lot.status === LotStatus.HEALTHY ? 'bg-green-100 text-green-700' :
                     lot.status === LotStatus.NEEDS_ATTENTION ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                 }`}>
                     {lot.status}
                 </span>
                 <button className="text-coffee-600 text-sm font-medium hover:underline">Ver Detalles</button>
              </div>
            </div>
          ))}
        </div>

        {/* Mock Map Visualization */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 h-full min-h-[400px] flex flex-col">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <MapPin size={18} />
                Mapa Georreferenciado
            </h3>
            <div className="flex-1 bg-gray-100 rounded-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://picsum.photos/600/800?grayscale')] bg-cover opacity-30"></div>
                {/* Simulated Pins */}
                {lots.map((lot, idx) => (
                    <div 
                        key={lot.id} 
                        className={`absolute w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-lg cursor-pointer transform hover:scale-110 transition-transform ${
                            lot.status === LotStatus.HEALTHY ? 'bg-green-500' :
                            lot.status === LotStatus.NEEDS_ATTENTION ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ top: `${20 + (idx * 25)}%`, left: `${30 + (idx * 15)}%` }}
                        title={lot.name}
                    >
                        {lot.id}
                    </div>
                ))}
                
                <div className="absolute bottom-4 left-4 bg-white/90 p-2 rounded text-xs shadow backdrop-blur-sm">
                    <div className="flex items-center gap-2 mb-1"><div className="w-2 h-2 rounded-full bg-green-500"></div> Saludable</div>
                    <div className="flex items-center gap-2 mb-1"><div className="w-2 h-2 rounded-full bg-yellow-500"></div> Atención</div>
                    <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-red-500"></div> Crítico</div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Crops;