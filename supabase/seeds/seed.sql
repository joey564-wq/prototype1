-- ============================================================
-- seed.sql  –  Campus Exchange development seed data
-- ============================================================

-- Categories
insert into public.categories (name, slug) values
  ('Textbooks',       'textbooks'),
  ('Electronics',     'electronics'),
  ('Furniture',       'furniture'),
  ('Clothing',        'clothing'),
  ('Sports & Outdoors','sports-outdoors'),
  ('School Supplies', 'school-supplies'),
  ('Other',           'other')
on conflict (slug) do nothing;

-- Meetup locations
insert into public.meetup_locations (name, notes) values
  ('Meriam Library – Main Entrance',   'High foot traffic, well lit'),
  ('Bell Memorial Union (BMU) Atrium', 'Staffed building, daytime only'),
  ('WREC Lobby',                       'Busy during peak gym hours'),
  ('Wildcat Recreation Center Plaza',  'Outdoor, central campus'),
  ('BMU Starbucks',                    'Public, indoor seating')
on conflict do nothing;
