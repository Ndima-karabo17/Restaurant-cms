import React, { useState } from 'react';
import { Settings, Lock, Bell, Eye, EyeOff, Save, ShieldAlert } from 'lucide-react';
import '../../index.css';

function AdminSetting() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="p-8 bg-white min-h-screen">
      <header className="flex justify-between items-center mb-10 border-b-2 border-black pb-6">
        <div>
          <h1 className="text-3xl font-black text-black uppercase tracking-tighter italic">System Settings</h1>
          <p className="text-gray-500 font-bold text-xs tracking-widest uppercase mt-1">Configure Admin Preferences & Security</p>
        </div>
        <div className="bg-black text-white p-3 rounded-xl">
          <Settings size={24} />
        </div>
      </header>

      <div className="max-w-4xl grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-7 space-y-6">
          <section className="border-2 border-black rounded-[2rem] p-8">
            <div className="flex items-center gap-3 mb-6">
              <Lock size={20} className="text-black" />
              <h2 className="text-lg font-black uppercase italic">Security & Password</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-black uppercase text-gray-400 mb-1 block">Current Password</label>
                <input type="password" title="password" className="w-full border-2 border-gray-100 rounded-xl p-3 focus:border-black outline-none font-bold text-sm" />
              </div>
              
              <div className="relative">
                <label className="text-[10px] font-black uppercase text-gray-400 mb-1 block">New Password</label>
                <input 
                  type={showPassword ? "text" : "password"} 
                  className="w-full border-2 border-gray-100 rounded-xl p-3 focus:border-black outline-none font-bold text-sm" 
                />
                <button 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-8 text-gray-400 hover:text-black"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          </section>

          <section className="border-2 border-black rounded-[2rem] p-8">
            <div className="flex items-center gap-3 mb-6">
              <Bell size={20} className="text-black" />
              <h2 className="text-lg font-black uppercase italic">Notifications</h2>
            </div>
            
            <div className="space-y-4">
              {[
                { label: "New Order Alerts", desc: "Receive sound when a new order arrives" },
                { label: "Stock Warnings", desc: "Notify when ingredients are low" }
              ].map((item, idx) => (
                <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <div>
                    <p className="text-sm font-black uppercase tracking-tight">{item.label}</p>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{item.desc}</p>
                  </div>
                  <div className="w-12 h-6 bg-black rounded-full relative cursor-pointer p-1">
                    <div className="w-4 h-4 bg-white rounded-full ml-auto" />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="md:col-span-5 space-y-6">
          <div className="bg-red-500 rounded-[2rem] p-8 text-white shadow-xl shadow-orange-100">
            <ShieldAlert size={40} className="mb-4 text-white" />
            <h3 className="text-xl font-black uppercase italic leading-tight mb-2">Danger Zone</h3>
            <p className="text-xs font-bold text-orange-100 uppercase tracking-widest mb-6 leading-relaxed">
              Actions here are permanent and affect the entire restaurant system.
            </p>
            <button className="w-full bg-white text-orange-600 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-orange-50 transition-all">
              Reset System Data
            </button>
          </div>

          <button className="flex items-center justify-center gap-3 w-full bg-orange-500 text-white py-5 rounded-[2rem] font-black uppercase tracking-[0.2em] shadow-xl hover:bg-gray-800 transition-all active:scale-95">
            <Save size={20} /> Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminSetting;