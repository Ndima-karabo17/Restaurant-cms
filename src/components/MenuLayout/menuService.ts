import type { MenuItem, MenuFormState } from '../../types/menu';

const API_URL = 'http://localhost:5000/api/menu';

export const menuService = {
  async getAll(): Promise<MenuItem[]> {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error('Failed to fetch');
    return res.json();
  },

  async create(item: MenuFormState): Promise<MenuItem> {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...item,
        price: parseFloat(item.price) || 0
      }),
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || 'Failed to create');
    }
    return res.json();
  },

  async update(id: number | string, item: MenuFormState): Promise<void> {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...item,
        price: parseFloat(item.price) || 0
      }),
    });
    if (!res.ok) throw new Error('Update failed');
  },

  async delete(id: number | string): Promise<void> {
    const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Delete failed');
  }
};
