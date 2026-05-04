import Navigation from '../components/Navigation.jsx';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { listingsAPI } from '../lib/api.js';
import Button from '../components/Button.jsx';
import Badge from '../components/Badge.jsx';
import Card from '../components/Card.jsx';

export default function HomePage() {
  const [recentListings, setRecentListings] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const data = await listingsAPI.getAll();
        setRecentListings((data.listings || []).slice(0, 6));
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
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-brand-600 to-brand-800 rounded-2xl p-8 md:p-12 mb-8 text-white shadow-xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Campus Exchange</h1>
          <p className="text-brand-100 text-lg mb-6 max-w-xl">Buy and sell within the Chico State community. Find textbooks, electronics, furniture, and more from fellow students.</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/listings/new">
              <Button size="lg">+ Create Listing</Button>
            </Link>
            <Link to="/listings">
              <Button variant="secondary" size="lg">Browse All Listings</Button>
            </Link>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search listings..."
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent shadow-sm"
            />
          </div>
        </div>

        {/* Categories */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat, idx) => (
              <Link key={idx} to="/listings" className="group">
                <Card hover className="p-6 text-center">
                  <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-brand-200 transition-colors">
                    <svg className="w-6 h-6 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                    </svg>
                  </div>
                  <h3 className="font-medium text-gray-900">{cat}</h3>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Recent Listings */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Recent Listings</h2>
            <Link to="/listings" className="text-brand-600 hover:text-brand-700 font-medium">View All →</Link>
          </div>
          
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <svg className="animate-spin h-8 w-8 text-brand-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentListings.map(listing => (
                <Link key={listing.id} to={`/listings/${listing.id}`} className="group">
                  <Card hover className="overflow-hidden">
                    <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center group-hover:from-brand-50 group-hover:to-brand-100 transition-all">
                      <svg className="w-16 h-16 text-gray-400 group-hover:text-brand-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="p-4">
                      <Badge variant={listing.status === 'sold' ? 'danger' : 'success'} size="sm" className="mb-2">
                        {listing.status === 'sold' ? 'Sold' : 'Available'}
                      </Badge>
                      <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">{listing.title}</h3>
                      <p className="text-sm text-gray-500 mb-3">{listing.categories?.name}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-xl font-bold text-brand-600">${listing.price?.toFixed(2)}</p>
                        <p className="text-xs text-gray-400">{listing.users?.full_name}</p>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
