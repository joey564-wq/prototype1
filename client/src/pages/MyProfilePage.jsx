import Navigation from '../components/Navigation.jsx';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { listingsAPI } from '../lib/api.js';
import Card from '../components/Card.jsx';
import Button from '../components/Button.jsx';
import Input, { Textarea, Select } from '../components/Input.jsx';
import Badge from '../components/Badge.jsx';

export default function MyProfilePage() {
  const currentUserId = 1;
  const [myListings, setMyListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [currentUser, setCurrentUser] = useState({ 
    full_name: 'Jane Doe', 
    email: 'jane.doe@example.com', 
    bio: '',
    graduation_year: '',
    major: ''
  });

  const handleDelete = (listingId) => {
    setShowDeleteConfirm(listingId);
  };

  const confirmDelete = () => {
    console.log('Deleting listing:', showDeleteConfirm);
    setShowDeleteConfirm(null);
  };

  useEffect(() => {
    async function loadMyListings() {
      try {
        setLoading(true);
        const data = await listingsAPI.getByUser(currentUserId);
        setMyListings(data.listings || []);
      } catch (err) {
        console.error('Failed to load my listings:', err);
      } finally {
        setLoading(false);
      }
    }
    loadMyListings();
  }, [currentUserId]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">My Profile</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Edit Profile Card */}
          <Card className="lg:col-span-1">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Edit Profile</h2>
              <form className="space-y-4">
                <Input
                  label="Full Name"
                  defaultValue={currentUser.full_name}
                />
                <Input
                  label="Email"
                  type="email"
                  defaultValue={currentUser.email}
                  disabled
                  className="bg-gray-50"
                />
                <Textarea
                  label="Bio"
                  defaultValue={currentUser.bio}
                  rows={3}
                />
                <Select
                  label="Graduation Year"
                  defaultValue={currentUser.graduation_year}
                >
                  <option value="">Select graduation year</option>
                  {Array.from({ length: 7 }, (_, i) => {
                    const year = new Date().getFullYear() + i;
                    return <option key={year} value={year}>{year}</option>;
                  })}
                </Select>
                <Input
                  label="Major"
                  defaultValue={currentUser.major}
                  placeholder="e.g., Computer Science"
                />
                <Button className="w-full">Save Changes</Button>
              </form>
            </div>
          </Card>

          {/* My Listings */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold text-gray-900 mb-4">My Listings</h2>
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <svg className="animate-spin h-8 w-8 text-brand-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {myListings.map(listing => (
                  <div key={listing.id} className="group relative">
                    <Link to={`/listings/${listing.id}`} className="group">
                      <Card hover className="overflow-hidden">
                        <div className="h-40 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center group-hover:from-brand-50 group-hover:to-brand-100 transition-all">
                          <svg className="w-12 h-12 text-gray-400 group-hover:text-brand-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-semibold text-gray-900 line-clamp-2 flex-1">{listing.title}</h3>
                            <Badge 
                              variant={listing.status === 'sold' ? 'danger' : 'success'} 
                            size="sm"
                            className="ml-2 flex-shrink-0"
                          >
                            {listing.status === 'sold' ? 'Sold' : 'Available'}
                          </Badge>
                        </div>
                        <p className="text-xl font-bold text-brand-600">${listing.price?.toFixed(2)}</p>
                      </div>
                    </Card>
                    </Link>
                    <button
                      onClick={(e) => { e.preventDefault(); handleDelete(listing.id); }}
                      className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 z-10"
                    >
                      <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Account Actions */}
            <Card className="mt-6 p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Account Actions</h3>
              <div className="flex flex-wrap gap-3">
                <Link to="/" className="w-full sm:w-auto">
                  <Button variant="secondary" className="w-full sm:w-auto">Sign Out</Button>
                </Link>
                <Button variant="danger" className="w-full sm:w-auto">Delete Account</Button>
              </div>
            </Card>
          </div>
        </div>
      </main>

      {/* Delete Confirmation Dialog */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <Card className="p-6 max-w-sm w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Listing?</h3>
            <p className="text-gray-600 mb-4">This action cannot be undone. Are you sure you want to delete this listing?</p>
            <div className="flex gap-3">
              <Button variant="secondary" onClick={() => setShowDeleteConfirm(null)} className="flex-1">Cancel</Button>
              <Button variant="danger" onClick={confirmDelete} className="flex-1">Delete</Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
