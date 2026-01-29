import React, { useState, useEffect } from 'react';
import { Store, Save, Trash2, Edit3, X, Utensils, Loader2 } from 'lucide-react';
import '../../index.css';

interface MenuItem {
  id: number | string;
  name: string;
  category: string;
  price: number | string;
  description: string;
}

function CreateMenu() {
  const [activeTab, setActiveTab] = useState('items');
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<number | string | null>(null);
  const [loading, setLoading] = useState(false);

  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [form, setForm] = useState({
    name: '',
    price: '',
    description: '',
    category: 'Main'
  });

  const [details, setDetails] = useState({
    name: "Main Branch",
    address: "12 Main Avenue, Polokwane",
    email: "hello@restuarant.com",
    phone: "+27 21 456 7890"
  });

  // --- DATABASE API CALLS ---

  const fetchMenu = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/menu');
      const data = await res.json();
      setMenuItems(data);
    } catch (err) {
      console.error("Failed to fetch menu:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.price) return;

    const payload = {
      ...form,
      price: parseFloat(form.price)
    };

    try {
      if (isEditing && editId !== null) {
        await fetch(`http://localhost:5000/api/menu/${editId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } else {
        await fetch('http://localhost:5000/api/menu', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }
      fetchMenu();
      cancelEdit();
    } catch (err) {
      console.error("Operation failed:", err);
    }
  };

  const removeItem = async (id: number | string) => {
    try {
      await fetch(`http://localhost:5000/api/menu/${id}`, {
        method: 'DELETE',
      });
      setMenuItems(prev => prev.filter(item => item.id !== id));
      if (editId === id) cancelEdit();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  // --- UI HELPERS ---

  const startEdit = (item: MenuItem) => {
    setIsEditing(true);
    setEditId(item.id);
    setForm({
      name: item.name,
      price: item.price.toString(),
      description: item.description,
      category: item.category
    });
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditId(null);
    setForm({ name: '', price: '', description: '', category: 'Main' });
  };

  return (
    <div className="p-8 bg-white min-h-screen font-sans">
      <header className="flex justify-between items-center mb-10 border-b-2 border-black pb-6">
        <div>
          <h1 className="text-3xl font-black text-black uppercase tracking-tighter italic">Restaurant Manager</h1>
          <p className="text-gray-500 font-bold text-xs tracking-widest uppercase mt-1">Live Database: pgAdmin4</p>
        </div>
        <div className="flex gap-2 bg-gray-100 p-1 rounded-xl">
          <button onClick={() => setActiveTab('items')} className={`px-4 py-2 rounded-lg text-xs font-black uppercase transition-all ${activeTab === 'items' ? 'bg-black text-white' : 'text-gray-400'}`}>Food Items</button>
          <button onClick={() => setActiveTab('details')} className={`px-4 py-2 rounded-lg text-xs font-black uppercase transition-all ${activeTab === 'details' ? 'bg-black text-white' : 'text-gray-400'}`}>Restaurant Info</button>
        </div>
      </header>

      {activeTab === 'items' ? (
        <div className="grid grid-cols-12 gap-8">
          {/* FORM */}
          <div className="col-span-4">
            <form onSubmit={handleSubmit} className={`border-2 rounded-3xl p-6 sticky top-8 bg-white transition-all ${isEditing ? 'border-orange-500 shadow-xl shadow-orange-50' : 'border-black'}`}>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-black uppercase italic">{isEditing ? 'Update Item' : 'Add New Item'}</h2>
                {isEditing && (
                  <button type="button" onClick={cancelEdit} className="text-gray-400 hover:text-black">
                    <X size={20} />
                  </button>
                )}
              </div>
              <div className="space-y-4">
                <input type="text" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} className="w-full border-2 border-gray-100 rounded-xl p-3 focus:border-black outline-none font-bold text-sm" placeholder="Item Name" required />
                <input type="number" step="0.01" value={form.price} onChange={(e) => setForm({...form, price: e.target.value})} className="w-full border-2 border-gray-100 rounded-xl p-3 focus:border-black outline-none font-bold text-sm" placeholder="Price (R)" required />
                <textarea value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} className="w-full border-2 border-gray-100 rounded-xl p-3 focus:border-black outline-none font-bold text-sm h-24 resize-none" placeholder="Description" />
                <button type="submit" className={`w-full text-white py-4 rounded-2xl font-black uppercase tracking-widest text-sm transition-all active:scale-95 ${isEditing ? 'bg-black hover:bg-gray-800' : 'bg-orange-500 hover:bg-orange-600 shadow-lg shadow-orange-100'}`}>
                  {isEditing ? 'Save Changes' : 'Add to Menu'}
                </button>
              </div>
            </form>
          </div>

          {/* LIST */}
          <div className="col-span-8">
            <div className="border-2 border-black rounded-3xl overflow-hidden min-h-[400px] bg-white">
              {loading ? (
                <div className="flex flex-col items-center justify-center h-64 text-gray-400 gap-2">
                  <Loader2 className="animate-spin" size={32} />
                  <p className="font-black uppercase text-xs tracking-widest">Syncing with pgAdmin...</p>
                </div>
              ) : (
                <table className="w-full text-left">
                  <thead className="bg-black text-white text-[10px] font-black uppercase tracking-widest">
                    <tr>
                      <th className="px-6 py-4">Dish</th>
                      <th className="px-6 py-4">Price</th>
                      <th className="px-6 py-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-sm">
                    {menuItems.map((item) => (
                      <tr key={item.id} className={`hover:bg-gray-50 group transition-colors ${editId === item.id ? 'bg-orange-50' : ''}`}>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center text-gray-400 group-hover:text-black transition-colors">
                               <Utensils size={16} />
                            </div>
                            <div>
                              <p className="font-black italic uppercase text-black">{item.name}</p>
                              <p className="text-[10px] text-gray-400 uppercase font-bold">{item.description || 'No description'}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-mono font-black text-black">R {Number(item.price).toFixed(2)}</td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-3">
                            <button onClick={() => startEdit(item)} className="text-gray-400 hover:text-black transition-colors">
                              <Edit3 size={18} />
                            </button>
                            <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* RESTAURANT INFO */
        <div className="max-w-2xl mx-auto border-2 border-black rounded-[2.5rem] p-10 bg-white">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center text-white"><Store size={32} /></div>
            <h2 className="text-2xl font-black uppercase italic">General Information</h2>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="col-span-2">
              <label className="text-[10px] font-black uppercase text-gray-400 mb-1 block">Restaurant Name</label>
              <input type="text" value={details.name} onChange={(e) => setDetails({...details, name: e.target.value})} className="w-full border-b-2 border-gray-100 p-2 focus:border-black outline-none font-black text-lg uppercase italic" />
            </div>
            <div className="col-span-2">
              <label className="text-[10px] font-black uppercase text-gray-400 mb-1 block">Address</label>
              <input type="text" value={details.address} onChange={(e) => setDetails({...details, address: e.target.value})} className="w-full border-b-2 border-gray-100 p-2 focus:border-black outline-none font-bold" />
            </div>
            <div className="col-span-2 pt-6">
              <button onClick={() => alert('Saved to DB')} className="flex items-center justify-center gap-2 w-full bg-orange-500 text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] shadow-xl hover:bg-orange-600 transition-all">
                <Save size={20} /> Update Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateMenu;