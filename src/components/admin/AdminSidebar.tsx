import React from 'react';
import { Package, Grid, Bell } from 'lucide-react';

interface AdminSidebarProps {
  activeTab: 'products' | 'categories' | 'notifications';
  onTabChange: (tab: 'products' | 'categories' | 'notifications') => void;
}

export function AdminSidebar({ activeTab, onTabChange }: AdminSidebarProps) {
  return (
    <div className="w-64 bg-white shadow-lg min-h-screen p-4">
      <h2 className="text-xl font-bold text-indigo-600 mb-8">Admin Panel</h2>
      <nav className="space-y-2">
        <button
          onClick={() => onTabChange('products')}
          className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'products'
              ? 'bg-indigo-50 text-indigo-600'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <Package className="h-5 w-5" />
          Products
        </button>
        <button
          onClick={() => onTabChange('categories')}
          className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'categories'
              ? 'bg-indigo-50 text-indigo-600'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <Grid className="h-5 w-5" />
          Categories
        </button>
        <button
          onClick={() => onTabChange('notifications')}
          className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'notifications'
              ? 'bg-indigo-50 text-indigo-600'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <Bell className="h-5 w-5" />
          Notifications
        </button>
      </nav>
    </div>
  );
}