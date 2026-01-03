import { GoogleGenAI } from "@google/genai";
import { Lot, InventoryItem, Worker, FinancialRecord } from '../types';

export class GeminiService {
  private ai: GoogleGenAI;
  private modelId: string = "gemini-3-flash-preview";

  constructor() {
    // Assuming API Key is available in process.env.API_KEY
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  async analyzeFarmStatus(
    lots: Lot[],
    inventory: InventoryItem[],
    workers: Worker[],
    financials: FinancialRecord[],
    userQuery: string
  ): Promise<string> {
    const context = `
      Actúa como un Agrónomo Experto y Consultor de Negocios de Café.
      Aquí están los datos actuales de la finca "El Cafetal":

      LOTES:
      ${JSON.stringify(lots)}

      INVENTARIO:
      ${JSON.stringify(inventory)}

      PERSONAL:
      ${JSON.stringify(workers)}

      FINANZAS (Últimos 6 meses):
      ${JSON.stringify(financials)}

      Responde a la siguiente consulta del usuario basándote estrictamente en estos datos.
      Sé conciso, profesional y da recomendaciones accionables.
      Si hay inventario bajo o lotes críticos, menciónalos.
      
      Consulta del usuario: "${userQuery}"
    `;

    try {
      const response = await this.ai.models.generateContent({
        model: this.modelId,
        contents: context,
        config: {
          systemInstruction: "Eres un asistente experto en gestión de fincas cafeteras.",
        }
      });
      return response.text || "No se pudo generar una respuesta.";
    } catch (error) {
      console.error("Error calling Gemini:", error);
      return "Lo siento, hubo un error al consultar con el asistente inteligente. Por favor verifica tu conexión o intenta más tarde.";
    }
  }
}

export const geminiService = new GeminiService();