import React from 'react';
import { X, Save, Plus } from 'lucide-react';
import type { MenuFormState } from '../../types/menu';

interface MenuFormProps {
  form: MenuFormState;
  setForm: React.Dispatch<React.SetStateAction<MenuFormState>>;
  onSubmit: (e: React.FormEvent) => void;
  isEditing: boolean;
  onCancel: () => void;
}

export default function MenuForm({ form, setForm, onSubmit, isEditing, onCancel }: MenuFormProps) {
  return (
    <form onSubmit={onSubmit} className={`border-2 rounded-3xl p-6 sticky top-8 bg-white transition-all ${isEditing ? 'border-orange-500 shadow-xl' : 'border-black'}`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-black uppercase italic">{isEditing ? 'Update Item' : 'Add New Item'}</h2>
        {isEditing && (
          <button type="button" onClick={onCancel} className="text-gray-400 hover:text-black">
            <X size={20} />
          </button>
        )}
      </div>
      <div className="space-y-4">
        <div>
          <label className="text-[10px] font-black uppercase text-gray-400 mb-1 block">Item Name</label>
          <input 
            type="text" 
            value={form.name} 
            onChange={(e) => setForm(prev => ({...prev, name: e.target.value}))} 
            className="w-full border-2 border-gray-100 rounded-xl p-3 outline-none font-bold text-sm focus:border-black" 
            placeholder="e.g. Wagyu Burger" required 
          />
        </div>
        <div>
          <label className="text-[10px] font-black uppercase text-gray-400 mb-1 block">Price (R)</label>
          <input 
            type="number" step="0.01" 
            value={form.price} 
            onChange={(e) => setForm(prev => ({...prev, price: e.target.value}))} 
            className="w-full border-2 border-gray-100 rounded-xl p-3 outline-none font-bold text-sm focus:border-black" 
            placeholder="0.00" required 
          />
        </div>
        <div>
          <label className="text-[10px] font-black uppercase text-gray-400 mb-1 block">Description</label>
          <textarea 
            value={form.description} 
            onChange={(e) => setForm(prev => ({...prev, description: e.target.value}))} 
            className="w-full border-2 border-gray-100 rounded-xl p-3 outline-none font-bold text-sm h-24 resize-none focus:border-black" 
            placeholder="Ingredients..." 
          />
        </div>
        <button type="submit" className={`w-full text-white py-4 rounded-2xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-2 transition-all active:scale-95 ${isEditing ? 'bg-black hover:bg-gray-800' : 'bg-orange-500 hover:bg-orange-600 shadow-lg shadow-orange-100'}`}>
          {isEditing ? <><Save size={18} /> Save Changes</> : <><Plus size={18} /> Add to Menu</>}
        </button>
      </div>
    </form>
  );
}
