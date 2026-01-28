import '../../index.css';
import { LayoutDashboard, UtensilsCrossed,  Settings, LogOut, User } from 'lucide-react';

export default function Sidebar() {
  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard />, active: true },
    { name: 'Menu', icon: <UtensilsCrossed />, active: false },
    { name: 'Users', icon: <User />, active: false },
    { name: 'Settings', icon: <Settings />, active: false },
  ];

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-100 p-6 flex flex-col">
      <div className="flex items-center gap-2 mb-10">
        <div className="w-8 h-8 bg-orange-200 rounded-lg"></div>
        <span className="text-xl font-bold text-orange-200">Restaurant</span>
      </div>

      <nav className="flex-1">
        {menuItems.map((item) => (
          <button
            key={item.name}
            className={`w-full flex items-center gap-4 p-3 rounded-xl mb-2 transition ${
              item.active ? 'bg-yellow-500 text-white shadow-lg' : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            {item.icon}
            <span className="font-semibold">{item.name}</span>
          </button>
        ))}
      </nav>

      <div className="border-t pt-6">
        <button className="flex items-center gap-4 text-gray-500 p-3 w-full">
          <LogOut />
          <span className="font-semibold">Logout</span>
        </button>
      </div>
    </div>
  );
}