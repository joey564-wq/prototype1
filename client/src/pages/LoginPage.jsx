import Navbar from '../components/Navbar.jsx';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Button from '../components/Button.jsx';
import Input from '../components/Input.jsx';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Invalid email format';
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Login submitted:', { email, password });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-md mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-md p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
            <p className="text-gray-500 mt-2">Sign in to your Campus Exchange account</p>
          </div>
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input
              label="Email"
              type="email"
              placeholder="your.email@csuchico.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
            />
            
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
            />

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded border-gray-300 text-brand-600 focus:ring-brand-500" />
                <span className="text-gray-600">Remember me</span>
              </label>
              <Link to="#" className="text-brand-600 hover:underline">Forgot password?</Link>
            </div>

            <Button type="submit" size="lg" className="w-full">Sign In</Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-500">
              Don't have an account? <Link to="/register" className="text-brand-600 hover:underline font-medium">Sign Up</Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
