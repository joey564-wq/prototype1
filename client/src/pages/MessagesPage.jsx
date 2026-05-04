import Navigation from '../components/Navigation.jsx';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { messagesAPI } from '../lib/api.js';
import { useAuth } from '../contexts/AuthContext.jsx';
import Card from '../components/Card.jsx';
import Button from '../components/Button.jsx';

export default function MessagesPage() {
  const { user, isAuthenticated } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isAuthenticated || !user?.id) {
      setLoading(false);
      return;
    }
    async function loadConversations() {
      try {
        setLoading(true);
        const data = await messagesAPI.getConversations(user.id);
        setConversations(data || []);
      } catch (err) {
        setError('Failed to load conversations');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadConversations();
  }, [isAuthenticated, user?.id]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Messages</h1>
          <p className="text-gray-500 mb-4">Please sign in to view your messages.</p>
          <Link to="/login">
            <Button>Sign In</Button>
          </Link>
        </main>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center py-12">
            <svg className="animate-spin h-8 w-8 text-brand-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Messages</h1>

        {conversations.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <svg className="mx-auto w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No messages yet</h3>
            <p className="text-gray-500 mb-4">Start a conversation with a seller to discuss an item</p>
            <Link to="/listings">
              <Button>Browse Listings</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {conversations.map(conv => (
              <Link key={conv.conversation_id} to={`/messages/${conv.conversation_id}`}>
                <Card hover className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-gray-900">{conv.other_user?.full_name || 'Unknown'}</h3>
                        <span className="text-xs text-gray-400">
                          {conv.last_message?.created_at
                            ? new Date(conv.last_message.created_at).toLocaleDateString()
                            : ''}
                        </span>
                      </div>
                      <p className="text-sm text-brand-600 mb-1">{conv.listing?.title || 'Listing'}</p>
                      <p className="text-sm text-gray-600 truncate">{conv.last_message?.message_text || ''}</p>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
