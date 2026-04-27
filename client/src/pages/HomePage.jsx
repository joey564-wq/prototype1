import Navbar from '../components/Navbar.jsx';
import { Link } from 'react-router-dom';
import { listings, categories } from '../lib/mockData.js';

export default function HomePage() {
  // Show first 3 listings as "recent"
  const recentListings = listings.slice(0, 3);

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
          {categories.map(cat => (
            <Link key={cat.id} to="/listings" className="p-4 bg-gray-100 rounded-lg text-center hover:bg-gray-200">{cat.name}</Link>
          ))}
        </div>

        <h2 className="text-xl font-semibold mb-4">Recent Listings</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recentListings.map(listing => (
            <Link key={listing.id} to={`/listings/${listing.id}`} className="border rounded-lg p-4 hover:shadow-lg transition">
              <div className="h-32 bg-gray-200 rounded mb-2"></div>
              <h3 className="font-medium">{listing.title}</h3>
              <p className="text-brand-600 font-bold">${listing.price.toFixed(2)}</p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
