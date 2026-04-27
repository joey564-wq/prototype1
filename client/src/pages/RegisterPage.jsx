import Navbar from '../components/Navbar.jsx';
import { Link } from 'react-router-dom';

export default function RegisterPage() {
  return (
    <div>
      <Navbar />
      <main className="max-w-md mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
        
        <form className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Full Name</label>
            <input type="text" className="w-full p-2 border rounded" placeholder="Jane Doe" />
          </div>
          <div>
            <label className="block font-medium mb-1">Chico State Email</label>
            <input type="email" className="w-full p-2 border rounded" placeholder="your.email@csuchico.edu" />
            <p className="text-xs text-gray-500 mt-1">Must end in @csuchico.edu or @mail.csuchico.edu</p>
          </div>
          <div>
            <label className="block font-medium mb-1">Password</label>
            <input type="password" className="w-full p-2 border rounded" placeholder="••••••••" />
          </div>
          <div>
            <label className="block font-medium mb-1">Confirm Password</label>
            <input type="password" className="w-full p-2 border rounded" placeholder="••••••••" />
          </div>
          <button type="submit" className="w-full bg-brand-600 text-white py-2 px-4 rounded hover:bg-brand-700">Create Account</button>
        </form>

        <p className="mt-4 text-center text-gray-500">
          Already have an account? <Link to="/login" className="text-brand-600 hover:underline">Sign In</Link>
        </p>
      </main>
    </div>
  );
}
