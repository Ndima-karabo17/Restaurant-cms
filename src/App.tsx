import React, { useState } from 'react';
import Sidebar from './components/DashboardLayout/Sidebar';
import OrderList from './components/DashboardLayout/OrderList';
import OrderModal from './components/DashboardLayout/OrderModal';
import { Bell, Clock, CheckSquare, Plus } from 'lucide-react';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex min-h-screen font-sans bg-white">
      <Sidebar />

      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold text-brand-orange">Restaurant Dashboard</h1>
            <p className="text-gray-400 mt-1">Everything is looking bright today</p>
          </div>
          <div className="bg-orange-50 px-4 py-2 rounded-xl text-brand-orange font-bold border border-orange-100">
            Wednesday, 12 July 2023
          </div>
        </header>

        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-8 space-y-8">
            <div className="grid grid-cols-3 gap-6">
              {/* These cards were white, now they are Orange */}
              <div className="orange-card bg-brand-orange-dark">
                <div className="flex justify-between items-start">
                  <p className="text-xs font-bold uppercase opacity-80">New Orders</p>
                  <Bell size={18} className="icon-accent" />
                </div>
                <h2 className="text-4xl font-bold mt-2 text-white">16</h2>
              </div>

              <div className="orange-card">
                <div className="flex justify-between items-start">
                  <p className="text-xs font-bold uppercase opacity-80">Total Orders</p>
                  <CheckSquare size={18} className="icon-accent" />
                </div>
                <h2 className="text-4xl font-bold mt-2 text-white">128</h2>
              </div>

              <div className="orange-card">
                <div className="flex justify-between items-start">
                  <p className="text-xs font-bold uppercase opacity-80">Waiting List</p>
                  <Clock size={18} className="icon-accent" />
                </div>
                <h2 className="text-4xl font-bold mt-2 text-white">4</h2>
              </div>
            </div>

            {/* Main table area stays clean for readability, but uses orange text */}
            <div className="bg-orange-50 rounded-3xl p-6 border border-orange-100">
              <OrderList />
            </div>
          </div>

          <div className="col-span-4 space-y-6">
            {/* The primary button was orange, now it is White with Orange text */}
            <button 
              onClick={() => setIsModalOpen(true)} 
              className="btn-inverted w-full flex items-center justify-center gap-2 border border-orange-200"
            >
              <Plus size={20} /> CREATE NEW ORDER
            </button>

            <div className="orange-card">
              <h3 className="font-bold text-lg mb-6">Popular Dishes</h3>
              <div className="space-y-5">
                {[{name: 'Scrambled Eggs', count: 23}, {name: 'Chicken Tacos', count: 18}].map((dish, i) => (
                  <div key={i} className="flex items-center gap-4 border-b border-white/10 pb-3 last:border-0">
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center font-bold">
                      {i + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-sm text-white">{dish.name}</p>
                      <p className="text-xs text-white/60">{dish.count} Orders</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <OrderModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}