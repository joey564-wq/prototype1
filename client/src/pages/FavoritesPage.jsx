import Navbar from '../components/Navbar.jsx';
import { Link } from 'react-router-dom';
import { favorites, listings, users } from '../lib/mockData.js';
import Card from '../components/Card.jsx';
import Badge from '../components/Badge.jsx';
import Button from '../components/Button.jsx';

export default function FavoritesPage() {
  const currentUserId = 2;
  const userFavorites = favorites.filter(f => f.user_id === currentUserId);
  const favoriteListings = userFavorites.map(f => listings.find(l => l.id === f.listing_id)).filter(Boolean);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Favorites</h1>
        <p className="text-gray-500 mb-6">{favoriteListings.length} items saved</p>

        {favoriteListings.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <svg className="mx-auto w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No favorites yet</h3>
            <p className="text-gray-500 mb-4">Save items you're interested in by clicking the heart icon</p>
            <Link to="/listings">
              <Button>Browse Listings</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteListings.map(listing => {
              const seller = users.find(u => u.id === listing.seller_id);
              return (
                <Link key={listing.id} to={`/listings/${listing.id}`} className="group">
                  <Card hover className="overflow-hidden">
                    <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center group-hover:from-brand-50 group-hover:to-brand-100 transition-all">
                      <svg className="w-16 h-16 text-gray-400 group-hover:text-brand-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">{listing.title}</h3>
                      <p className="text-xl font-bold text-brand-600 mb-2">${listing.price.toFixed(2)}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-gray-400">{seller?.full_name}</p>
                        <Badge variant="outline" size="sm">{listing.categories?.name}</Badge>
                      </div>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
