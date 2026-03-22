import  { useState } from 'react';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormState {
  name: string;
  description: string;
  price: string;
  category: string;
  image_url: string;
}

const EMPTY_FORM: FormState = {
  name: '',
  description: '',
  price: '',
  category: 'Main',
  image_url: '',
};

export default function OrderModal({ isOpen, onClose }: OrderModalProps) {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleClose = () => {
    setForm(EMPTY_FORM);
    setSuccess(false);
    setError('');
    onClose();
  };

  const handleSubmit = async () => {
    if (!form.name || !form.price) {
      setError('Name and price are required.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await fetch('https://restaurant-app-reactnative-backend.onrender.com/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          price: parseFloat(form.price) || 0,
        }),
      });
      if (!res.ok) throw new Error('Failed to save');
      setSuccess(true);
      setForm(EMPTY_FORM);
      setTimeout(() => {
        setSuccess(false);
        handleClose();
      }, 1500);
    } catch (err) {
      setError('Failed to save product. Check your connection.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-[2.5rem] p-8 w-full max-w-lg shadow-2xl relative my-auto">

        <button
          onClick={handleClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-orange-500 transition-colors text-2xl font-bold"
        >✕</button>

        <h2 className="text-3xl font-black text-gray-800 mb-2">Create New Menu Item</h2>
        <p className="text-gray-400 mb-6 text-sm">Fill in the item details below to add to the menu.</p>

        {/* Success message */}
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-600 text-sm px-4 py-3 rounded-xl mb-4 font-bold text-center">
            ✅ Product added successfully!
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-500 text-sm px-4 py-3 rounded-xl mb-4 font-bold">
            {error}
          </div>
        )}

        <div className="space-y-5">

          {/* Image Preview */}
          <div>
            <label className="text-xs font-black text-black uppercase tracking-wider block mb-2">Item Image</label>
            <div className="w-full h-32 bg-orange-50/50 border-2 border-dashed border-orange-200 rounded-2xl overflow-hidden flex items-center justify-center mb-2">
              {form.image_url ? (
                <img
                  src={form.image_url}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => (e.currentTarget.src = 'https://placehold.co/400x300?text=Invalid+URL')}
                />
              ) : (
                <span className="text-xs text-orange-300 font-bold">Image Preview</span>
              )}
            </div>
            <input
              type="text"
              value={form.image_url}
              onChange={(e) => setForm(prev => ({ ...prev, image_url: e.target.value }))}
              placeholder="https://images.com/dish.jpg"
              className="w-full bg-orange-50/50 border border-orange-100 rounded-2xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all"
            />
          </div>

          {/* Item Name */}
          <div>
            <label className="text-xs font-black text-black uppercase tracking-wider block mb-2">Item Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Smoky Burger"
              className="w-full bg-orange-50/50 border border-orange-100 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-xs font-black text-black uppercase tracking-wider block mb-2">Description & Ingredients</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
              placeholder="e.g. A juicy flame-grilled patty topped with melted cheese..."
              className="w-full bg-orange-50/50 border border-orange-100 rounded-2xl p-4 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Price */}
            <div>
              <label className="text-xs font-black text-black uppercase tracking-wider block mb-2">Price (R)</label>
              <input
                type="number"
                value={form.price}
                onChange={(e) => setForm(prev => ({ ...prev, price: e.target.value }))}
                placeholder="120.00"
                className="w-full bg-orange-50/50 border border-orange-100 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all"
              />
            </div>

            {/* Category */}
            <div>
              <label className="text-xs font-black text-black uppercase tracking-wider block mb-2">Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm(prev => ({ ...prev, category: e.target.value }))}
                className="w-full bg-orange-50/50 border border-orange-100 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all"
              >
                <option value="Main">Main</option>
                <option value="Starters">Starters</option>
                <option value="Drinks">Drinks</option>
                <option value="Dessert">Dessert</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-orange-500 border-2 border-orange-500 text-white py-4 rounded-3xl font-black text-xl mt-6 shadow-md hover:bg-orange-400 active:scale-95 transition-all uppercase tracking-widest disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Add to Menu ✓'}
          </button>
        </div>
      </div>
    </div>
  );
}