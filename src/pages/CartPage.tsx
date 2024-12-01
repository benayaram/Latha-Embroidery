import React from 'react';
import { Trash2, Share2 } from 'lucide-react';
import { type Product } from '../types';

export function CartPage() {
  const [cart, setCart] = React.useState<Product[]>(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const removeFromCart = (productId: string) => {
    if (confirm('Are you sure you want to remove this item from your cart?')) {
      const newCart = cart.filter((item) => item.id !== productId);
      setCart(newCart);
      localStorage.setItem('cart', JSON.stringify(newCart));
    }
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const shareOnWhatsApp = () => {
    const message = `My Shopping Cart:\n\n${cart
      .map((item) => `ID: ${item.id}\n${item.title} - ₹${item.price}`)
      .join('\n\n')}\n\nTotal: ₹${total}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your cart is empty</h2>
        <p className="text-gray-600 mb-8">Add some beautiful designs to your cart!</p>
        <a
          href="/store"
          className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Continue Shopping
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="divide-y divide-gray-200">
          {cart.map((item) => (
            <div key={item.id} className="p-6 flex items-center">
              <img
                src={item.image}
                alt={item.title}
                className="w-24 h-24 object-cover rounded"
              />
              <div className="ml-6 flex-1">
                <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-500">Product ID: {item.id}</p>
                <p className="text-gray-600 mt-1">{item.description}</p>
              </div>
              <div className="ml-6">
                <p className="text-lg font-semibold text-gray-900">₹{item.price}</p>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="ml-6 text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-6 w-6" />
              </button>
            </div>
          ))}
        </div>
        <div className="p-6 bg-gray-50">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-900">Total:</span>
            <span className="text-2xl font-bold text-indigo-600">₹{total}</span>
          </div>
          <div className="mt-6 flex gap-4">
            <button
              onClick={shareOnWhatsApp}
              className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
            >
              <Share2 className="h-5 w-5" />
              Place Order via WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}