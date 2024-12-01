import React from 'react';
import { type Product } from '../types';

const tools: Product[] = [
  {
    id: 'T001',
    title: 'Professional Embroidery Hoop Set',
    description: 'Set of 5 bamboo hoops in different sizes (4" to 12")',
    price: 1200,
    image: 'https://images.unsplash.com/photo-1528870884180-5649b20f6435',
    tags: ['Hoops', 'Essential'],
    category: 'Tools',
    stock: 15
  },
  {
    id: 'T002',
    title: 'Premium Embroidery Scissors',
    description: 'Sharp, precise scissors for detailed embroidery work',
    price: 800,
    image: 'https://images.unsplash.com/photo-1590687764724-4d9dc731e04c',
    tags: ['Scissors', 'Essential'],
    category: 'Tools',
    stock: 20
  },
  {
    id: 'T003',
    title: 'Embroidery Needle Set',
    description: 'Set of 30 needles in various sizes with threader',
    price: 350,
    image: 'https://images.unsplash.com/photo-1519340241574-2cec6aef0c01',
    tags: ['Needles', 'Essential'],
    category: 'Tools',
    stock: 50
  },
  {
    id: 'T004',
    title: 'Thread Organizer Box',
    description: 'Clear plastic box with 36 compartments for thread storage',
    price: 600,
    image: 'https://images.unsplash.com/photo-1528870884180-5649b20f6435',
    tags: ['Storage', 'Organization'],
    category: 'Tools',
    stock: 10
  }
];

export function ToolsPage() {
  const [cart, setCart] = React.useState<Product[]>(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const addToCart = (tool: Product) => {
    const newCart = [...cart, tool];
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Embroidery Tools</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
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