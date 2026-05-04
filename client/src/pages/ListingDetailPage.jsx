import Navigation from '../components/Navigation.jsx';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { listingsAPI, messagesAPI } from '../lib/api.js';
import { useAuth } from '../contexts/AuthContext.jsx';
import Button from '../components/Button.jsx';
import Badge from '../components/Badge.jsx';
import Card from '../components/Card.jsx';

export default function ListingDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showOfferInput, setShowOfferInput] = useState(false);
  const [offerAmount, setOfferAmount] = useState('');
  const [offerError, setOfferError] = useState('');
  const [offerSuccess, setOfferSuccess] = useState('');

  useEffect(() => {
    async function loadListing() {
      try {
        setLoading(true);
        const data = await listingsAPI.getById(id);
        setListing(data);
      } catch (err) {
        setError('Listing not found');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadListing();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-center py-12">
          <svg className="animate-spin h-8 w-8 text-brand-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      </main>
    </div>
  );

  const handleMessageSeller = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    navigate('/messages');
  };

  const handleMakeOffer = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    setShowOfferInput(true);
    setOfferSuccess('');
    setOfferError('');
  };

  const handleSendOffer = async (e) => {
    e.preventDefault();
    if (!offerAmount) {
      setOfferError('Please enter an offer amount');
      return;
    }
    const amount = parseFloat(offerAmount);
    if (isNaN(amount) || amount <= 0) {
      setOfferError('Offer must be a positive number');
      return;
    }
    try {
      const messageText = `Hi, I'd like to offer $${amount.toFixed(2)} for ${listing.title}`;
      await messagesAPI.sendMessage(user.id, listing.seller_id, listing.id, messageText);
      setOfferSuccess('Offer sent successfully!');
      setOfferAmount('');
      setShowOfferInput(false);
    } catch (err) {
      setOfferError('Failed to send offer. Please try again.');
      console.error(err);
    }
  };

  if (error || !listing) return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-danger-50 border border-danger-200 rounded-lg p-6 text-center">
          <p className="text-danger-600">{error || 'Listing not found'}</p>
          <Link to="/listings" className="text-brand-600 hover:underline mt-2 inline-block">Back to Listings</Link>
        </div>
      </main>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/listings" className="text-brand-600 hover:underline mb-4 inline-flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Listings
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
          {/* Image Section */}
          <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl h-96 flex items-center justify-center shadow-inner">
            <svg className="w-24 h-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{listing.title}</h1>
            <p className="text-4xl font-bold text-brand-600 mb-4">${listing.price?.toFixed(2)}</p>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-gray-700 leading-relaxed">{listing.description || 'No description provided.'}</p>
            </div>
            
            {/* Seller Card */}
            <Card className="mb-6">
              <div className="p-4 flex items-center gap-4">
                <div className="w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <Link to={`/profile/${listing.seller_id}`} className="font-semibold text-gray-900 hover:text-brand-600">
                    {listing.users?.full_name}
                  </Link>
                  <p className="text-sm text-gray-500">Verified student • 4.8 ★ (12 reviews)</p>
                </div>
              </div>
            </Card>

            {/* Actions */}
            <div className="flex flex-col gap-3">
              <Button size="lg" className="w-full" onClick={handleMessageSeller}>Message Seller</Button>
              {!showOfferInput ? (
                <Button variant="secondary" size="lg" className="w-full" onClick={handleMakeOffer}>Make Offer</Button>
              ) : (
                <form onSubmit={handleSendOffer} className="flex flex-col gap-2">
                  <div className="flex gap-2">
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="Your offer amount"
                      value={offerAmount}
                      onChange={(e) => { setOfferAmount(e.target.value); setOfferError(''); }}
                      className={`flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 ${offerError ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    <Button type="submit" variant="secondary">Send Offer</Button>
                  </div>
                  {offerError && <p className="text-sm text-red-600">{offerError}</p>}
                  {offerSuccess && <p className="text-sm text-green-600">{offerSuccess}</p>}
                </form>
              )}
              <Button variant="ghost" size="lg" className="w-full">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                Add to Favorites
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
