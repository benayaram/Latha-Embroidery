import React from 'react';
import { X, Share2 } from 'lucide-react';
import { type Product } from '../../types';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export function ProductModal({ product, onClose, onAddToCart }: ProductModalProps) {
  const shareOnWhatsApp = () => {
    const message = `Check out this product!\n\nID: ${product.id}\nTitle: ${product.title}\nPrice: ₹${product.price}\n\nDescription: ${product.description}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{product.title}</h2>
              <p className="text-sm text-gray-500">Product ID: {product.id}</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
          <p className="text-gray-600 mb-4">{product.description}</p>
          <div className="flex items-center justify-between mb-4">
            <span className="text-2xl font-bold text-indigo-600">₹{product.price}</span>
            <span className={`px-3 py-1 rounded-full text-sm ${
              product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </span>
          </div>
          <div className="flex gap-2 mb-6">
            {product.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => onAddToCart(product)}
              disabled={product.stock === 0}
              className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
            </button>
            <button
              onClick={shareOnWhatsApp}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
            >
              <Share2 className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}