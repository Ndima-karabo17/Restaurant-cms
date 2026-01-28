import React from 'react';
import '../../index.css';
const orders = [
  { id: 'A4', name: 'Ariel Hikmat', items: 5, status: 'Pending', total: 'R450.00' },
  { id: 'B2', name: 'Denis Freeman', items: 4, status: 'Completed', total: 'R320.00' },
  { id: 'TA', name: 'Morgan Cox', items: 6, status: 'Waiting', total: 'R510.00' },
  { id: 'A9', name: 'Maja Becker', items: 8, status: 'Completed', total: 'R720.00' },
];

export default function OrderList() {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-50">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-800">Order List</h3>
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search an Order" 
            className="bg-gray-100 rounded-xl py-2 px-4 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-bite-yellow"
          />
          <button className="absolute left-3 top-2.5 opacity-40">🔍</button>
        </div>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-2xl transition">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold ${
                order.id.startsWith('A') ? 'bg-orange-300 text-white' : 'bg-orange-300 text-white'
              }`}>
                {order.id}
              </div>
              <div>
                <p className="font-bold text-gray-800">{order.name}</p>
                <p className="text-sm text-gray-400">{order.items} Items</p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="text-right">
                <p className={`text-xs font-bold px-3 py-1 rounded-full ${
                  order.status === 'Completed' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                }`}>
                  {order.status}
                </p>
              </div>
              <button className="bg-orange-400 text-white px-4 py-2 rounded-xl font-bold text-sm shadow-sm hover:scale-105 transition">
                Pay Now →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}