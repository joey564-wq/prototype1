import Navbar from '../components/Navbar.jsx';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { listingsAPI } from '../lib/api.js';

export default function ListingsPage() {
  const [listings, setListings] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const data = await listingsAPI.getAll();
        setListings(data.listings || []);
        // Extract unique categories from listings
        const uniqueCategories = [...new Set(data.listings?.map(l => l.categories?.name).filter(Boolean))];
        setCategories(uniqueCategories);
      } catch (err) {
        setError('Failed to load listings');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div>
      <Navbar />
      <main className="max-w-4xl mx-auto p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Browse Listings</h1>
          <Link to="/listings/new" className="bg-brand-600 text-white py-2 px-4 rounded hover:bg-brand-700">+ Create Listing</Link>
        </div>

        <div className="mb-6 flex gap-4 flex-wrap">
          <select className="p-2 border rounded">
            <option>All Categories</option>
            {categories.map((cat, idx) => (
              <option key={idx}>{cat}</option>
            ))}
          </select>
          <select className="p-2 border rounded">
            <option>Any Condition</option>
            <option>New</option>
            <option>Like New</option>
            <option>Good</option>
            <option>Fair</option>
            <option>Poor</option>
          </select>
          <input type="number" placeholder="Min Price" className="p-2 border rounded w-24" />
          <input type="number" placeholder="Max Price" className="p-2 border rounded w-24" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {listings.map(listing => (
            <Link key={listing.id} to={`/listings/${listing.id}`} className="border rounded-lg p-4 hover:shadow-lg transition">
              <div className="h-40 bg-gray-200 rounded mb-2"></div>
              <h3 className="font-medium">{listing.title}</h3>
              <p className="text-sm text-gray-500 capitalize">{listing.categories?.name}</p>
              <p className="text-brand-600 font-bold mt-2">${listing.price?.toFixed(2)}</p>
              <p className={`text-xs mt-1 ${listing.status === 'sold' ? 'text-red-500' : 'text-green-600'}`}>
                {listing.status === 'sold' ? '● Sold' : '● Available'}
              </p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
