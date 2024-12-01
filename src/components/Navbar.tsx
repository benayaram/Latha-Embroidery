import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { NotificationBell } from './notifications/NotificationBell';

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-indigo-600">Latha Embroidery</h1>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-indigo-600">Home</Link>
            <Link to="/store" className="text-gray-700 hover:text-indigo-600">Store</Link>
            <Link to="/tools" className="text-gray-700 hover:text-indigo-600">Tools</Link>
            <Link to="/custom" className="text-gray-700 hover:text-indigo-600">Custom Order</Link>
            <Link to="/contact" className="text-gray-700 hover:text-indigo-600">Contact</Link>
            <NotificationBell />
            <Link to="/cart" className="relative">
              <ShoppingCart className="h-6 w-6 text-gray-700 hover:text-indigo-600" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-indigo-600 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                  {cart.length}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-indigo-600"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block px-3 py-2 text-gray-700 hover:text-indigo-600"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/store"
              className="block px-3 py-2 text-gray-700 hover:text-indigo-600"
              onClick={() => setIsOpen(false)}
            >
              Store
            </Link>
            <Link
              to="/tools"
              className="block px-3 py-2 text-gray-700 hover:text-indigo-600"
              onClick={() => setIsOpen(false)}
            >
              Tools
            </Link>
            <Link
              to="/custom"
              className="block px-3 py-2 text-gray-700 hover:text-indigo-600"
              onClick={() => setIsOpen(false)}
            >
              Custom Order
            </Link>
            <Link
              to="/contact"
              className="block px-3 py-2 text-gray-700 hover:text-indigo-600"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            <Link
              to="/cart"
              className="block px-3 py-2 text-gray-700 hover:text-indigo-600"
              onClick={() => setIsOpen(false)}
            >
              Cart ({cart.length})
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}