import React, { useState, useEffect } from 'react';
import { ShieldCheck, CreditCard, MapPin, Phone, Mail, Loader2, User as UserIcon } from 'lucide-react'; // Added UserIcon
import '../../index.css';
import type { User } from '../../types/users';

function UserProfile() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <Loader2 className="animate-spin text-orange-500" size={48} />
        <p className="font-black uppercase tracking-widest text-xs text-gray-400">Syncing Registry...</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white min-h-screen">
      <header className="flex justify-between items-center mb-5 border-b-2 border-orange-300 pb-7">
        <div>
          <h1 className="text-3xl text-black uppercase tracking-tighter font-black italic">User Management</h1>
          <div className="flex items-center gap-2 mt-1">
             <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
             <p className="text-gray-500 font-bold text-xs tracking-widest uppercase">Live Registry: {users.length} Users</p>
          </div>
        </div>
        <div className="bg-green-400 text-white p-3 rounded-xl shadow-lg shadow-green-100">
          <ShieldCheck size={24} />
        </div>
      </header>

      <div className="overflow-hidden border-2 border-orange-200 rounded-2xl shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-orange-400 text-white uppercase text-[10px] tracking-[0.2em] font-black">
              <th className="px-6 py-4">User</th>
              <th className="px-6 py-4">Contact & Email</th>
              <th className="px-6 py-4">Address</th>
              <th className="px-6 py-4">Payment Info</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-orange-50/50 transition-colors">
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    {/* Updated Profile Icon Section */}
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 shrink-0 border-2 border-gray-200 shadow-inner">
                      <UserIcon size={20} />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-black text-black uppercase text-sm italic leading-none">{user.name || 'Unknown User'}</span>
                        <span className="text-[9px] text-gray-400 font-bold uppercase mt-1 tracking-tighter">Member ID: #{user.id}</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-xs font-bold text-black">
                      <Mail size={12} className="text-orange-500" /> {user.email}
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-gray-500 font-black">
                      <Phone size={11} /> {user.contact || 'No contact'}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5 text-[11px] font-bold text-gray-600">
                  <div className="flex items-center gap-2 max-w-[200px]">
                    <MapPin size={12} className="text-black shrink-0" />
                    <span className="truncate">{user.address || 'Address not set'}</span>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-black bg-gray-100 px-2 py-1 rounded w-fit">
                    <CreditCard size={12} /> {user.card || '**** 0000'}
                  </div>
                </td>
                <td className="px-6 py-5 text-center">
                  <button className="bg-red-500 text-white px-4 py-2 rounded-lg font-black text-[10px] uppercase tracking-wider hover:bg-black transition-all shadow-md active:scale-95">
                    Suspend
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {users.length === 0 && (
          <div className="p-20 text-center bg-gray-50">
            <p className="text-gray-400 font-black uppercase text-sm italic">No users found in the registry.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserProfile;
