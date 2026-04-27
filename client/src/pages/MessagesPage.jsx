import Navbar from '../components/Navbar.jsx';
import { Link } from 'react-router-dom';

export default function MessagesPage() {
  return (
    <div>
      <Navbar />
      <main className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Messages</h1>

        <div className="space-y-3">
          <Link to="/messages/1" className="block border rounded-lg p-4 hover:shadow-lg transition">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">Jane Doe</h3>
                <p className="text-sm text-gray-500">Calculus Early Transcendentals (8th Edition)</p>
                <p className="text-sm text-gray-600 mt-1">Hi, is the calculus book still available?</p>
              </div>
              <span className="text-xs text-gray-400">2m ago</span>
            </div>
          </Link>

          <Link to="/messages/2" className="block border rounded-lg p-4 hover:shadow-lg transition">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">John Smith</h3>
                <p className="text-sm text-gray-500">Apple AirPods Pro (2nd Gen)</p>
                <p className="text-sm text-gray-600 mt-1">Would you take $160 for the AirPods?</p>
              </div>
              <span className="text-xs text-gray-400">1h ago</span>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}
