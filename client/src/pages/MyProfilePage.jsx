import Navbar from '../components/Navbar.jsx';
import { Link, useEffect, useState } from 'react-router-dom';
import { listingsAPI } from '../lib/api.js';

export default function MyProfilePage() {
  // Mock current user ID - in real app this would come from auth
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
    <div>
      <Navbar />
      <main className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">My Profile</h1>

        <div className="border rounded-lg p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Edit Profile</h2>
          <form className="space-y-4 max-w-md">
            <div>
              <label className="block font-medium mb-1">Full Name</label>
              <input type="text" className="w-full p-2 border rounded" defaultValue={currentUser.full_name} />
            </div>
            <div>
              <label className="block font-medium mb-1">Email</label>
              <input type="email" className="w-full p-2 border rounded bg-gray-50" defaultValue={currentUser.email} disabled />
            </div>
            <div>
              <label className="block font-medium mb-1">Bio</label>
              <textarea className="w-full p-2 border rounded h-20" defaultValue={currentUser.bio}></textarea>
            </div>
            <button type="submit" className="bg-brand-600 text-white py-2 px-4 rounded hover:bg-brand-700">Save Changes</button>
          </form>
        </div>

        <h2 className="text-xl font-semibold mb-4">My Listings</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {myListings.map(listing => (
              <Link key={listing.id} to={`/listings/${listing.id}`} className="border rounded-lg p-4 hover:shadow-lg transition">
                <div className="h-32 bg-gray-200 rounded mb-2"></div>
                <h3 className="font-medium">{listing.title}</h3>
                <p className="text-brand-600 font-bold">${listing.price?.toFixed(2)}</p>
                <p className={`text-xs mt-1 ${listing.status === 'sold' ? 'text-red-500' : 'text-green-600'}`}>
                  {listing.status === 'sold' ? '● Sold' : '● Available'}
                </p>
              </Link>
            ))}
          </div>
        )}

        <div className="flex gap-3">
          <Link to="/" className="border py-2 px-4 rounded text-center hover:bg-gray-50">Sign Out</Link>
          <button className="border border-red-500 text-red-500 py-2 px-4 rounded hover:bg-red-50">Delete Account</button>
        </div>
      </main>
    </div>
  );
}
