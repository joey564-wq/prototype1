import Navbar from '../components/Navbar.jsx';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div>
      <Navbar />
      <main className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-brand-600 mb-4">Campus Exchange</h1>
        <p className="text-gray-600 mb-8">Buy and sell within the Chico State community.</p>

        <div className="mb-8">
          <Link to="/listings/new" className="inline-block bg-brand-600 text-white py-2 px-4 rounded hover:bg-brand-700">+ Create Listing</Link>
        </div>

        <div className="mb-8">
          <input
            type="text"
            placeholder="Search listings..."
            className="w-full max-w-md p-3 border border-gray-300 rounded-lg"
          />
        </div>

        <h2 className="text-xl font-semibold mb-4">Featured Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Link to="/listings" className="p-4 bg-gray-100 rounded-lg text-center hover:bg-gray-200">Textbooks</Link>
          <Link to="/listings" className="p-4 bg-gray-100 rounded-lg text-center hover:bg-gray-200">Electronics</Link>
          <Link to="/listings" className="p-4 bg-gray-100 rounded-lg text-center hover:bg-gray-200">Furniture</Link>
          <Link to="/listings" className="p-4 bg-gray-100 rounded-lg text-center hover:bg-gray-200">School Supplies</Link>
        </div>

        <h2 className="text-xl font-semibold mb-4">Recent Listings</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link to="/listings/1" className="border rounded-lg p-4 hover:shadow-lg transition">
            <div className="h-32 bg-gray-200 rounded mb-2"></div>
            <h3 className="font-medium">Calculus Textbook</h3>
            <p className="text-brand-600 font-bold">$45.00</p>
          </Link>
          <Link to="/listings/2" className="border rounded-lg p-4 hover:shadow-lg transition">
            <div className="h-32 bg-gray-200 rounded mb-2"></div>
            <h3 className="font-medium">Apple AirPods Pro</h3>
            <p className="text-brand-600 font-bold">$180.00</p>
          </Link>
          <Link to="/listings/3" className="border rounded-lg p-4 hover:shadow-lg transition">
            <div className="h-32 bg-gray-200 rounded mb-2"></div>
            <h3 className="font-medium">IKEA Desk Lamp</h3>
            <p className="text-brand-600 font-bold">$25.00</p>
          </Link>
        </div>
      </main>
    </div>
  );
}
