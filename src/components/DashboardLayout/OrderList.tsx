import  { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

interface Order {
  id: number;
  customer_name: string;
  items: string;
  status: string;
  total_amount: string;
  created_at: string;
}

export default function OrderList() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch('https://restaurant-app-reactnative-backend.onrender.com/api/orders');
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error('Failed to fetch orders:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const filtered = orders.filter(o =>
    (o.customer_name || '').toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return (
    <div className="flex items-center justify-center py-20">
      <Loader2 className="animate-spin text-orange-500" size={32} />
    </div>
  );

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-50">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-800">Order List</h3>
        <div className="relative">
          <input
            type="text"
            placeholder="Search an Order"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-gray-100 rounded-xl py-2 px-4 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
          />
          <button className="absolute left-3 top-2.5 opacity-40">🔍</button>
        </div>
      </div>

      <div className="space-y-4">
        {filtered.length === 0 ? (
          <p className="text-center text-gray-400 py-10 font-bold">No orders found</p>
        ) : (
          filtered.map((order) => (
            <div key={order.id} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-2xl transition">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center font-bold bg-orange-300 text-white">
                  #{order.id}
                </div>
                <div>
                  <p className="font-bold text-gray-800">{order.customer_name || 'Guest'}</p>
                  <p className="text-sm text-gray-400 truncate max-w-[200px]">{order.items || 'No items'}</p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <p className="font-bold text-gray-700">R{parseFloat(order.total_amount).toFixed(2)}</p>
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                  order.status === 'completed' ? 'bg-green-100 text-green-600' :
                  order.status === 'pending' ? 'bg-yellow-100 text-yellow-600' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  {order.status}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}