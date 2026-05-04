import Navigation from '../components/Navigation.jsx';
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
      <Navigation />
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
              <h2 className="text-xl font-bold text-gray-900">{user.full_name}</h2>
              <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                <span>{user.major} • Class of {user.graduation_year}</span>
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-success-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Verified
                </span>
              </div>
              <div className="flex items-center gap-1 mt-1">
                <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-sm font-medium text-gray-900">4.8</span>
                <span className="text-sm text-gray-500">(12 reviews)</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex gap-8">
            <button
              onClick={() => setActiveTab('listings')}
              className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'listings'
                  ? 'border-brand-600 text-brand-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Listings ({userListings.length})
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'reviews'
                  ? 'border-brand-600 text-brand-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Reviews (12)
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'listings' && (
          <section>
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
        )}

        {activeTab === 'reviews' && (
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
        )}
      </main>
    </div>
  );
}
