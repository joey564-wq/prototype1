import Navbar from '../components/Navbar.jsx';
import { Link } from 'react-router-dom';

export default function MyProfilePage() {
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
              <input type="text" className="w-full p-2 border rounded" defaultValue="Jane Doe" />
            </div>
            <div>
              <label className="block font-medium mb-1">Email</label>
              <input type="email" className="w-full p-2 border rounded bg-gray-50" defaultValue="jane.doe@example.com" disabled />
            </div>
            <div>
              <label className="block font-medium mb-1">Bio</label>
              <textarea className="w-full p-2 border rounded h-20" placeholder="Tell others about yourself..."></textarea>
            </div>
            <button type="submit" className="bg-brand-600 text-white py-2 px-4 rounded hover:bg-brand-700">Save Changes</button>
          </form>
        </div>

        <h2 className="text-xl font-semibold mb-4">My Listings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <Link to="/listings/1" className="border rounded-lg p-4 hover:shadow-lg transition">
            <div className="h-32 bg-gray-200 rounded mb-2"></div>
            <h3 className="font-medium">Calculus Early Transcendentals</h3>
            <p className="text-brand-600 font-bold">$45.00</p>
            <p className="text-xs text-green-600 mt-1">● Available</p>
          </Link>
        </div>

        <div className="flex gap-3">
          <button className="border py-2 px-4 rounded hover:bg-gray-50">Sign Out</button>
          <button className="border border-red-500 text-red-500 py-2 px-4 rounded hover:bg-red-50">Delete Account</button>
        </div>
      </main>
    </div>
  );
}
