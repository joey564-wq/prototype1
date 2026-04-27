import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-brand-600 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-xl font-bold">Campus Exchange</Link>
          <div className="flex gap-4 text-sm">
            <Link to="/" className="hover:text-brand-100">Home</Link>
            <Link to="/listings" className="hover:text-brand-100">Browse</Link>
            <Link to="/favorites" className="hover:text-brand-100">Favorites</Link>
            <Link to="/messages" className="hover:text-brand-100">Messages</Link>
            <Link to="/profile/me" className="hover:text-brand-100">Profile</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
