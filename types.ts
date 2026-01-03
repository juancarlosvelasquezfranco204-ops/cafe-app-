export enum StatusColor {
  GREEN = 'green',
  YELLOW = 'yellow',
  RED = 'red'
}

export enum LotStatus {
  HEALTHY = 'Saludable',
  NEEDS_ATTENTION = 'Requiere Atención',
  CRITICAL = 'Crítico'
}

export interface Lot {
  id: string;
  name: string;
  variety: string;
  hectares: number;
  plants: number;
  status: LotStatus;
  lastHarvestDate: string;
  coordinates: { lat: number; lng: number };
}

export interface InventoryItem {
  id: string;
  name: string;
  category: 'Fertilizante' | 'Herramienta' | 'Pesticida' | 'Otro';
  quantity: number;
  unit: string;
  minThreshold: number;
  expirationDate?: string;
}

export interface Worker {
  id: string;
  name: string;
  role: 'Recolector' | 'Administrador' | 'Agrónomo';
  efficiency: number; // 0-100 score
  active: boolean;
  tasksCompleted: number;
}

export interface FinancialRecord {
  month: string;
  income: number;
  expenses: number;
  profit: number;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}