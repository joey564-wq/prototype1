import Navigation from '../components/Navigation.jsx';
import { Link, useState } from 'react';
import Button from '../components/Button.jsx';
import Input, { Select } from '../components/Input.jsx';

export default function RegisterPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [graduationYear, setGraduationYear] = useState('');
  const [major, setMajor] = useState('');
  const [errors, setErrors] = useState({});
  const [showVerification, setShowVerification] = useState(false);

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
    if (!graduationYear) newErrors.graduationYear = 'Graduation year is required';
    if (!major) newErrors.major = 'Major is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Register submitted:', { fullName, email, graduationYear, major });
      setShowVerification(true);
    }
  };

  if (showVerification) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="max-w-md mx-auto px-4 py-12">
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Check Your Email</h1>
            <p className="text-gray-500 mb-6">We've sent a verification link to <strong>{email}</strong>. Please check your Chico State email to verify your account.</p>
            <Link to="/login">
              <Button size="lg" className="w-full">Go to Login</Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
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

            <Select
              label="Graduation Year"
              value={graduationYear}
              onChange={(e) => setGraduationYear(e.target.value)}
              error={errors.graduationYear}
            >
              <option value="">Select graduation year</option>
              {Array.from({ length: 7 }, (_, i) => {
                const year = new Date().getFullYear() + i;
                return <option key={year} value={year}>{year}</option>;
              })}
            </Select>

            <Input
              label="Major"
              placeholder="e.g., Computer Science"
              value={major}
              onChange={(e) => setMajor(e.target.value)}
              error={errors.major}
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
