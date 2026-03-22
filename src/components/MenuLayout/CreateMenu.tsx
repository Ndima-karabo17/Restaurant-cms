import React, { useState, useEffect, useCallback } from 'react';
import MenuForm from './MenuForm';
import MenuTable from './MenuTabs'; // File is named MenuTabs.tsx but exports MenuTable
import { menuService } from './menuService';
import type { MenuItem, MenuFormState } from '../../types/menu';

const EMPTY_FORM: MenuFormState = {
  name: '',
  price: '',
  description: '',
  category: 'Main',
  image_url: ''
};

export default function CreateMenu() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<number | string | null>(null);
  const [form, setForm] = useState<MenuFormState>(EMPTY_FORM);

  const loadItems = useCallback(async () => {
    setLoading(true);
    try {
      const data = await menuService.getAll();
      setItems(data);
    } catch (err) {
      console.error("Failed to load products:", err);
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
      setForm(EMPTY_FORM);
      setIsEditing(false);
      setEditId(null);
      loadItems();
    } catch (err) {
      alert("Error saving product. Check console for details.");
      console.error(err);
    }
  };

  const handleDelete = async (id: number | string) => {
    if (window.confirm("Delete this product?")) {
      try {
        await menuService.delete(id);
        loadItems();
      } catch (err) {
        console.error("Delete failed:", err);
      }
    }
  };

  const handleEdit = (item: MenuItem) => {
    setIsEditing(true);
    setEditId(item.id);
    setForm({
      name: item.name,
      price: item.price.toString(),
      description: item.description,
      category: item.category,
      image_url: item.image_url || ''
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditId(null);
    setForm(EMPTY_FORM);
  };

  return (
    <div className="p-8 bg-white min-h-screen">
      <header className="mb-10 border-b-2 border-black pb-6">
        <h1 className="text-3xl font-black text-black uppercase tracking-tighter italic">Product Management</h1>
        <p className="text-gray-500 font-bold text-xs tracking-widest uppercase italic">Database: RestaurantApp (Products Table)</p>
      </header>

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-4">
          <MenuForm
            form={form}
            setForm={setForm}
            onSubmit={handleSubmit}
            isEditing={isEditing}
            onCancel={handleCancel}
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