import Navbar from '../components/Navbar.jsx';
import { Link } from 'react-router-dom';

export default function ListingsPage() {
  return (
    <div>
      <Navbar />
      <main className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Browse Listings</h1>

        <div className="mb-6 flex gap-4 flex-wrap">
          <select className="p-2 border rounded">
            <option>All Categories</option>
            <option>Textbooks</option>
            <option>Electronics</option>
            <option>Furniture</option>
            <option>School Supplies</option>
          </select>
          <select className="p-2 border rounded">
            <option>Any Condition</option>
            <option>New</option>
            <option>Like New</option>
            <option>Good</option>
            <option>Fair</option>
            <option>Poor</option>
          </select>
          <input type="number" placeholder="Min Price" className="p-2 border rounded w-24" />
          <input type="number" placeholder="Max Price" className="p-2 border rounded w-24" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link to="/listings/1" className="border rounded-lg p-4 hover:shadow-lg transition">
            <div className="h-40 bg-gray-200 rounded mb-2"></div>
            <h3 className="font-medium">Calculus Early Transcendentals (8th Edition)</h3>
            <p className="text-sm text-gray-500">Good condition</p>
            <p className="text-brand-600 font-bold mt-2">$45.00</p>
            <p className="text-xs text-gray-400 mt-1">Jane Doe</p>
          </Link>
          <Link to="/listings/2" className="border rounded-lg p-4 hover:shadow-lg transition">
            <div className="h-40 bg-gray-200 rounded mb-2"></div>
            <h3 className="font-medium">Apple AirPods Pro (2nd Gen)</h3>
            <p className="text-sm text-gray-500">Like new</p>
            <p className="text-brand-600 font-bold mt-2">$180.00</p>
            <p className="text-xs text-gray-400 mt-1">John Smith</p>
          </Link>
          <Link to="/listings/3" className="border rounded-lg p-4 hover:shadow-lg transition">
            <div className="h-40 bg-gray-200 rounded mb-2"></div>
            <h3 className="font-medium">IKEA Desk Lamp</h3>
            <p className="text-sm text-gray-500">Good condition</p>
            <p className="text-brand-600 font-bold mt-2">$25.00</p>
            <p className="text-xs text-gray-400 mt-1">Bob Wilson</p>
          </Link>
        </div>
      </main>
    </div>
  );
}
