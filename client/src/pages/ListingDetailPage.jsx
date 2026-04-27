import Navbar from '../components/Navbar.jsx';
import { Link, useParams } from 'react-router-dom';
import { listings, users, categories } from '../lib/mockData.js';

export default function ListingDetailPage() {
  const { id } = useParams();
  const listing = listings.find(l => l.id === parseInt(id));
  const seller = users.find(u => u.id === listing?.seller_id);
  const category = categories.find(c => c.id === listing?.category_id);

  if (!listing) {
    return (
      <div>
        <Navbar />
        <main className="max-w-4xl mx-auto p-6">
          <p>Listing not found</p>
          <Link to="/listings" className="text-brand-600 hover:underline">Back to Listings</Link>
        </main>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <main className="max-w-4xl mx-auto p-6">
        <Link to="/listings" className="text-brand-600 hover:underline mb-4 inline-block">← Back to Listings</Link>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div className="h-80 bg-gray-200 rounded-lg"></div>
          <div>
            <h1 className="text-2xl font-bold mb-2">{listing.title}</h1>
            <p className="text-3xl font-bold text-brand-600 mb-4">${listing.price.toFixed(2)}</p>
            <p className="text-sm text-gray-500 mb-4">Condition: Good • Category: {category?.name}</p>
            <p className="mb-6">{listing.description}</p>
            
            <div className="border-t pt-4 mb-6">
              <p className="font-medium">Seller: <Link to={`/profile/${seller?.id}`} className="text-brand-600 hover:underline">{seller?.full_name}</Link></p>
              <p className="text-sm text-gray-500">Verified student • {seller?.avg_rating} ★ (12 reviews)</p>
            </div>

            <div className="flex gap-3">
              <Link to="/messages/1" className="flex-1 bg-brand-600 text-white py-2 px-4 rounded hover:bg-brand-700 text-center">Message Seller</Link>
              <button className="flex-1 border border-brand-600 text-brand-600 py-2 px-4 rounded hover:bg-brand-50">Make Offer</button>
              <button className="py-2 px-4 rounded border hover:bg-gray-50">♥ Favorite</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
