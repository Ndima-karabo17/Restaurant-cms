import React, { useState, useEffect, useCallback } from 'react';
import MenuForm from './MenuForm';
import MenuTable from './MenuTable';
import { menuService } from './menuService';
import type { MenuItem, MenuFormState } from '../../types/menu';

export default function CreateMenu() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<number | string | null>(null);
  const [form, setForm] = useState<MenuFormState>({ 
    name: '', 
    price: '', 
    description: '', 
    category: 'Main' 
  });

  const loadItems = useCallback(async () => {
    setLoading(true);
    try {
      const data = await menuService.getAll();
      setItems(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadItems(); }, [loadItems]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditing && editId) {
        await menuService.update(editId, form);
      } else {
        await menuService.create(form);
      }
      setForm({ name: '', price: '', description: '', category: 'Main' });
      setIsEditing(false);
      setEditId(null);
      loadItems();
    } catch (err) {
      alert("Error saving menu item");
      console.log(err)
    }
  };

  const handleDelete = async (id: number | string) => {
    if (window.confirm("Delete this item?")) {
      await menuService.delete(id);
      loadItems();
    }
  };

  const handleEdit = (item: MenuItem) => {
    setIsEditing(true);
    setEditId(item.id);
    setForm({ 
      name: item.name, 
      price: item.price.toString(), 
      description: item.description, 
      category: item.category 
    });
  };

  return (
    <div className="p-8 bg-white min-h-screen">
      <header className="mb-10 border-b-2 border-black pb-6">
        <h1 className="text-3xl font-black text-black uppercase tracking-tighter italic">Menu Management</h1>
        <p className="text-gray-500 font-bold text-xs tracking-widest uppercase">Connected to pgAdmin4</p>
      </header>

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-4">
          <MenuForm 
            form={form} 
            setForm={setForm} 
            onSubmit={handleSubmit} 
            isEditing={isEditing} 
            onCancel={() => { setIsEditing(false); setEditId(null); setForm({ name: '', price: '', description: '', category: 'Main' }); }} 
          />
        </div>
        <div className="col-span-8">
          <MenuTable 
            items={items} 
            loading={loading} 
            onEdit={handleEdit} 
            onDelete={handleDelete} 
            editId={editId} 
          />
        </div>
      </div>
    </div>
  );
}
