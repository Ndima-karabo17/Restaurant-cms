import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/DashboardLayout/Sidebar';
import OrderList from './components/DashboardLayout/OrderList';
import OrderModal from './components/DashboardLayout/OrderModal';
import CreateMenu from './components/MenuLayout/CreateMenu';
import UserProfile from './components/UsersLayout/UserProfile';
import AdminSetting from './components/Settings/AdminProfileSetting';
import { Bell, Clock, CheckSquare, Plus } from 'lucide-react';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen font-sans bg-white">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}

function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stats, setStats] = useState({ totalOrders: 0, totalUsers: 0 });

  useEffect(() => {
    fetch('http://localhost:5000/api/dashboard/stats')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error('Stats fetch failed:', err));
  }, []);

  return (
    <div className="p-8">
      <header className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold text-orange-500">Restaurant Dashboard</h1>
          <p className="text-gray-400 mt-1">Everything is looking bright today</p>
        </div>
        <div className="bg-orange-50 px-4 py-2 rounded-xl text-orange-500 font-bold border border-orange-100">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
        </div>
      </header>

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-8 space-y-8">
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-orange-600 text-white shadow-xl shadow-orange-200 rounded-3xl p-6">
              <div className="flex justify-between items-start">
                <p className="text-xs font-bold uppercase opacity-80">New Orders</p>
                <Bell size={18} className="text-white opacity-80" />
              </div>
              <h2 className="text-4xl font-bold mt-2">{stats.totalOrders}</h2>
            </div>

            <div className="bg-orange-500 text-white shadow-xl shadow-orange-200 rounded-3xl p-6">
              <div className="flex justify-between items-start">
                <p className="text-xs font-bold uppercase opacity-80">Total Orders</p>
                <CheckSquare size={18} className="text-white opacity-80" />
              </div>
              <h2 className="text-4xl font-bold mt-2">{stats.totalOrders}</h2>
            </div>

            <div className="bg-orange-500 text-white shadow-xl shadow-orange-200 rounded-3xl p-6">
              <div className="flex justify-between items-start">
                <p className="text-xs font-bold uppercase opacity-80">Total Users</p>
                <Clock size={18} className="text-white opacity-80" />
              </div>
              <h2 className="text-4xl font-bold mt-2">{stats.totalUsers}</h2>
            </div>
          </div>

          <div className="bg-orange-50 rounded-3xl p-6 border border-orange-100">
            <OrderList />
          </div>
        </div>

        <div className="col-span-4 space-y-6">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-white text-orange-500 hover:bg-gray-100 font-bold py-4 px-6 rounded-2xl shadow-md w-full flex items-center justify-center gap-2 border border-orange-200 transition-all active:scale-95"
          >
            <Plus size={20} /> CREATE NEW ORDER
          </button>

          <div className="bg-orange-500 text-white shadow-xl shadow-orange-200 rounded-3xl p-6">
            <h3 className="font-bold text-lg mb-6">Popular Dishes</h3>
            <div className="space-y-5">
              {[{ name: 'Scrambled Eggs', count: 23 }, { name: 'Chicken Tacos', count: 18 }].map((dish, i) => (
                <div key={i} className="flex items-center gap-4 border-b border-white/10 pb-3 last:border-0">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center font-bold">
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-sm">{dish.name}</p>
                    <p className="text-xs text-white/60">{dish.count} Orders</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <OrderModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/menu" element={<CreateMenu />} />
          <Route path="/users" element={<UserProfile />} />
          <Route path="/settings" element={<AdminSetting />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}