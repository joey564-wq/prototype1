import Navbar from '../components/Navbar.jsx';
import { Link, useState } from 'react-router-dom';

export default function RegisterPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!fullName) newErrors.fullName = 'Full name is required';
    if (!email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Invalid email format';
    else if (!email.endsWith('@csuchico.edu') && !email.endsWith('@mail.csuchico.edu')) {
      newErrors.email = 'Must use a Chico State email';
    }
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (!confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
    else if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Register submitted:', { fullName, email });
    }
  };

  return (
    <div>
      <Navbar />
      <main className="max-w-md mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
        
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block font-medium mb-1">Full Name</label>
            <input
              type="text"
              className={`w-full p-2 border rounded ${errors.fullName ? 'border-red-500' : ''}`}
              placeholder="Jane Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
          </div>
          <div>
            <label className="block font-medium mb-1">Chico State Email</label>
            <input
              type="email"
              className={`w-full p-2 border rounded ${errors.email ? 'border-red-500' : ''}`}
              placeholder="your.email@csuchico.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <p className="text-xs text-gray-500 mt-1">Must end in @csuchico.edu or @mail.csuchico.edu</p>
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          <div>
            <label className="block font-medium mb-1">Password</label>
            <input
              type="password"
              className={`w-full p-2 border rounded ${errors.password ? 'border-red-500' : ''}`}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>
          <div>
            <label className="block font-medium mb-1">Confirm Password</label>
            <input
              type="password"
              className={`w-full p-2 border rounded ${errors.confirmPassword ? 'border-red-500' : ''}`}
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
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
