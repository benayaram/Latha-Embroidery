import React from 'react';
import { ViewModeToggle } from '../components/store/ViewModeToggle';
import { FilterBar } from '../components/store/FilterBar';
import { ProductGrid } from '../components/store/ProductGrid';
import { ProductModal } from '../components/store/ProductModal';
import { SubscriptionForm } from '../components/notifications/SubscriptionForm';
import { type Product } from '../types';
import database from '../data/database.json';

export function StorePage() {
  const [viewMode, setViewMode] = React.useState<'categorical' | 'normal'>('categorical');
  const [selectedCategory, setSelectedCategory] = React.useState('');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null);

  const filteredProducts = database.products.filter((product) => {
    const matchesCategory = selectedCategory
      ? viewMode === 'categorical'
        ? product.category === selectedCategory
        : product.tags.includes(selectedCategory)
      : true;
    
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  const addToCart = (product: Product) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    setSelectedProduct(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Our Designs</h1>
        <ViewModeToggle mode={viewMode} onModeChange={setViewMode} />
      </div>
      
      <FilterBar
        categories={database.categories}
        selectedCategory={selectedCategory}
        searchQuery={searchQuery}
        viewMode={viewMode}
        onCategoryChange={setSelectedCategory}
        onSearchChange={setSearchQuery}
      />

      <ProductGrid
        products={filteredProducts}
        onProductClick={setSelectedProduct}
      />

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={addToCart}
        />
      )}

      <div className="mt-12">
        <SubscriptionForm />
      </div>
    </div>
  );
}