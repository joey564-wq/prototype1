import Navbar from '../components/Navbar.jsx';
import { Link, useParams } from 'react-router-dom';

export default function ConversationPage() {
  const { conversationId } = useParams();

  return (
    <div>
      <Navbar />
      <main className="max-w-2xl mx-auto p-6">
        <Link to="/messages" className="text-brand-600 hover:underline mb-4 inline-block">← Back to Messages</Link>
        
        <div className="border rounded-lg mt-4">
          <div className="p-4 border-b bg-gray-50">
            <h2 className="font-medium">Jane Doe</h2>
            <p className="text-sm text-gray-500">Calculus Early Transcendentals (8th Edition) • $45.00</p>
          </div>

          <div className="p-4 space-y-4 min-h-64">
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex-shrink-0"></div>
              <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
                <p>Hi, is the calculus book still available?</p>
                <span className="text-xs text-gray-400 mt-1 block">2:30 PM</span>
              </div>
            </div>

            <div className="flex gap-3 justify-end">
              <div className="bg-brand-600 text-white rounded-lg p-3 max-w-xs">
                <p>Yes it is! Would you like to meet up on campus?</p>
                <span className="text-xs text-brand-200 mt-1 block">2:32 PM</span>
              </div>
              <div className="w-8 h-8 bg-brand-300 rounded-full flex-shrink-0"></div>
            </div>
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
