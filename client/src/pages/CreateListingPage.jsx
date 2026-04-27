import Navbar from '../components/Navbar.jsx';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { listingsAPI } from '../lib/api.js';
import { categories as mockCategories } from '../lib/mockData.js';
import Button from '../components/Button.jsx';
import Input, { Textarea, Select } from '../components/Input.jsx';

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
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-2xl mx-auto px-4 py-8">
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Listing Created!</h1>
            <p className="text-gray-500">Redirecting to your new listing...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-2xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/listings" className="text-brand-600 hover:underline inline-flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Listings
          </Link>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Create Listing</h1>
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input
              label="Title"
              placeholder="What are you selling?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              error={errors.title}
            />

            <Select
              label="Category"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              error={errors.categoryId}
            >
              <option value="">Select a category</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </Select>

            <Input
              label="Price ($)"
              type="number"
              placeholder="0.00"
              step="0.01"
              min="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              error={errors.price}
            />

            <Select
              label="Condition"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              error={errors.condition}
            >
              <option value="">Select condition</option>
              <option value="new">New</option>
              <option value="like_new">Like New</option>
              <option value="good">Good</option>
              <option value="fair">Fair</option>
              <option value="poor">Poor</option>
            </Select>

            <Textarea
              label="Description"
              placeholder="Describe your item..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              error={errors.description}
              rows={4}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Photos</label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                <svg className="mx-auto w-12 h-12 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-gray-500 text-sm">Click or drag to upload photos (up to 6)</p>
              </div>
            </div>

            {errors.submit && (
              <div className="bg-danger-50 border border-danger-200 rounded-lg p-4 text-danger-600 text-center">
                {errors.submit}
              </div>
            )}

            <div className="flex gap-3 pt-4">
              <button type="submit" disabled={submitting} className="flex-1">
                <Button size="lg" className="w-full" disabled={submitting}>
                  {submitting ? 'Creating...' : 'Publish Listing'}
                </Button>
              </button>
              <Link to="/listings" className="flex-1">
                <Button variant="secondary" size="lg" className="w-full">Cancel</Button>
              </Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
