import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';

export default function Navigation() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: '🏠', requiresAuth: false },
    { path: '/listings', label: 'Browse', icon: '🔍', requiresAuth: false },
    { path: '/favorites', label: 'Favorites', icon: '❤️', requiresAuth: true },
    { path: '/messages', label: 'Messages', icon: '💬', requiresAuth: true },
    { path: '/profile/me', label: 'Profile', icon: '👤', requiresAuth: true },
  ];

  const handleProtectedNav = (e, path) => {
    if (!isAuthenticated) {
      e.preventDefault();
      window.location.href = '/login';
    }
  };

  return (
    <>
      {/* Desktop Top Navigation */}
      <nav className="hidden md:flex bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-lg">🎓</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Campus Exchange</span>
            </Link>
            
            <div className="flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={(e) => item.requiresAuth && handleProtectedNav(e, item.path)}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    location.pathname === item.path
                      ? 'bg-brand-50 text-brand-600'
                      : 'text-gray-600 hover:text-brand-600 hover:bg-brand-50'
                  } ${!isAuthenticated && item.requiresAuth ? 'opacity-50' : ''}`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Tab Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 shadow-lg">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={(e) => item.requiresAuth && handleProtectedNav(e, item.path)}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                location.pathname === item.path
                  ? 'text-brand-600'
                  : !isAuthenticated && item.requiresAuth
                  ? 'text-gray-300'
                  : 'text-gray-500'
              }`}
            >
              <span className="text-xl mb-1">{item.icon}</span>
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>

      {/* Spacer for mobile bottom nav */}
      <div className="md:hidden h-16" />
    </>
  );
}
