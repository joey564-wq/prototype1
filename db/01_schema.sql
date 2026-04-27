create table if not exists users (
  id bigint generated always as identity primary key,
  full_name text not null,
  email text not null unique,
  role text default 'student',
  created_at timestamptz default now()
);

create table if not exists categories (
  id bigint generated always as identity primary key,
  name text not null unique
);

create table if not exists listings (
  id bigint generated always as identity primary key,
  seller_id bigint not null references users(id) on delete cascade,
  category_id bigint not null references categories(id),
  title text not null,
  description text,
  price numeric(10,2) not null check (price >= 0),
  status text not null default 'available' check (status in ('available', 'pending', 'sold')),
  created_at timestamptz default now()
);

create table if not exists favorites (
  id bigint generated always as identity primary key,
  user_id bigint not null references users(id) on delete cascade,
  listing_id bigint not null references listings(id) on delete cascade,
  created_at timestamptz default now(),
  unique(user_id, listing_id)
);

create table if not exists messages (
  id bigint generated always as identity primary key,
  sender_id bigint not null references users(id) on delete cascade,
  receiver_id bigint not null references users(id) on delete cascade,
  listing_id bigint references listings(id) on delete set null,
  message_text text not null,
  sent_at timestamptz default now()
);
