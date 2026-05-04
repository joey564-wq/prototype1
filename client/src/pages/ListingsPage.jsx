import Navigation from '../components/Navigation.jsx';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { listingsAPI } from '../lib/api.js';
import Button from '../components/Button.jsx';
import Badge from '../components/Badge.jsx';
import Card from '../components/Card.jsx';
import { Select } from '../components/Input.jsx';
import ListingDetailModal from '../components/ListingDetailModal.jsx';

export default function ListingsPage() {
  const [listings, setListings] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedListingId, setSelectedListingId] = useState(null);
  const [error, setError] = useState(null);
  
  // Input state (what user is typing/selecting)
  const [searchInput, setSearchInput] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedConditions, setSelectedConditions] = useState([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  
  // Submitted state (what was last searched)
  const [submittedFilters, setSubmittedFilters] = useState({
    search: '',
    categories: [],
    conditions: [],
    minPrice: '',
    maxPrice: '',
    sortBy: 'newest'
  });

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const data = await listingsAPI.getAll();
        let filteredListings = data.listings || [];
        
        // Apply submitted filters
        if (submittedFilters.search) {
          filteredListings = filteredListings.filter(l => 
            l.title.toLowerCase().includes(submittedFilters.search.toLowerCase())
          );
        }
        
        if (submittedFilters.categories.length > 0) {
          filteredListings = filteredListings.filter(l => 
            submittedFilters.categories.includes(l.categories?.name)
          );
        }
        
        if (submittedFilters.conditions.length > 0) {
          filteredListings = filteredListings.filter(l => 
            submittedFilters.conditions.includes(l.condition)
          );
        }
        
        if (submittedFilters.minPrice) {
          filteredListings = filteredListings.filter(l => 
            l.price >= parseFloat(submittedFilters.minPrice)
          );
        }
        
        if (submittedFilters.maxPrice) {
          filteredListings = filteredListings.filter(l => 
            l.price <= parseFloat(submittedFilters.maxPrice)
          );
        }
        
        // Apply sorting
        switch (submittedFilters.sortBy) {
          case 'newest':
            filteredListings.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            break;
          case 'price_low':
            filteredListings.sort((a, b) => a.price - b.price);
            break;
          case 'price_high':
            filteredListings.sort((a, b) => b.price - a.price);
            break;
          case 'top_rated':
            filteredListings.sort((a, b) => (b.users?.avg_rating || 0) - (a.users?.avg_rating || 0));
            break;
        }
        
        setListings(filteredListings);
        const uniqueCategories = [...new Set(data.listings?.map(l => l.categories?.name).filter(Boolean))];
        setCategories(uniqueCategories);
      } catch (err) {
        setError('Failed to load listings');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [submittedFilters]);

  const handleSearch = () => {
    setSubmittedFilters({
      search: searchInput,
      categories: selectedCategories,
      conditions: selectedConditions,
      minPrice,
      maxPrice,
      sortBy
    });
  };

  const handleClearFilters = () => {
    setSearchInput('');
    setSelectedCategories([]);
    setSelectedConditions([]);
    setMinPrice('');
    setMaxPrice('');
    setSortBy('newest');
    setSubmittedFilters({
      search: '',
      categories: [],
      conditions: [],
      minPrice: '',
      maxPrice: '',
      sortBy: 'newest'
    });
  };

  const toggleCategory = (cat) => {
    setSelectedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const toggleCondition = (cond) => {
    setSelectedConditions(prev => 
      prev.includes(cond) ? prev.filter(c => c !== cond) : [...prev, cond]
    );
  };

  if (loading) return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-center py-12">
          <svg className="animate-spin h-8 w-8 text-brand-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      </main>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-danger-50 border border-danger-200 rounded-lg p-6 text-center">
          <p className="text-danger-600">{error}</p>
        </div>
      </main>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Browse Listings</h1>
            <p className="text-gray-500">{listings.length} items available</p>
          </div>
          <Link to="/listings/new">
            <Button>+ Create Listing</Button>
          </Link>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <div className="p-4 space-y-4">
            {/* Search Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <input
                type="text"
                placeholder="Search listings..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              />
            </div>

            {/* Categories Checkboxes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Categories</label>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <label key={cat} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat)}
                      onChange={() => toggleCategory(cat)}
                      className="rounded border-gray-300 text-brand-600 focus:ring-brand-500"
                    />
                    <span className="text-sm text-gray-700">{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Condition Checkboxes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Condition</label>
              <div className="flex flex-wrap gap-2">
                {['New', 'Like New', 'Good', 'Fair', 'Poor'].map((cond) => (
                  <label key={cond} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedConditions.includes(cond.toLowerCase().replace(' ', '_'))}
                      onChange={() => toggleCondition(cond.toLowerCase().replace(' ', '_'))}
                      className="rounded border-gray-300 text-brand-600 focus:ring-brand-500"
                    />
                    <span className="text-sm text-gray-700">{cond}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Min Price</label>
                <input
                  type="number"
                  placeholder="0"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Max Price</label>
                <input
                  type="number"
                  placeholder="Any"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Sort */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
              <Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full"
              >
                <option value="newest">Newest First</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
                <option value="top_rated">Top Rated</option>
              </Select>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <Button onClick={handleSearch} className="flex-1">Search</Button>
              <Button variant="secondary" onClick={handleClearFilters} className="flex-1">Clear Filters</Button>
            </div>
          </div>
        </Card>

        {/* Listings Grid */}
        {listings.length === 0 ? (
          <div className="text-center py-12">
            <svg className="mx-auto w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No listings found</h3>
            <p className="text-gray-500 mb-4">Be the first to list an item!</p>
            <Link to="/listings/new">
              <Button>Create Listing</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map(listing => (
              <div key={listing.id} onClick={() => setSelectedListingId(listing.id)} className="cursor-pointer">
                <Card hover className="overflow-hidden">
                  <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center group-hover:from-brand-50 group-hover:to-brand-100 transition-all relative">
                    <Badge 
                      variant={listing.status === 'sold' ? 'danger' : 'success'} 
                      className="absolute top-3 left-3"
                    >
                      {listing.status === 'sold' ? 'Sold' : 'Available'}
                    </Badge>
                    <svg className="w-16 h-16 text-gray-400 group-hover:text-brand-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">{listing.title}</h3>
                    <p className="text-sm text-gray-500 mb-3">{listing.categories?.name}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-xl font-bold text-brand-600">${listing.price?.toFixed(2)}</p>
                      <p className="text-xs text-gray-400">{listing.users?.full_name}</p>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        )}
      </main>
      
      <ListingDetailModal 
        isOpen={!!selectedListingId}
        onClose={() => setSelectedListingId(null)}
        listingId={selectedListingId}
      />
    </div>
  );
}
