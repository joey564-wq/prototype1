import Navigation from '../components/Navigation.jsx';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { messagesAPI } from '../lib/api.js';
import { useAuth } from '../contexts/AuthContext.jsx';
import Card from '../components/Card.jsx';
import Button from '../components/Button.jsx';
import Input from '../components/Input.jsx';

export default function ConversationPage() {
  const { conversationId } = useParams();
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [listing, setListing] = useState(null);
  const [otherUser, setOtherUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [messageText, setMessageText] = useState('');
  const [messageError, setMessageError] = useState('');
  const [offerAmount, setOfferAmount] = useState('');
  const [offerError, setOfferError] = useState('');
  const [offerSuccess, setOfferSuccess] = useState('');

  useEffect(() => {
    if (!conversationId || !user?.id) return;
    async function loadMessages() {
      try {
        setLoading(true);
        const data = await messagesAPI.getMessages(conversationId);
        setMessages(data || []);
        // Derive listing and other user from first message
        if (data && data.length > 0) {
          const firstMsg = data[0];
          // Try to get listing info from enriched messages if available
          // For now, we need to fetch listing separately - let's do basic inference
          const otherId = firstMsg.sender_id === user.id ? firstMsg.recipient_id : firstMsg.sender_id;
          setOtherUser({ id: otherId, full_name: 'User ' + otherId });
        }
      } catch (err) {
        setError('Failed to load messages');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadMessages();
  }, [conversationId, user?.id]);

  const handleSendMessage = async (e) => {
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

    // Derive recipient from conversationId format: conv-listingId-userA-userB
    const parts = conversationId.split('-');
    if (parts.length === 4 && parts[0] === 'conv' && user?.id) {
      const userA = parseInt(parts[2]);
      const userB = parseInt(parts[3]);
      const listingId = parseInt(parts[1]);
      const recipientId = userA === user.id ? userB : userA;
      try {
        const newMsg = await messagesAPI.sendMessage(user.id, recipientId, listingId, messageText.trim());
        setMessages(prev => [...prev, newMsg]);
        setMessageText('');
      } catch (err) {
        setMessageError('Failed to send message');
        console.error(err);
      }
    }
  };

  const handleSendOffer = async (e) => {
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

    const parts = conversationId.split('-');
    if (parts.length === 4 && parts[0] === 'conv' && user?.id) {
      const userA = parseInt(parts[2]);
      const userB = parseInt(parts[3]);
      const listingId = parseInt(parts[1]);
      const recipientId = userA === user.id ? userB : userA;
      const messageText = `I'd like to offer $${amount.toFixed(2)} for this item.`;
      try {
        const newMsg = await messagesAPI.sendMessage(user.id, recipientId, listingId, messageText);
        setMessages(prev => [...prev, newMsg]);
        setOfferAmount('');
        setOfferSuccess('Offer sent!');
        setTimeout(() => setOfferSuccess(''), 3000);
      } catch (err) {
        setOfferError('Failed to send offer');
        console.error(err);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="max-w-3xl mx-auto px-4 py-8">
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

  if (error || messages.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="max-w-3xl mx-auto px-4 py-8">
          <div className="bg-danger-50 border border-danger-200 rounded-lg p-6 text-center">
            <p className="text-danger-600">{error || 'Conversation not found'}</p>
            <Link to="/messages" className="text-brand-600 hover:underline mt-2 inline-block">Back to Messages</Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
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
              <h2 className="font-semibold text-gray-900">{otherUser?.full_name || 'User'}</h2>
              <p className="text-sm text-gray-500">Conversation</p>
            </div>
          </div>

          <div className="p-4 space-y-4 min-h-96 max-h-96 overflow-y-auto">
            {messages.map(msg => {
              const isCurrentUser = msg.sender_id === user?.id;
              const time = msg.created_at || msg.sent_at;
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
                    <div className="flex items-center justify-between mt-1">
                      <span className={`text-xs ${isCurrentUser ? 'text-brand-200' : 'text-gray-400'}`}>
                        {time ? new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                      </span>
                      {isCurrentUser && (
                        <span className="text-xs ml-2 text-brand-200">
                          {msg.read_status ? '✓✓' : '✓'}
                        </span>
                      )}
                    </div>
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
            
            {/* Quick Replies */}
            <div className="flex flex-wrap gap-2 mt-3">
              {['Is this still available?', 'Can you lower the price?', 'When can we meet?', 'I\'m interested', 'What\'s the condition?'].map((reply) => (
                <button
                  key={reply}
                  type="button"
                  onClick={() => setMessageText(reply)}
                  className="text-xs px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 transition-colors"
                >
                  {reply}
                </button>
              ))}
            </div>
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
          {offerSuccess && <p className="text-sm text-green-600 mt-2">{offerSuccess}</p>}
        </Card>
      </main>
    </div>
  );
}
