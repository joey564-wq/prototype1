import Navigation from '../components/Navigation.jsx';
import { Link } from 'react-router-dom';
import { conversations, users, listings, messages } from '../lib/mockData.js';
import Card from '../components/Card.jsx';

export default function MessagesPage() {
  const currentUserId = 2;
  const userConversations = conversations.filter(
    c => c.buyer_id === currentUserId || c.seller_id === currentUserId
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Messages</h1>

        {userConversations.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <svg className="mx-auto w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No messages yet</h3>
            <p className="text-gray-500 mb-4">Start a conversation with a seller to discuss an item</p>
            <Link to="/listings">
              <button className="bg-brand-600 text-white py-2 px-4 rounded-lg hover:bg-brand-700">Browse Listings</button>
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {userConversations.map(conv => {
              const otherUser = users.find(u => u.id === (conv.buyer_id === currentUserId ? conv.seller_id : conv.buyer_id));
              const listing = listings.find(l => l.id === conv.listing_id);
              const lastMessage = messages.filter(m => m.conversation_id === conv.id).pop();

              return (
                <Link key={conv.id} to={`/messages/${conv.id}`}>
                  <Card hover className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold text-gray-900">{otherUser?.full_name}</h3>
                          <span className="text-xs text-gray-400">2m ago</span>
                        </div>
                        <p className="text-sm text-brand-600 mb-1">{listing?.title}</p>
                        <p className="text-sm text-gray-600 truncate">{lastMessage?.message_text}</p>
                      </div>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
