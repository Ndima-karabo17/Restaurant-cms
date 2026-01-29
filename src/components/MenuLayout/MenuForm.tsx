import React from 'react';
import { X, Save, Plus, ImageIcon } from 'lucide-react';
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
        <h2 className="text-xl font-black uppercase italic">{isEditing ? 'Update Product' : 'Add New Product'}</h2>
        {isEditing && (
          <button type="button" onClick={onCancel} className="text-gray-400 hover:text-black">
            <X size={20} />
          </button>
        )}
      </div>

      <div className="space-y-4">
        {/* Image Preview Window */}
        <div className="w-full h-32 border-2 border-dashed border-gray-100 rounded-2xl overflow-hidden flex items-center justify-center bg-gray-50">
          {form.image_url ? (
            <img src={form.image_url} alt="Preview" className="w-full h-full object-cover" onError={(e) => (e.currentTarget.src = 'https://placehold.co/400x300?text=Invalid+URL')} />
          ) : (
            <div className="text-gray-300 flex flex-col items-center gap-2">
              <ImageIcon size={24} />
              <span className="text-[10px] font-black uppercase tracking-widest">Image Preview</span>
            </div>
          )}
        </div>

        <div>
          <label className="text-[10px] font-black uppercase text-gray-400 mb-1 block">Product Name</label>
          <input 
            type="text" 
            value={form.name} 
            onChange={(e) => setForm(prev => ({...prev, name: e.target.value}))} 
            className="w-full border-2 border-gray-100 rounded-xl p-3 outline-none font-bold text-sm focus:border-black" 
            placeholder="e.g. Grilled Salmon" required 
          />
        </div>

        <div>
          <label className="text-[10px] font-black uppercase text-gray-400 mb-1 block">Image URL</label>
          <input 
            type="text" 
            value={form.image_url} 
            onChange={(e) => setForm(prev => ({...prev, image_url: e.target.value}))} 
            className="w-full border-2 border-gray-100 rounded-xl p-3 outline-none font-bold text-sm focus:border-black" 
            placeholder="https://images.com/dish.jpg" 
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
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
            <label className="text-[10px] font-black uppercase text-gray-400 mb-1 block">Category</label>
            <select 
              value={form.category}
              onChange={(e) => setForm(prev => ({...prev, category: e.target.value}))}
              className="w-full border-2 border-gray-100 rounded-xl p-3 outline-none font-bold text-sm focus:border-black bg-white"
            >
              <option value="Main">Main</option>
              <option value="Starters">Starters</option>
              <option value="Drinks">Drinks</option>
              <option value="Dessert">Dessert</option>
            </select>
          </div>
        </div>

        <div>
          <label className="text-[10px] font-black uppercase text-gray-400 mb-1 block">Description</label>
          <textarea 
            value={form.description} 
            onChange={(e) => setForm(prev => ({...prev, description: e.target.value}))} 
            className="w-full border-2 border-gray-100 rounded-xl p-3 outline-none font-bold text-sm h-20 resize-none focus:border-black" 
            placeholder="Product details..." 
          />
        </div>

        <button type="submit" className={`w-full text-white py-4 rounded-2xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-2 transition-all active:scale-95 ${isEditing ? 'bg-black hover:bg-gray-800' : 'bg-orange-500 hover:bg-orange-600 shadow-lg shadow-orange-100'}`}>
          {isEditing ? <><Save size={18} /> Update Product</> : <><Plus size={18} /> Add Product</>}
        </button>
      </div>
    </form>
  );
}
