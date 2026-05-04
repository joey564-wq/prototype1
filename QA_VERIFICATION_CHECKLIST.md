# Campus Exchange - QA Verification Checklist

## Phase 1: Navigation Architecture
- [ ] Desktop top navigation displays correctly on screens > 768px
- [ ] Mobile bottom tab bar displays correctly on screens < 768px
- [ ] Navigation items link to correct routes
- [ ] Protected routes (Favorites, Messages, Profile, Create Listing) redirect to login when unauthenticated
- [ ] Active route is highlighted in navigation
- [ ] Mobile bottom tab bar has proper spacing and touch targets

## Phase 2: Authentication and Access Control
- [ ] Registration form requires full name, email, password, confirm password, graduation year, and major
- [ ] Email validation accepts only @csuchico.edu or @mail.csuchico.edu domains
- [ ] Password validation requires minimum 8 characters
- [ ] Email verification screen displays after successful registration
- [ ] Login form accepts email and password
- [ ] Login redirects to profile after successful authentication
- [ ] Email field is read-only in profile edit form
- [ ] AuthContext properly manages user state
- [ ] Logout functionality works correctly

## Phase 3: Listing Creation and Management
- [ ] Create listing form requires title, category, price, condition, description, and at least one photo
- [ ] Image upload shows previews
- [ ] Image upload allows removing images
- [ ] Form validation displays appropriate error messages
- [ ] Listing is successfully created after submission
- [ ] Condition field accepts: New, Like New, Good, Fair, Poor
- [ ] Database schema includes condition field
- [ ] Database schema includes graduation_year and major fields for users

## Phase 4: Search and Browse
- [ ] Search input accepts text for searching listings
- [ ] Category checkboxes allow multiple selections
- [ ] Condition checkboxes allow multiple selections
- [ ] Price range inputs accept min and max values
- [ ] Sort dropdown offers: Newest, Price Low to High, Price High to Low, Top Rated
- [ ] Search button applies filters
- [ ] Clear Filters button resets all filters
- [ ] Filter results update correctly
- [ ] Result count displays accurate number of listings

## Phase 5: Item Detail Modal
- [ ] Clicking a listing card opens modal instead of navigating to page
- [ ] Modal displays listing details correctly
- [ ] Modal close button works
- [ ] Clicking backdrop closes modal
- [ ] Modal shows seller information
- [ ] Modal shows condition badge
- [ ] Modal shows price
- [ ] Modal has action buttons (Message, Make Offer, Add to Favorites)
- [ ] Modal is responsive on mobile

## Phase 6: Messaging
- [ ] Messages page shows list of conversations
- [ ] Conversation page shows chat history
- [ ] Message bubbles show sender/receiver styling
- [ ] Read status indicator (checkmarks) displays correctly
- [ ] Quick reply chips populate message input
- [ ] Message input allows sending messages
- [ ] Offer form allows making offers
- [ ] Database schema uses recipient_id (not receiver_id)
- [ ] Database schema includes read_status field

## Phase 7: Favorites
- [ ] Favorites page displays saved listings
- [ ] Remove button appears on hover on favorite cards
- [ ] Remove button triggers confirmation dialog
- [ ] Confirmation dialog has Cancel and Remove buttons
- [ ] Cancel closes dialog without removing
- [ ] Remove deletes favorite from list
- [ ] Empty state displays when no favorites
- [ ] Heart icon toggle works (if implemented)

## Phase 8: Profile Page
- [ ] Profile page displays user name
- [ ] Profile page displays major
- [ ] Profile page displays graduation year
- [ ] Verified badge displays for verified users
- [ ] Star rating displays correctly
- [ ] Tab navigation works (Listings/Reviews)
- [ ] Listings tab shows user's listings
- [ ] Reviews tab shows user reviews
- [ ] Review cards show rating, reviewer name, comment, and date

## Phase 9: Trust and Safety
- [ ] Delete listing button appears on own listings
- [ ] Delete button triggers confirmation dialog
- [ ] Confirmation dialog warns about permanent deletion
- [ ] Cancel closes dialog without deleting
- [ ] Delete removes listing
- [ ] Mark sold functionality has confirmation (if implemented)
- [ ] Cancel transaction functionality has confirmation (if implemented)
- [ ] Meetup location suggestions display on item detail (if implemented)

## Phase 10: Visual Design System
- [ ] Primary color is Chico State red (#DC2626 or similar)
- [ ] Color palette matches specification
- [ ] Typography is consistent across pages
- [ ] Spacing follows design tokens
- [ ] Border radius follows design tokens
- [ ] Shadows follow design tokens
- [ ] Mobile-first responsive design implemented
- [ ] Touch targets are at least 44x44px on mobile

## Phase 11: Database Schema
- [ ] Users table has graduation_year field
- [ ] Users table has major field
- [ ] Users table has is_verified field
- [ ] Users table has avg_rating field
- [ ] Listings table has condition field
- [ ] Listings table has updated_at field
- [ ] Messages table uses recipient_id (not receiver_id)
- [ ] Messages table has read_status field
- [ ] Reviews table exists
- [ ] All foreign key relationships are correct

## Phase 12: API Integration
- [ ] All API calls use proper error handling
- [ ] Loading states display during API calls
- [ ] Error messages display appropriately
- [ ] OpenAPI specification is up to date
- [ ] Backend smoke tests pass
- [ ] Health check endpoint works

## Phase 13: General Functionality
- [ ] Application loads without console errors
- [ ] All pages render correctly
- [ ] Forms validate properly
- [ ] Navigation works between all pages
- [ ] Mobile responsiveness works on all pages
- [ ] No broken links
- [ ] Images load (or placeholders display)
- [ ] Mock data is appropriate for development
