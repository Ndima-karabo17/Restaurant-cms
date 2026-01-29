import React from 'react';
import { Utensils, Edit3, Trash2, Loader2 } from 'lucide-react';
import type { MenuItem } from '../../types/menu';

interface MenuTableProps {
  items: MenuItem[];
  loading: boolean;
  onEdit: (item: MenuItem) => void;
  onDelete: (id: number | string) => void;
  editId: number | string | null;
}

export default function MenuTable({ items, loading, onEdit, onDelete, editId }: MenuTableProps) {
  if (loading) return (
    <div className="flex flex-col items-center justify-center h-64 text-gray-400 gap-2">
      <Loader2 className="animate-spin" size={32} />
      <p className="font-black uppercase text-xs tracking-widest italic">Syncing with Database...</p>
    </div>
  );

  return (
    <div className="border-2 border-black rounded-3xl overflow-hidden bg-white shadow-sm">
      <table className="w-full text-left">
        <thead className="bg-black text-white text-[10px] font-black uppercase tracking-widest">
          <tr>
            <th className="px-6 py-4">Dish</th>
            <th className="px-6 py-4">Price</th>
            <th className="px-6 py-4 text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 text-sm">
          {items.length === 0 ? (
            <tr><td colSpan={3} className="px-6 py-10 text-center text-gray-400 font-bold uppercase text-xs">No items found in menu</td></tr>
          ) : (
            items.map((item) => (
              <tr key={item.id} className={`hover:bg-gray-50 transition-colors ${editId === item.id ? 'bg-orange-50' : ''}`}>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center text-gray-400"><Utensils size={16} /></div>
                    <div>
                      <p className="font-black italic uppercase text-black">{item.name}</p>
                      <p className="text-[10px] text-gray-400 uppercase font-bold">{item.description || 'No description'}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 font-mono font-black text-black">R {Number(item.price).toFixed(2)}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-3">
                    <button onClick={() => onEdit(item)} className="text-gray-400 hover:text-black transition-colors"><Edit3 size={18} /></button>
                    <button onClick={() => onDelete(item.id)} className="text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
