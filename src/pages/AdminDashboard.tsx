import React from 'react';
import { AdminSidebar } from '../components/admin/AdminSidebar';
import { ProductsManager } from '../components/admin/ProductsManager';
import { CategoriesManager } from '../components/admin/CategoriesManager';
import { NotificationsManager } from '../components/admin/NotificationsManager';
import { Download } from 'lucide-react';
import database from '../data/database.json';

export function AdminDashboard() {
  const [activeTab, setActiveTab] = React.useState<'products' | 'categories' | 'notifications'>('products');

  const downloadDatabase = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(database, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "database.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <AdminSidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <button
            onClick={downloadDatabase}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Download className="h-5 w-5" />
            Download Updated Database
          </button>
        </div>

        {activeTab === 'products' && <ProductsManager />}
        {activeTab === 'categories' && <CategoriesManager />}
        {activeTab === 'notifications' && <NotificationsManager />}
      </div>
    </div>
  );
}