// Mock data for Campus Exchange frontend
// Matches SQL schema: users, categories, listings, favorites, messages

export const users = [
  {
    id: 1,
    full_name: 'Jane Doe',
    email: 'jane.doe@example.com',
    role: 'student',
    avatar_url: null,
    bio: 'Computer Science major, selling textbooks and electronics.',
    avg_rating: 4.8,
    created_at: '2024-01-15T10:30:00Z',
  },
  {
    id: 2,
    full_name: 'John Smith',
    email: 'john.smith@example.com',
    role: 'student',
    avatar_url: null,
    bio: 'Engineering student, looking for deals on textbooks.',
    avg_rating: 4.5,
    created_at: '2024-01-20T14:15:00Z',
  },
  {
    id: 3,
    full_name: 'Bob Wilson',
    email: 'bob.wilson@example.com',
    role: 'student',
    avatar_url: null,
    bio: 'Business major, selling furniture and dorm supplies.',
    avg_rating: 4.9,
    created_at: '2024-02-01T09:00:00Z',
  },
  {
    id: 4,
    full_name: 'Alice Cooper',
    email: 'alice.cooper@example.com',
    role: 'student',
    avatar_url: null,
    bio: 'Nursing student, looking for medical textbooks.',
    avg_rating: 4.7,
    created_at: '2024-02-10T16:45:00Z',
  },
];

export const categories = [
  { id: 1, name: 'Textbooks' },
  { id: 2, name: 'Electronics' },
  { id: 3, name: 'Furniture' },
  { id: 4, name: 'School Supplies' },
  { id: 5, name: 'Sports & Outdoors' },
];

export const listings = [
  {
    id: 1,
    seller_id: 1,
    category_id: 1,
    title: 'Calculus Early Transcendentals (8th Edition)',
    description: 'Used for MATH 120. Minimal highlighting, good condition. No missing pages.',
    price: 45.00,
    status: 'available',
    images: [],
    created_at: '2024-03-01T10:00:00Z',
  },
  {
    id: 2,
    seller_id: 2,
    category_id: 2,
    title: 'Apple AirPods Pro (2nd Gen)',
    description: 'Barely used, comes with original case and charging cable. Works perfectly.',
    price: 180.00,
    status: 'available',
    images: [],
    created_at: '2024-03-02T11:30:00Z',
  },
  {
    id: 3,
    seller_id: 3,
    category_id: 3,
    title: 'IKEA Desk Lamp',
    description: 'Adjustable arm, LED light. Selling because I moved out of the dorms.',
    price: 25.00,
    status: 'available',
    images: [],
    created_at: '2024-03-03T14:00:00Z',
  },
  {
    id: 4,
    seller_id: 4,
    category_id: 1,
    title: 'Graphing Calculator TI-84 Plus',
    description: 'Fully functional, includes USB cable. Great for math and science courses.',
    price: 75.00,
    status: 'sold',
    images: [],
    created_at: '2024-02-28T09:15:00Z',
  },
  {
    id: 5,
    seller_id: 1,
    category_id: 2,
    title: 'Mechanical Keyboard - Red Switches',
    description: 'RGB backlight, 60% layout. Used for one semester, like new condition.',
    price: 65.00,
    status: 'available',
    images: [],
    created_at: '2024-03-04T16:20:00Z',
  },
  {
    id: 6,
    seller_id: 3,
    category_id: 4,
    title: 'Backpack - North Face Surge',
    description: 'Large capacity, laptop compartment. Good condition, minor wear.',
    price: 40.00,
    status: 'available',
    images: [],
    created_at: '2024-03-05T08:45:00Z',
  },
];

export const favorites = [
  { id: 1, user_id: 2, listing_id: 1, created_at: '2024-03-02T12:00:00Z' },
  { id: 2, user_id: 3, listing_id: 2, created_at: '2024-03-03T13:30:00Z' },
  { id: 3, user_id: 1, listing_id: 4, created_at: '2024-03-01T15:00:00Z' },
];

export const messages = [
  {
    id: 1,
    conversation_id: 1,
    sender_id: 2,
    receiver_id: 1,
    listing_id: 1,
    message_text: 'Hi, is the calculus book still available?',
    sent_at: '2024-03-06T10:30:00Z',
  },
  {
    id: 2,
    conversation_id: 1,
    sender_id: 1,
    receiver_id: 2,
    listing_id: 1,
    message_text: 'Yes it is! Would you like to meet up on campus?',
    sent_at: '2024-03-06T10:32:00Z',
  },
  {
    id: 3,
    conversation_id: 2,
    sender_id: 3,
    receiver_id: 2,
    listing_id: 2,
    message_text: 'Would you take $160 for the AirPods?',
    sent_at: '2024-03-06T11:00:00Z',
  },
  {
    id: 4,
    conversation_id: 1,
    sender_id: 2,
    receiver_id: 1,
    listing_id: 1,
    message_text: 'That sounds great! How about Meriam Library at 3pm?',
    sent_at: '2024-03-06T10:45:00Z',
  },
];

export const conversations = [
  {
    id: 1,
    listing_id: 1,
    buyer_id: 2,
    seller_id: 1,
    created_at: '2024-03-06T10:30:00Z',
  },
  {
    id: 2,
    listing_id: 2,
    buyer_id: 3,
    seller_id: 2,
    created_at: '2024-03-06T11:00:00Z',
  },
];

export const ratings = [
  {
    id: 1,
    reviewer_id: 2,
    reviewee_id: 1,
    listing_id: 1,
    score: 5,
    comment: 'Great seller! Item was exactly as described.',
    created_at: '2024-03-07T09:00:00Z',
  },
  {
    id: 2,
    reviewer_id: 3,
    reviewee_id: 1,
    listing_id: 5,
    score: 4,
    comment: 'Smooth transaction, would buy again.',
    created_at: '2024-03-08T14:30:00Z',
  },
];
