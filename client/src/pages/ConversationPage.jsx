import Navbar from '../components/Navbar.jsx';
import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import { conversations, users, listings, messages } from '../lib/mockData.js';
import Card from '../components/Card.jsx';
import Button from '../components/Button.jsx';
import Input from '../components/Input.jsx';

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
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-3xl mx-auto px-4 py-8">
          <div className="bg-danger-50 border border-danger-200 rounded-lg p-6 text-center">
            <p className="text-danger-600">Conversation not found</p>
            <Link to="/messages" className="text-brand-600 hover:underline mt-2 inline-block">Back to Messages</Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/messages" className="text-brand-600 hover:underline inline-flex items-center gap-1 mb-4">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Messages
        </Link>
        
        {/* Chat Card */}
        <Card className="mb-4">
          <div className="p-4 border-b bg-gray-50 flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-100 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">{seller?.full_name}</h2>
              <p className="text-sm text-gray-500">{listing?.title} • ${listing?.price.toFixed(2)}</p>
            </div>
          </div>

          <div className="p-4 space-y-4 min-h-96 max-h-96 overflow-y-auto">
            {conversationMessages.map(msg => {
              const isCurrentUser = msg.sender_id === 2;
              return (
                <div key={msg.id} className={`flex gap-3 ${isCurrentUser ? 'justify-end' : ''}`}>
                  {!isCurrentUser && (
                    <div className="w-8 h-8 bg-brand-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  )}
                  <div className={`${isCurrentUser ? 'bg-brand-600 text-white' : 'bg-gray-100 text-gray-900'} rounded-2xl px-4 py-3 max-w-xs`}>
                    <p className="text-sm">{msg.message_text}</p>
                    <span className={`text-xs mt-1 block ${isCurrentUser ? 'text-brand-200' : 'text-gray-400'}`}>
                      {new Date(msg.sent_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  {isCurrentUser && (
                    <div className="w-8 h-8 bg-brand-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="p-4 border-t">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <Input
                placeholder="Type a message..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                error={messageError}
                className="flex-1"
              />
              <Button type="submit">Send</Button>
            </form>
          </div>
        </Card>

        {/* Offer Card */}
        <Card className="p-4">
          <h3 className="font-semibold text-gray-900 mb-3">Make an Offer</h3>
          <form onSubmit={handleSendOffer} className="flex gap-2">
            <Input
              type="number"
              placeholder="Your offer"
              min="0"
              step="0.01"
              value={offerAmount}
              onChange={(e) => setOfferAmount(e.target.value)}
              error={offerError}
              className="flex-1"
            />
            <Button type="submit">Send Offer</Button>
          </form>
        </Card>
      </main>
    </div>
  );
}
