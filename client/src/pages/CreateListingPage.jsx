import Navbar from '../components/Navbar.jsx';
import { Link, useEffect, useState } from 'react-router-dom';
import { listingsAPI } from '../lib/api.js';
import { categories as mockCategories } from '../lib/mockData.js';

export default function CreateListingPage() {
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [price, setPrice] = useState('');
  const [condition, setCondition] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // For now, use mock categories since we don't have a categories endpoint yet
  useEffect(() => {
    setCategories(mockCategories);
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = 'Title is required';
    if (!categoryId) newErrors.categoryId = 'Category is required';
    if (!price) newErrors.price = 'Price is required';
    else if (isNaN(price)) newErrors.price = 'Price must be a number';
    else if (parseFloat(price) < 0) newErrors.price = 'Price cannot be negative';
    else if (parseFloat(price) > 1000000) newErrors.price = 'Price is too high';
    if (!condition) newErrors.condition = 'Condition is required';
    if (!description.trim()) newErrors.description = 'Description is required';
    else if (description.length < 10) newErrors.description = 'Description must be at least 10 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setSubmitting(true);
      setErrors({});
      
      const listingData = {
        title,
        category_id: parseInt(categoryId),
        price: parseFloat(price),
        status: 'available',
        description
      };

      const result = await listingsAPI.create(listingData);
      setSuccess(true);
      
      // Redirect to the new listing after a short delay
      setTimeout(() => {
        window.location.href = `/listings/${result.listing.id}`;
      }, 1500);
      
    } catch (err) {
      setErrors({ submit: err.message || 'Failed to create listing' });
      console.error('Create listing error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div>
        <Navbar />
        <main className="max-w-2xl mx-auto p-6">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-green-600 mb-4">Listing Created!</h1>
            <p className="text-gray-600">Redirecting to your new listing...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <main className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Create Listing</h1>
        
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block font-medium mb-1">Title</label>
            <input
              type="text"
              className={`w-full p-2 border rounded ${errors.title ? 'border-red-500' : ''}`}
              placeholder="What are you selling?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          </div>

          <div>
            <label className="block font-medium mb-1">Category</label>
            <select
              className={`w-full p-2 border rounded ${errors.categoryId ? 'border-red-500' : ''}`}
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            >
              <option value="">Select a category</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
            {errors.categoryId && <p className="text-red-500 text-sm mt-1">{errors.categoryId}</p>}
          </div>

          <div>
            <label className="block font-medium mb-1">Price ($)</label>
            <input
              type="number"
              className={`w-full p-2 border rounded ${errors.price ? 'border-red-500' : ''}`}
              placeholder="0.00"
              step="0.01"
              min="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
          </div>

          <div>
            <label className="block font-medium mb-1">Condition</label>
            <select
              className={`w-full p-2 border rounded ${errors.condition ? 'border-red-500' : ''}`}
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
            >
              <option value="">Select condition</option>
              <option value="new">New</option>
              <option value="like_new">Like New</option>
              <option value="good">Good</option>
              <option value="fair">Fair</option>
              <option value="poor">Poor</option>
            </select>
            {errors.condition && <p className="text-red-500 text-sm mt-1">{errors.condition}</p>}
          </div>

          <div>
            <label className="block font-medium mb-1">Description</label>
            <textarea
              className={`w-full p-2 border rounded h-32 ${errors.description ? 'border-red-500' : ''}`}
              placeholder="Describe your item..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
          </div>

          <div>
            <label className="block font-medium mb-1">Photos</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center text-gray-500">
              Click or drag to upload photos (up to 6)
            </div>
          </div>

          {errors.submit && <p className="text-red-500 text-center">{errors.submit}</p>}

          <div className="flex gap-3">
            <button type="submit" disabled={submitting} className="flex-1 bg-brand-600 text-white py-2 px-4 rounded hover:bg-brand-700 disabled:opacity-50">
              {submitting ? 'Creating...' : 'Publish Listing'}
            </button>
            <Link to="/listings" className="flex-1 border py-2 px-4 rounded text-center hover:bg-gray-50">Cancel</Link>
          </div>
        </form>
      </main>
    </div>
  );
}
