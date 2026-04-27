import Navbar from '../components/Navbar.jsx';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { listingsAPI } from '../lib/api.js';
import Card from '../components/Card.jsx';
import Badge from '../components/Badge.jsx';

export default function ProfilePage() {
  const { userId } = useParams();
  const [userListings, setUserListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState({ full_name: 'User', email: 'user@example.com' });

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
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <Card className="mb-8">
          <div className="p-6 flex items-center gap-6">
            <div className="w-20 h-20 bg-brand-100 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{user.full_name}</h1>
              <p className="text-gray-500">{user.email}</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="brand">Verified Student</Badge>
                <span className="text-sm text-gray-600">4.8 ★ (12 reviews)</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Active Listings */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Active Listings</h2>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <svg className="animate-spin h-8 w-8 text-brand-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          ) : error ? (
            <div className="bg-danger-50 border border-danger-200 rounded-lg p-4 text-danger-600">{error}</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userListings.map(listing => (
                <Link key={listing.id} to={`/listings/${listing.id}`} className="group">
                  <Card hover className="overflow-hidden">
                    <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center group-hover:from-brand-50 group-hover:to-brand-100 transition-all">
                      <svg className="w-16 h-16 text-gray-400 group-hover:text-brand-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">{listing.title}</h3>
                      <p className="text-xl font-bold text-brand-600">${listing.price?.toFixed(2)}</p>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* Reviews */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Reviews</h2>
          <div className="space-y-3">
            <Card className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Link to="/profile/2" className="font-semibold text-brand-600 hover:underline">John Smith</Link>
                <p className="text-yellow-500">★★★★★</p>
              </div>
              <p className="text-sm text-gray-600">Great seller! Item was exactly as described.</p>
            </Card>
            <Card className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Link to="/profile/3" className="font-semibold text-brand-600 hover:underline">Bob Wilson</Link>
                <p className="text-yellow-500">★★★★☆</p>
              </div>
              <p className="text-sm text-gray-600">Smooth transaction, would buy again.</p>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
}
