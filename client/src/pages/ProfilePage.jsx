import Navbar from '../components/Navbar.jsx';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { listingsAPI } from '../lib/api.js';

export default function ProfilePage() {
  const { userId } = useParams();
  const [userListings, setUserListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState({ full_name: 'User', email: 'user@example.com' }); // Mock user data for now

  useEffect(() => {
    async function loadUserListings() {
      try {
        setLoading(true);
        const data = await listingsAPI.getByUser(userId);
        setUserListings(data.listings || []);
      } catch (err) {
        setError('Failed to load user listings');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadUserListings();
  }, [userId]);

  return (
    <div>
      <Navbar />
      <main className="max-w-4xl mx-auto p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 bg-gray-300 rounded-full"></div>
          <div>
            <h1 className="text-2xl font-bold">{user.full_name}</h1>
            <p className="text-gray-500">{user.email}</p>
            <p className="text-sm text-brand-600">Verified Student • 4.8 ★ (12 reviews)</p>
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-4">Active Listings</h2>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {userListings.map(listing => (
              <Link key={listing.id} to={`/listings/${listing.id}`} className="border rounded-lg p-4 hover:shadow-lg transition">
                <div className="h-32 bg-gray-200 rounded mb-2"></div>
                <h3 className="font-medium">{listing.title}</h3>
                <p className="text-brand-600 font-bold">${listing.price?.toFixed(2)}</p>
              </Link>
            ))}
          </div>
        )}

        <h2 className="text-xl font-semibold mb-4">Recent Reviews</h2>
        <div className="space-y-3">
          <div className="border rounded-lg p-4">
            <div className="flex justify-between">
              <Link to="/profile/2" className="font-medium text-brand-600 hover:underline">John Smith</Link>
              <p className="text-yellow-500">★★★★★</p>
            </div>
            <p className="text-sm text-gray-600 mt-1">Great seller! Item was exactly as described.</p>
          </div>
          <div className="border rounded-lg p-4">
            <div className="flex justify-between">
              <Link to="/profile/3" className="font-medium text-brand-600 hover:underline">Bob Wilson</Link>
              <p className="text-yellow-500">★★★★☆</p>
            </div>
            <p className="text-sm text-gray-600 mt-1">Smooth transaction, would buy again.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
