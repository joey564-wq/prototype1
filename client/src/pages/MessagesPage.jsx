import Navbar from '../components/Navbar.jsx';
import { Link } from 'react-router-dom';
import { conversations, users, listings, messages } from '../lib/mockData.js';

export default function MessagesPage() {
  // Mock current user ID
  const currentUserId = 2;
  const userConversations = conversations.filter(
    c => c.buyer_id === currentUserId || c.seller_id === currentUserId
  );

  return (
    <div>
      <Navbar />
      <main className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Messages</h1>

        <div className="space-y-3">
          {userConversations.map(conv => {
            const otherUser = users.find(u => u.id === (conv.buyer_id === currentUserId ? conv.seller_id : conv.buyer_id));
            const listing = listings.find(l => l.id === conv.listing_id);
            const lastMessage = messages.filter(m => m.conversation_id === conv.id).pop();

            return (
              <Link key={conv.id} to={`/messages/${conv.id}`} className="block border rounded-lg p-4 hover:shadow-lg transition">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{otherUser?.full_name}</h3>
                    <p className="text-sm text-gray-500">{listing?.title}</p>
                    <p className="text-sm text-gray-600 mt-1">{lastMessage?.message_text}</p>
                  </div>
                  <span className="text-xs text-gray-400">2m ago</span>
                </div>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}
