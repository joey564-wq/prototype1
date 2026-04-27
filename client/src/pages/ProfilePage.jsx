import Navbar from '../components/Navbar.jsx';
import { Link, useParams } from 'react-router-dom';
import { users, listings, ratings } from '../lib/mockData.js';

export default function ProfilePage() {
  const { userId } = useParams();
  const user = users.find(u => u.id === parseInt(userId));
  const userListings = listings.filter(l => l.seller_id === parseInt(userId));
  const userRatings = ratings.filter(r => r.reviewee_id === parseInt(userId));

  if (!user) {
    return (
      <div>
        <Navbar />
        <main className="max-w-4xl mx-auto p-6">
          <p>User not found</p>
          <Link to="/" className="text-brand-600 hover:underline">Back to Home</Link>
        </main>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <main className="max-w-4xl mx-auto p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 bg-gray-300 rounded-full"></div>
          <div>
            <h1 className="text-2xl font-bold">{user.full_name}</h1>
            <p className="text-gray-500">{user.email}</p>
            <p className="text-sm text-brand-600">Verified Student • {user.avg_rating} ★ ({userRatings.length} reviews)</p>
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-4">Active Listings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {userListings.map(listing => (
            <Link key={listing.id} to={`/listings/${listing.id}`} className="border rounded-lg p-4 hover:shadow-lg transition">
              <div className="h-32 bg-gray-200 rounded mb-2"></div>
              <h3 className="font-medium">{listing.title}</h3>
              <p className="text-brand-600 font-bold">${listing.price.toFixed(2)}</p>
            </Link>
          ))}
        </div>

        <h2 className="text-xl font-semibold mb-4">Recent Reviews</h2>
        <div className="space-y-3">
          {userRatings.map(rating => {
            const reviewer = users.find(u => u.id === rating.reviewer_id);
            return (
              <div key={rating.id} className="border rounded-lg p-4">
                <div className="flex justify-between">
                  <Link to={`/profile/${reviewer?.id}`} className="font-medium text-brand-600 hover:underline">{reviewer?.full_name}</Link>
                  <p className="text-yellow-500">{'★'.repeat(rating.score)}</p>
                </div>
                <p className="text-sm text-gray-600 mt-1">{rating.comment}</p>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
