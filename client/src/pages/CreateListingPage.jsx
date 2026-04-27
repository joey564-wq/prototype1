import Navbar from '../components/Navbar.jsx';
import { Link } from 'react-router-dom';

export default function CreateListingPage() {
  return (
    <div>
      <Navbar />
      <main className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Create Listing</h1>
        
        <form className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Title</label>
            <input type="text" className="w-full p-2 border rounded" placeholder="What are you selling?" />
          </div>

          <div>
            <label className="block font-medium mb-1">Category</label>
            <select className="w-full p-2 border rounded">
              <option>Select a category</option>
              <option>Textbooks</option>
              <option>Electronics</option>
              <option>Furniture</option>
              <option>School Supplies</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">Price ($)</label>
            <input type="number" className="w-full p-2 border rounded" placeholder="0.00" step="0.01" />
          </div>

          <div>
            <label className="block font-medium mb-1">Condition</label>
            <select className="w-full p-2 border rounded">
              <option>Select condition</option>
              <option>New</option>
              <option>Like New</option>
              <option>Good</option>
              <option>Fair</option>
              <option>Poor</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">Description</label>
            <textarea className="w-full p-2 border rounded h-32" placeholder="Describe your item..."></textarea>
          </div>

          <div>
            <label className="block font-medium mb-1">Photos</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center text-gray-500">
              Click or drag to upload photos (up to 6)
            </div>
          </div>

          <div className="flex gap-3">
            <button type="submit" className="flex-1 bg-brand-600 text-white py-2 px-4 rounded hover:bg-brand-700">Publish Listing</button>
            <Link to="/listings" className="flex-1 border py-2 px-4 rounded text-center hover:bg-gray-50">Cancel</Link>
          </div>
        </form>
      </main>
    </div>
  );
}
