import Navbar from '../components/Navbar.jsx';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Button from '../components/Button.jsx';
import Input from '../components/Input.jsx';

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
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-md mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-md p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Create Account</h1>
            <p className="text-gray-500 mt-2">Join the Chico State marketplace</p>
          </div>
          
          <form className="space-y-5" onSubmit={handleSubmit}>
            <Input
              label="Full Name"
              placeholder="Jane Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              error={errors.fullName}
            />
            
            <Input
              label="Chico State Email"
              type="email"
              placeholder="your.email@csuchico.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
            />
            <p className="text-xs text-gray-500">Must end in @csuchico.edu or @mail.csuchico.edu</p>
            
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
            />
            
            <Input
              label="Confirm Password"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={errors.confirmPassword}
            />

            <Button type="submit" size="lg" className="w-full">Create Account</Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-500">
              Already have an account? <Link to="/login" className="text-brand-600 hover:underline font-medium">Sign In</Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
