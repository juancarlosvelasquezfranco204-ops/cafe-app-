import React from 'react';
import { Worker } from '../types';
import { User, Award, CheckCircle } from 'lucide-react';

interface LaborProps {
  workers: Worker[];
}

const Labor: React.FC<LaborProps> = ({ workers }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Gestión de Talento Humano</h2>
        <div className="flex gap-2">
            <button className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            Ver Reporte Nómina
            </button>
            <button className="bg-coffee-600 hover:bg-coffee-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            + Nuevo Trabajador
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {workers.map((worker) => (
          <div key={worker.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col gap-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 border border-gray-200">
                  <User size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">{worker.name}</h3>
                  <span className="text-xs px-2 py-0.5 bg-coffee-50 text-coffee-700 rounded-full border border-coffee-100">
                    {worker.role}
                  </span>
                </div>
              </div>
              <div className={`w-3 h-3 rounded-full ${worker.active ? 'bg-green-500' : 'bg-gray-300'}`} title="Activo" />
            </div>

            <div className="space-y-3 pt-2">
                <div>
                    <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-500">Eficiencia</span>
                        <span className="font-bold text-gray-800">{worker.efficiency}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                        <div 
                            className="bg-coffee-500 h-2 rounded-full transition-all duration-500" 
                            style={{ width: `${worker.efficiency}%` }}
                        />
                    </div>
                </div>

                <div className="flex justify-between items-center text-sm pt-2 border-t border-gray-50">
                     <span className="text-gray-500 flex items-center gap-1">
                        <CheckCircle size={14} /> Tareas completadas
                     </span>
                     <span className="font-medium">{worker.tasksCompleted}</span>
                </div>
            </div>
            
            <button className="w-full mt-auto py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 hover:text-coffee-600 transition-colors">
                Ver Perfil
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Labor;