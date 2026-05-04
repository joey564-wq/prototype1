import Navigation from '../components/Navigation.jsx';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { favorites, listings, users } from '../lib/mockData.js';
import Card from '../components/Card.jsx';
import Badge from '../components/Badge.jsx';
import Button from '../components/Button.jsx';

export default function FavoritesPage() {
  const currentUserId = 2;
  const [showConfirm, setShowConfirm] = useState(null);
  const userFavorites = favorites.filter(f => f.user_id === currentUserId);
  const favoriteListings = userFavorites.map(f => listings.find(l => l.id === f.listing_id)).filter(Boolean);

  const handleRemove = (listingId) => {
    setShowConfirm(listingId);
  };

  const confirmRemove = () => {
    console.log('Removing favorite:', showConfirm);
    setShowConfirm(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
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
                <div key={listing.id} className="group relative">
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
                  <button
                    onClick={() => handleRemove(listing.id)}
                    className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50"
                  >
                    <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Confirmation Dialog */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <Card className="p-6 max-w-sm w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Remove from Favorites?</h3>
            <p className="text-gray-600 mb-4">This item will be removed from your favorites list.</p>
            <div className="flex gap-3">
              <Button variant="secondary" onClick={() => setShowConfirm(null)} className="flex-1">Cancel</Button>
              <Button variant="danger" onClick={confirmRemove} className="flex-1">Remove</Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}