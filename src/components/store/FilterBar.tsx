import React from 'react';
import { Search } from 'lucide-react';
import { type Category } from '../../types';

interface FilterBarProps {
  categories: Category[];
  selectedCategory: string;
  searchQuery: string;
  viewMode: 'categorical' | 'normal';
  onCategoryChange: (category: string) => void;
  onSearchChange: (query: string) => void;
}

export function FilterBar({
  categories,
  selectedCategory,
  searchQuery,
  viewMode,
  onCategoryChange,
  onSearchChange,
}: FilterBarProps) {
  const normalCategories = ['Simple', 'Medium', 'Heavy'];

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search designs..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>
        <div className="flex gap-4">
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="">All {viewMode === 'categorical' ? 'Categories' : 'Types'}</option>
            {viewMode === 'categorical'
              ? categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))
              : normalCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
          </select>
        </div>
      </div>
    </div>
  );
}