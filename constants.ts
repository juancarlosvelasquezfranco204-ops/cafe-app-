import { Lot, LotStatus, InventoryItem, Worker, FinancialRecord } from './types';

export const MOCK_LOTS: Lot[] = [
  {
    id: 'L1',
    name: 'Lote El Roble',
    variety: 'Castillo',
    hectares: 2.5,
    plants: 12000,
    status: LotStatus.HEALTHY,
    lastHarvestDate: '2023-11-15',
    coordinates: { lat: 4.5, lng: -75.6 },
  },
  {
    id: 'L2',
    name: 'La Ladera',
    variety: 'Caturra',
    hectares: 1.8,
    plants: 9000,
    status: LotStatus.NEEDS_ATTENTION,
    lastHarvestDate: '2023-10-20',
    coordinates: { lat: 4.52, lng: -75.61 },
  },
  {
    id: 'L3',
    name: 'San José',
    variety: 'Geisha',
    hectares: 0.5,
    plants: 2000,
    status: LotStatus.HEALTHY,
    lastHarvestDate: '2023-12-01',
    coordinates: { lat: 4.51, lng: -75.59 },
  }
];

export const MOCK_INVENTORY: InventoryItem[] = [
  { id: 'I1', name: 'Fertilizante 17-6-18', category: 'Fertilizante', quantity: 45, unit: 'bultos', minThreshold: 50 },
  { id: 'I2', name: 'Glifosato', category: 'Pesticida', quantity: 12, unit: 'litros', minThreshold: 5 },
  { id: 'I3', name: 'Machetes', category: 'Herramienta', quantity: 20, unit: 'unidades', minThreshold: 10 },
  { id: 'I4', name: 'Fungicida Broca', category: 'Pesticida', quantity: 2, unit: 'litros', minThreshold: 4, expirationDate: '2024-02-15' },
];

export const MOCK_WORKERS: Worker[] = [
  { id: 'W1', name: 'Juan Pérez', role: 'Administrador', efficiency: 95, active: true, tasksCompleted: 120 },
  { id: 'W2', name: 'María Gomez', role: 'Recolector', efficiency: 88, active: true, tasksCompleted: 450 },
  { id: 'W3', name: 'Carlos Ruíz', role: 'Recolector', efficiency: 72, active: true, tasksCompleted: 310 },
  { id: 'W4', name: 'Ana Tovar', role: 'Agrónomo', efficiency: 98, active: true, tasksCompleted: 45 },
];

export const MOCK_FINANCIALS: FinancialRecord[] = [
  { month: 'Ene', income: 15000, expenses: 8000, profit: 7000 },
  { month: 'Feb', income: 12000, expenses: 7500, profit: 4500 },
  { month: 'Mar', income: 18000, expenses: 9000, profit: 9000 },
  { month: 'Abr', income: 11000, expenses: 8500, profit: 2500 },
  { month: 'May', income: 22000, expenses: 10000, profit: 12000 },
  { month: 'Jun', income: 20000, expenses: 9500, profit: 10500 },
];