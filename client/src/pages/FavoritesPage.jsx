import Navbar from '../components/Navbar.jsx';
import { Link } from 'react-router-dom';

export default function FavoritesPage() {
  return (
    <div>
      <Navbar />
      <main className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Favorites</h1>
        <p className="text-gray-500 mb-6">3 items saved</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link to="/listings/1" className="border rounded-lg p-4 hover:shadow-lg transition">
            <div className="h-40 bg-gray-200 rounded mb-2"></div>
            <h3 className="font-medium">Calculus Early Transcendentals (8th Edition)</h3>
            <p className="text-brand-600 font-bold mt-2">$45.00</p>
            <p className="text-xs text-gray-400 mt-1">Jane Doe</p>
          </Link>
          <Link to="/listings/2" className="border rounded-lg p-4 hover:shadow-lg transition">
            <div className="h-40 bg-gray-200 rounded mb-2"></div>
            <h3 className="font-medium">Apple AirPods Pro (2nd Gen)</h3>
            <p className="text-brand-600 font-bold mt-2">$180.00</p>
            <p className="text-xs text-gray-400 mt-1">John Smith</p>
          </Link>
          <Link to="/listings/4" className="border rounded-lg p-4 hover:shadow-lg transition">
            <div className="h-40 bg-gray-200 rounded mb-2"></div>
            <h3 className="font-medium">Graphing Calculator TI-84 Plus</h3>
            <p className="text-brand-600 font-bold mt-2">$75.00</p>
            <p className="text-xs text-gray-400 mt-1">Alice Cooper</p>
          </Link>
        </div>
      </main>
    </div>
  );
}
