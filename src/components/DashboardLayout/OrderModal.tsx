import React from 'react';
import '../../index.css';

export default function OrderModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      {/* Container - Inverted: Use brand-orange for accents or borders */}
      <div className="bg-white rounded-[2.5rem] p-8 w-full max-w-lg shadow-2xl relative ">
        
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-brand-orange transition-colors text-2xl font-bold">✕</button>
        
        <h2 className="text-3xl font-black text-gray-800 mb-2">Create New Menu</h2>
        <p className="text-gray-400 mb-6 text-sm">Fill in the item details below to add to the menu.</p>

        <div className="space-y-5">
         
<div>
              <label className="text-xs font-black text-black uppercase tracking-wider block mb-2">Item Name</label>
              <input type="number" placeholder="Smoky Burger" className="w-full bg-orange-50/50 border border-orange-100 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-brand-orange/20 transition-all" />
            </div>
          {/* Item Description / Ingredients */}
          <div>
            <label className="text-xs font-black text-black uppercase tracking-wider block mb-2">Description & Ingredients</label>
            <textarea 
              placeholder="e.g. A juicy flame-grilled patty topped with melted cheese, crispy bacon, and caramelized onions.
Finished with rich smoky BBQ sauce on a toasted bun." 
              className="w-full bg-orange-50/50 border border-orange-100 rounded-2xl p-4 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-brand-orange/20 transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Price */}
            <div>
              <label className="text-xs font-black text-black uppercase tracking-wider block mb-2">Price (R)</label>
              <input type="number" placeholder="120.00" className="w-full bg-orange-50/50 border border-orange-100 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-brand-orange/20 transition-all" />
            </div>

            {/* Image Placeholder / Upload */}
            <div>
              <label className="text-xs font-black text-black uppercase tracking-wider block mb-2">Item Image</label>
              <div className="w-full bg-orange-50/50 border-2 border-dashed border-orange-200 rounded-2xl p-3 text-center cursor-pointer hover:bg-orange-100 transition-colors">
                 <span className="text-xs text-orange-300 font-bold">+ Upload Image</span>
              </div>
            </div>
          </div>

          {/* Action Button - Inverted: Was Orange, now it's White with Orange Border/Text */}
          <button className="w-full bg-brand-orange border-2 border-brand-orange text-white py-4 rounded-3xl font-black text-xl mt-6 shadow-md hover:bg-orange-400 active:scale-95 transition-all uppercase tracking-widest">
            Confirm Order
          </button>
        </div>
      </div>
    </div>
  );
}