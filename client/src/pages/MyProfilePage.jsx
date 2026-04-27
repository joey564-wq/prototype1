import Navbar from '../components/Navbar.jsx';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { listingsAPI } from '../lib/api.js';
import Card from '../components/Card.jsx';
import Button from '../components/Button.jsx';
import Input, { Textarea } from '../components/Input.jsx';
import Badge from '../components/Badge.jsx';

export default function MyProfilePage() {
  const currentUserId = 1;
  const [myListings, setMyListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState({ full_name: 'Jane Doe', email: 'jane.doe@example.com', bio: '' });

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
      <Navbar />
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
                  <Link key={listing.id} to={`/listings/${listing.id}`} className="group">
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
    </div>
  );
}
