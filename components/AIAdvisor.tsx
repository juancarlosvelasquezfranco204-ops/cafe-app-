import React, { useState, useRef, useEffect } from 'react';
import { geminiService } from '../services/geminiService';
import { Lot, InventoryItem, Worker, FinancialRecord, Message } from '../types';
import { Send, Bot, User, Loader2 } from 'lucide-react';

interface AIAdvisorProps {
  lots: Lot[];
  inventory: InventoryItem[];
  workers: Worker[];
  financials: FinancialRecord[];
}

const AIAdvisor: React.FC<AIAdvisorProps> = ({ lots, inventory, workers, financials }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Hola, soy tu Asistente Agrónomo Virtual. Puedo analizar la rentabilidad, sugerir planes de fertilización o revisar el estado de tu inventario. ¿En qué puedo ayudarte hoy?', timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = { role: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const responseText = await geminiService.analyzeFarmStatus(lots, inventory, workers, financials, userMsg.text);

    const aiMsg: Message = { role: 'model', text: responseText, timestamp: new Date() };
    setMessages(prev => [...prev, aiMsg]);
    setLoading(false);
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-4 border-b border-gray-100 bg-coffee-50 flex items-center gap-3">
        <div className="w-10 h-10 bg-coffee-600 rounded-full flex items-center justify-center text-white">
            <Bot size={20} />
        </div>
        <div>
            <h3 className="font-bold text-gray-800">Asistente IA (Gemini)</h3>
            <p className="text-xs text-gray-500">Consultor experto 24/7</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-4 rounded-2xl shadow-sm ${
              msg.role === 'user' 
                ? 'bg-coffee-600 text-white rounded-tr-none' 
                : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
            }`}>
              <div className="flex items-start gap-2">
                 {msg.role === 'model' && <Bot size={16} className="mt-1 flex-shrink-0 text-coffee-600" />}
                 {msg.role === 'user' && <User size={16} className="mt-1 flex-shrink-0 text-white/80" />}
                 <div className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</div>
              </div>
              <div className={`text-[10px] mt-2 text-right ${msg.role === 'user' ? 'text-white/70' : 'text-gray-400'}`}>
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
        {loading && (
            <div className="flex justify-start">
                <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 flex items-center gap-2 text-gray-500 text-sm">
                    <Loader2 size={16} className="animate-spin" />
                    Analizando datos de la finca...
                </div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white border-t border-gray-100">
        <div className="flex items-center gap-2">
          <input
            type="text"
            className="flex-1 border border-gray-200 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-coffee-500 focus:border-transparent text-sm"
            placeholder="Ej: ¿Cuál es mi lote más rentable? o Sugiere un plan de abono..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            disabled={loading}
          />
          <button 
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="bg-coffee-600 hover:bg-coffee-700 disabled:bg-gray-300 text-white p-3 rounded-full transition-colors shadow-sm"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIAdvisor;