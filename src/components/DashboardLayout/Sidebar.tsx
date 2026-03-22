import { LayoutDashboard, UtensilsCrossed, Settings, LogOut, User } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard />, path: '/' },
    { name: 'Menu', icon: <UtensilsCrossed />, path: '/menu' },
    { name: 'Users', icon: <User />, path: '/users' },
    { name: 'Settings', icon: <Settings />, path: '/settings' },
  ];

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-100 p-6 flex flex-col sticky top-0">
      <div className="flex items-center gap-2 mb-10">
        <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">R</div>
        <span className="text-xl font-bold text-orange-500">Restaurant</span>
      </div>

      <nav className="flex-1">
        {menuItems.map((item) => (
          <button
            key={item.name}
            onClick={() => navigate(item.path)}
            className={`w-full flex items-center gap-4 p-3 rounded-xl mb-2 transition ${
              location.pathname === item.path
                ? 'bg-orange-500 text-white shadow-lg'
                : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            {item.icon}
            <span className="font-semibold">{item.name}</span>
          </button>
        ))}
      </nav>

      <div className="border-t pt-6">
        <button className="flex items-center gap-4 text-gray-500 p-3 w-full hover:text-red-500 transition">
          <LogOut />
          <span className="font-semibold">Logout</span>
        </button>
      </div>
    </div>
  );
}