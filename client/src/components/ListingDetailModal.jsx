import { useEffect, useState } from 'react';
import { listingsAPI } from '../lib/api.js';
import Button from './Button.jsx';
import Badge from './Badge.jsx';
import Card from './Card.jsx';
import Modal from './Modal.jsx';

export default function ListingDetailModal({ isOpen, onClose, listingId }) {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isOpen || !listingId) return;
    
    async function loadListing() {
      try {
        setLoading(true);
        const data = await listingsAPI.getById(listingId);
        setListing(data);
      } catch (err) {
        setError('Listing not found');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadListing();
  }, [isOpen, listingId]);

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={listing?.title || 'Loading...'}>
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <svg className="animate-spin h-8 w-8 text-brand-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      ) : error || !listing ? (
        <div className="bg-danger-50 border border-danger-200 rounded-lg p-6 text-center">
          <p className="text-danger-600">{error || 'Listing not found'}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Image Section */}
          <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl h-80 flex items-center justify-center shadow-inner">
            <svg className="w-20 h-20 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>

          {/* Details Section */}
          <div>
            <div className="flex items-start justify-between mb-2">
              <Badge variant={listing.status === 'sold' ? 'danger' : 'success'}>
                {listing.status === 'sold' ? 'Sold' : 'Available'}
              </Badge>
              <Badge variant="outline">{listing.categories?.name}</Badge>
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{listing.title}</h3>
            <p className="text-3xl font-bold text-brand-600 mb-4">${listing.price?.toFixed(2)}</p>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-gray-700 leading-relaxed">{listing.description || 'No description provided.'}</p>
            </div>
            
            {/* Seller Card */}
            <Card className="mb-6">
              <div className="p-4 flex items-center gap-4">
                <div className="w-10 h-10 bg-brand-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{listing.users?.full_name}</p>
                  <p className="text-sm text-gray-500">Verified student • {listing.users?.avg_rating || 4.8} ★</p>
                </div>
              </div>
            </Card>

            {/* Actions */}
            <div className="flex flex-col gap-3">
              <Button size="lg" className="w-full">Message Seller</Button>
              <Button variant="secondary" size="lg" className="w-full">Make Offer</Button>
              <Button variant="ghost" size="lg" className="w-full">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                Add to Favorites
              </Button>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}
