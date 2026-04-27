import Navbar from '../components/Navbar.jsx';
import { Link, useEffect, useState } from 'react-router-dom';
import { listingsAPI } from '../lib/api.js';

export default function HomePage() {
  const [recentListings, setRecentListings] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const data = await listingsAPI.getAll();
        // Show first 3 listings as "recent"
        setRecentListings((data.listings || []).slice(0, 3));
        // Extract unique categories from listings
        const uniqueCategories = [...new Set(data.listings?.map(l => l.categories?.name).filter(Boolean))];
        setCategories(uniqueCategories);
      } catch (err) {
        console.error('Failed to load data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div>
      <Navbar />
      <main className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-brand-600 mb-4">Campus Exchange</h1>
        <p className="text-gray-600 mb-8">Buy and sell within the Chico State community.</p>

        <div className="mb-8">
          <Link to="/listings/new" className="inline-block bg-brand-600 text-white py-2 px-4 rounded hover:bg-brand-700">+ Create Listing</Link>
        </div>

        <div className="mb-8">
          <input
            type="text"
            placeholder="Search listings..."
            className="w-full max-w-md p-3 border border-gray-300 rounded-lg"
          />
        </div>

        <h2 className="text-xl font-semibold mb-4">Featured Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {categories.map((cat, idx) => (
            <Link key={idx} to="/listings" className="p-4 bg-gray-100 rounded-lg text-center hover:bg-gray-200">{cat}</Link>
          ))}
        </div>

        <h2 className="text-xl font-semibold mb-4">Recent Listings</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recentListings.map(listing => (
              <Link key={listing.id} to={`/listings/${listing.id}`} className="border rounded-lg p-4 hover:shadow-lg transition">
                <div className="h-32 bg-gray-200 rounded mb-2"></div>
                <h3 className="font-medium">{listing.title}</h3>
                <p className="text-brand-600 font-bold">${listing.price?.toFixed(2)}</p>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
