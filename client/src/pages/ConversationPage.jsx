import Navbar from '../components/Navbar.jsx';
import { Link, useParams } from 'react-router-dom';
import { conversations, users, listings, messages } from '../lib/mockData.js';

export default function ConversationPage() {
  const { conversationId } = useParams();
  const conversation = conversations.find(c => c.id === parseInt(conversationId));
  const listing = listings.find(l => l.id === conversation?.listing_id);
  const seller = users.find(u => u.id === conversation?.seller_id);
  const conversationMessages = messages.filter(m => m.conversation_id === parseInt(conversationId));

  if (!conversation) {
    return (
      <div>
        <Navbar />
        <main className="max-w-2xl mx-auto p-6">
          <p>Conversation not found</p>
          <Link to="/messages" className="text-brand-600 hover:underline">Back to Messages</Link>
        </main>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <main className="max-w-2xl mx-auto p-6">
        <Link to="/messages" className="text-brand-600 hover:underline mb-4 inline-block">← Back to Messages</Link>
        
        <div className="border rounded-lg mt-4">
          <div className="p-4 border-b bg-gray-50">
            <h2 className="font-medium">{seller?.full_name}</h2>
            <p className="text-sm text-gray-500">{listing?.title} • ${listing?.price.toFixed(2)}</p>
          </div>

          <div className="p-4 space-y-4 min-h-64">
            {conversationMessages.map(msg => {
              const isCurrentUser = msg.sender_id === 2; // Mock current user
              const sender = users.find(u => u.id === msg.sender_id);
              return (
                <div key={msg.id} className={`flex gap-3 ${isCurrentUser ? 'justify-end' : ''}`}>
                  {!isCurrentUser && <div className="w-8 h-8 bg-gray-300 rounded-full flex-shrink-0"></div>}
                  <div className={`${isCurrentUser ? 'bg-brand-600 text-white' : 'bg-gray-100'} rounded-lg p-3 max-w-xs`}>
                    <p>{msg.message_text}</p>
                    <span className={`text-xs mt-1 block ${isCurrentUser ? 'text-brand-200' : 'text-gray-400'}`}>
                      {new Date(msg.sent_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  {isCurrentUser && <div className="w-8 h-8 bg-brand-300 rounded-full flex-shrink-0"></div>}
                </div>
              );
            })}
          </div>

          <div className="p-4 border-t">
            <div className="flex gap-2">
              <input type="text" className="flex-1 p-2 border rounded" placeholder="Type a message..." />
              <button className="bg-brand-600 text-white px-4 py-2 rounded hover:bg-brand-700">Send</button>
            </div>
          </div>
        </div>

        <div className="mt-4 border rounded-lg p-4">
          <h3 className="font-medium mb-2">Make an Offer</h3>
          <div className="flex gap-2">
            <input type="number" placeholder="Your offer" className="flex-1 p-2 border rounded" />
            <button className="bg-brand-600 text-white px-4 py-2 rounded hover:bg-brand-700">Send Offer</button>
          </div>
        </div>
      </main>
    </div>
  );
}
