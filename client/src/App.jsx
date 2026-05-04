import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext.jsx';
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import ListingsPage from './pages/ListingsPage.jsx';
import ListingDetailPage from './pages/ListingDetailPage.jsx';
import CreateListingPage from './pages/CreateListingPage.jsx';
import FavoritesPage from './pages/FavoritesPage.jsx';
import MessagesPage from './pages/MessagesPage.jsx';
import ConversationPage from './pages/ConversationPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import MyProfilePage from './pages/MyProfilePage.jsx';

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/listings" element={<ListingsPage />} />
      <Route path="/listings/:id" element={<ListingDetailPage />} />
      <Route path="/listings/new" element={<ProtectedRoute><CreateListingPage /></ProtectedRoute>} />
      <Route path="/favorites" element={<ProtectedRoute><FavoritesPage /></ProtectedRoute>} />
      <Route path="/messages" element={<ProtectedRoute><MessagesPage /></ProtectedRoute>} />
      <Route path="/messages/:conversationId" element={<ProtectedRoute><ConversationPage /></ProtectedRoute>} />
      <Route path="/profile/:userId" element={<ProfilePage />} />
      <Route path="/profile/me" element={<ProtectedRoute><MyProfilePage /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
