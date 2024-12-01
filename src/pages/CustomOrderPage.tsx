import React from 'react';
import { Upload } from 'lucide-react';

export function CustomOrderPage() {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    productType: '',
    image: '', // Image file data URL
    errorMessage: '', // Error message for file size
  });

  // Handle image upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // File size limit (10MB)
      const MAX_SIZE = 10 * 1024 * 1024; // 10MB

      if (file.size > MAX_SIZE) {
        setFormData((prev) => ({
          ...prev,
          errorMessage: 'File size exceeds the 10MB limit. Please upload a smaller file.',
        }));
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const imageDataUrl = reader.result as string;
        setFormData((prev) => ({
          ...prev,
          image: imageDataUrl,
          errorMessage: '', // Clear the error message when a valid image is uploaded
        }));
        localStorage.setItem('customOrderImage', imageDataUrl); // Save to localStorage
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission and WhatsApp message
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const predefinedPhoneNumber = "+917780549645"; // Replace with the desired phone number (including the country code)

    const message = `Custom Order Request:\n
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Product Type: ${formData.productType}
Image: [Image Preview is Available]`; // Send message with image description, but not base64

    // Open WhatsApp link (will not send the image directly, only the message)
    window.open(`https://wa.me/${predefinedPhoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Custom Order</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              required
              value={formData.email}
              onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              required
              value={formData.phone}
              onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="productType" className="block text-sm font-medium text-gray-700">
              Product Type
            </label>
            <select
              id="productType"
              required
              value={formData.productType}
              onChange={(e) => setFormData((prev) => ({ ...prev, productType: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">Select a product type</option>
              <option value="T-shirt">T-shirt</option>
              <option value="Cap">Cap</option>
              <option value="Saree">Saree</option>
              <option value="Blouse">Blouse</option>
            </select>
          </div>

          {/* File upload with preview */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Design Image</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="image-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="sr-only"
                    />
                  </label>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
            {/* Display error message if file size is too large */}
            {formData.errorMessage && (
              <p className="mt-2 text-red-600 text-sm">{formData.errorMessage}</p>
            )}

            {/* Image Preview */}
            {formData.image && (
              <div className="mt-4">
                <img src={formData.image} alt="Image Preview" className="max-w-xs mx-auto" />
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Submit Custom Order
          </button>
        </form>
      </div>
    </div>
  );
}
