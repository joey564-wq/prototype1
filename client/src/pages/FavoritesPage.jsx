import Navbar from '../components/Navbar.jsx';
import { Link } from 'react-router-dom';
import { favorites, listings, users } from '../lib/mockData.js';

export default function FavoritesPage() {
  // Mock current user ID
  const currentUserId = 2;
  const userFavorites = favorites.filter(f => f.user_id === currentUserId);
  const favoriteListings = userFavorites.map(f => listings.find(l => l.id === f.listing_id)).filter(Boolean);

  return (
    <div>
      <Navbar />
      <main className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Favorites</h1>
        <p className="text-gray-500 mb-6">{favoriteListings.length} items saved</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {favoriteListings.map(listing => {
            const seller = users.find(u => u.id === listing.seller_id);
            return (
              <Link key={listing.id} to={`/listings/${listing.id}`} className="border rounded-lg p-4 hover:shadow-lg transition">
                <div className="h-40 bg-gray-200 rounded mb-2"></div>
                <h3 className="font-medium">{listing.title}</h3>
                <p className="text-brand-600 font-bold mt-2">${listing.price.toFixed(2)}</p>
                <p className="text-xs text-gray-400 mt-1">{seller?.full_name}</p>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}
