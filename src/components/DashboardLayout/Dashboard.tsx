import Sidebar from "./Sidebar";
import '../index.css'
export default function DashboardPage() {
  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      
      <main className="flex-1 p-8">
        {/* Header Section */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold">We have a lot of orders </h1>
          </div>
          <div className="text-gray-400">Wednesday, 27 January 2026</div>
        </header>

        <div className="grid grid-cols-3 gap-6">
         
          <div className="col-span-2 space-y-6">
            <div className="grid grid-cols-3 gap-4">
               {/* New Orders Card */}
               <div className="bg-green-900 text-white p-6 rounded-3xl relative overflow-hidden">
                  <p className="text-sm opacity-80">New Orders</p>
                  <h2 className="text-4xl font-bold mt-2">16</h2>
                  <div className="absolute top-4 right-4 bg-white/10 p-2 rounded-lg">🔔</div>
               </div>
             
            </div>

            {/* Order List Table */}
            <div className="bg-white rounded-3xl p-6 shadow-sm">
              <h3 className="font-bold mb-4">Order List</h3>
              {/* Table code goes here... */}
            </div>
          </div>

          {/* Right Section: Popular Dishes & Out of Stock */}
          <div className="space-y-6">
            <button className="w-full bg-yellow-500 text-white py-4 rounded-xl font-bold text-lg shadow-md hover:bg-yellow-600 transition">
              + CREATE NEW ORDER
            </button>
            
            <div className="bg-white rounded-3xl p-6 shadow-sm">
              <h3 className="font-bold mb-4">Popular Dishes</h3>
             
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}