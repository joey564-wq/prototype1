import { Routes, Route, Navigate } from 'react-router-dom';
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

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/listings" element={<ListingsPage />} />
      <Route path="/listings/:id" element={<ListingDetailPage />} />
      <Route path="/listings/new" element={<CreateListingPage />} />
      <Route path="/favorites" element={<FavoritesPage />} />
      <Route path="/messages" element={<MessagesPage />} />
      <Route path="/messages/:conversationId" element={<ConversationPage />} />
      <Route path="/profile/:userId" element={<ProfilePage />} />
      <Route path="/profile/me" element={<MyProfilePage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
