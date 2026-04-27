import Navbar from '../components/Navbar.jsx';
import { Link } from 'react-router-dom';

export default function LoginPage() {
  return (
    <div>
      <Navbar />
      <main className="max-w-md mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Sign In</h1>
        
        <form className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Email</label>
            <input type="email" className="w-full p-2 border rounded" placeholder="your.email@csuchico.edu" />
          </div>
          <div>
            <label className="block font-medium mb-1">Password</label>
            <input type="password" className="w-full p-2 border rounded" placeholder="••••••••" />
          </div>
          <button type="submit" className="w-full bg-brand-600 text-white py-2 px-4 rounded hover:bg-brand-700">Sign In</button>
        </form>

        <p className="mt-4 text-center text-gray-500">
          Don't have an account? <Link to="/register" className="text-brand-600 hover:underline">Sign Up</Link>
        </p>
      </main>
    </div>
  );
}
