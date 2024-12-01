import React, { useState, useEffect } from 'react';
import { type Product } from '../types';
import ToolsDatabase from '../data/tools.json'; // Adjust the path based on the relative location of your file

export function ToolsPage() {
  const [tools, setTools] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [searchQuery, setSearchQuery] = useState('');

  // Using the imported JSON directly
  useEffect(() => {
    setTools(ToolsDatabase); // No need for fetch
  }, []);

  // Filter tools based on search query
  const filteredTools = tools.filter((tool) =>
    tool.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const addToCart = (tool: Product) => {
    const newCart = [...cart, tool];
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Embroidery Tools</h1>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by tags"
          className="w-full p-2 border border-gray-300 rounded-lg"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTools.map((tool) => (
          <div key={tool.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={tool.image}
              alt={tool.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{tool.title}</h2>
              <p className="text-gray-600 mb-4">{tool.description}</p>
              <div className="flex gap-2 mb-4">
                {tool.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-indigo-600">₹{tool.price}</span>
                <button
                  onClick={() => addToCart(tool)}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
