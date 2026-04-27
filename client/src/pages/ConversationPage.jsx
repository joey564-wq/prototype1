import Navbar from '../components/Navbar.jsx';
import { Link, useParams, useState } from 'react-router-dom';
import { conversations, users, listings, messages } from '../lib/mockData.js';

export default function ConversationPage() {
  const { conversationId } = useParams();
  const conversation = conversations.find(c => c.id === parseInt(conversationId));
  const listing = listings.find(l => l.id === conversation?.listing_id);
  const seller = users.find(u => u.id === conversation?.seller_id);
  const conversationMessages = messages.filter(m => m.conversation_id === parseInt(conversationId));
  const [messageText, setMessageText] = useState('');
  const [messageError, setMessageError] = useState('');
  const [offerAmount, setOfferAmount] = useState('');
  const [offerError, setOfferError] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageText.trim()) {
      setMessageError('Message cannot be empty');
      return;
    }
    if (messageText.length > 1000) {
      setMessageError('Message is too long (max 1000 characters)');
      return;
    }
    setMessageError('');
    console.log('Message sent:', messageText);
    setMessageText('');
  };

  const handleSendOffer = (e) => {
    e.preventDefault();
    if (!offerAmount) {
      setOfferError('Please enter an offer amount');
      return;
    }
    const amount = parseFloat(offerAmount);
    if (isNaN(amount) || amount <= 0) {
      setOfferError('Offer must be a positive number');
      return;
    }
    if (amount > 1000000) {
      setOfferError('Offer is too high');
      return;
    }
    setOfferError('');
    console.log('Offer sent:', amount);
    setOfferAmount('');
  };

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
              const isCurrentUser = msg.sender_id === 2;
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
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                type="text"
                className={`flex-1 p-2 border rounded ${messageError ? 'border-red-500' : ''}`}
                placeholder="Type a message..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
              />
              <button type="submit" className="bg-brand-600 text-white px-4 py-2 rounded hover:bg-brand-700">Send</button>
            </form>
            {messageError && <p className="text-red-500 text-sm mt-1">{messageError}</p>}
          </div>
        </div>

        <div className="mt-4 border rounded-lg p-4">
          <h3 className="font-medium mb-2">Make an Offer</h3>
          <form onSubmit={handleSendOffer} className="flex gap-2">
            <input
              type="number"
              className={`flex-1 p-2 border rounded ${offerError ? 'border-red-500' : ''}`}
              placeholder="Your offer"
              min="0"
              step="0.01"
              value={offerAmount}
              onChange={(e) => setOfferAmount(e.target.value)}
            />
            <button type="submit" className="bg-brand-600 text-white px-4 py-2 rounded hover:bg-brand-700">Send Offer</button>
          </form>
          {offerError && <p className="text-red-500 text-sm mt-1">{offerError}</p>}
        </div>
      </main>
    </div>
  );
}
