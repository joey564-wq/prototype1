-- Seed data for Campus Exchange
-- Insert in dependency order: users -> categories -> listings -> favorites -> messages

-- 1. Users
insert into users (full_name, email, role) values
  ('Jane Doe', 'jane.doe@example.com', 'student'),
  ('John Smith', 'john.smith@test.org', 'student'),
  ('Bob Wilson', 'bob.wilson@demo.net', 'student'),
  ('Alice Cooper', 'alice.cooper@sample.com', 'student')
on conflict (email) do nothing;

-- 2. Categories
insert into categories (name) values
  ('Textbooks'),
  ('Electronics'),
  ('Furniture'),
  ('School Supplies')
on conflict (name) do nothing;

-- 3. Listings (seller_id references users.id, category_id references categories.id)
insert into listings (seller_id, category_id, title, description, price, status) values
  (1, 1, 'Calculus Early Transcendentals (8th Edition)', 'Used for MATH 120. Minimal highlighting, good condition.', 45.00, 'available'),
  (2, 2, 'Apple AirPods Pro (2nd Gen)', 'Barely used, comes with original case and charging cable.', 180.00, 'available'),
  (3, 3, 'IKEA Desk Lamp', 'Adjustable arm, LED light. Selling because I moved.', 25.00, 'available'),
  (4, 4, 'Graphing Calculator TI-84 Plus', 'Fully functional, includes USB cable. Great for math courses.', 75.00, 'sold');

-- 4. Favorites (user_id references users.id, listing_id references listings.id)
insert into favorites (user_id, listing_id) values
  (2, 1),  -- John favorited Jane's textbook
  (3, 2),  -- Bob favorited John's AirPods
  (1, 4)   -- Jane favorited Alice's calculator
on conflict (user_id, listing_id) do nothing;

-- 5. Messages (sender_id and receiver_id reference users.id, listing_id references listings.id)
insert into messages (sender_id, receiver_id, listing_id, message_text) values
  (2, 1, 1, 'Hi, is the calculus book still available?'),
  (1, 2, 1, 'Yes it is! Would you like to meet up on campus?'),
  (3, 2, 2, 'Would you take $160 for the AirPods?');