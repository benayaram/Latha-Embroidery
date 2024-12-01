import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StorePage } from './pages/StorePage';
import { CartPage } from './pages/CartPage';
import { CustomOrderPage } from './pages/CustomOrderPage';
import { ContactPage } from './pages/ContactPage';
import { ToolsPage } from './pages/ToolsPage';
import { AdminDashboard } from './pages/AdminDashboard';

function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        <Route
          path="/admin/*"
          element={<AdminDashboard />}
        />
        <Route
          path="/*"
          element={
            <div className="min-h-screen bg-gray-50">
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/store" element={<StorePage />} />
                <Route path="/tools" element={<ToolsPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/custom" element={<CustomOrderPage />} />
                <Route path="/contact" element={<ContactPage />} />
              </Routes>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

function Home() {
  return (
    <main>
      <Hero />
    </main>
  );
}

export default App;