import Navbar from '../components/Navbar.jsx';
import { Link, useParams } from 'react-router-dom';

export default function ProfilePage() {
  const { userId } = useParams();

  return (
    <div>
      <Navbar />
      <main className="max-w-4xl mx-auto p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 bg-gray-300 rounded-full"></div>
          <div>
            <h1 className="text-2xl font-bold">Jane Doe</h1>
            <p className="text-gray-500">jane.doe@example.com</p>
            <p className="text-sm text-brand-600">Verified Student • 4.8 ★ (12 reviews)</p>
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-4">Active Listings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <Link to="/listings/1" className="border rounded-lg p-4 hover:shadow-lg transition">
            <div className="h-32 bg-gray-200 rounded mb-2"></div>
            <h3 className="font-medium">Calculus Early Transcendentals</h3>
            <p className="text-brand-600 font-bold">$45.00</p>
          </Link>
        </div>

        <h2 className="text-xl font-semibold mb-4">Recent Reviews</h2>
        <div className="space-y-3">
          <div className="border rounded-lg p-4">
            <div className="flex justify-between">
              <Link to="/profile/2" className="font-medium text-brand-600 hover:underline">John Smith</Link>
              <p className="text-yellow-500">★★★★★</p>
            </div>
            <p className="text-sm text-gray-600 mt-1">Great seller! Item was exactly as described.</p>
          </div>
          <div className="border rounded-lg p-4">
            <div className="flex justify-between">
              <Link to="/profile/3" className="font-medium text-brand-600 hover:underline">Bob Wilson</Link>
              <p className="text-yellow-500">★★★★☆</p>
            </div>
            <p className="text-sm text-gray-600 mt-1">Smooth transaction, would buy again.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
