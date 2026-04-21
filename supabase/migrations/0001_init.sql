-- ============================================================
-- 0001_init.sql  –  Campus Exchange initial schema
-- ============================================================

-- Profiles (extends auth.users)
create table if not exists public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  username    text unique not null,
  full_name   text,
  avatar_url  text,
  bio         text,
  is_verified boolean not null default false,
  avg_rating  numeric(3,2) default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- Categories
create table if not exists public.categories (
  id   serial primary key,
  name text unique not null,
  slug text unique not null
);

-- Listings
create table if not exists public.listings (
  id           uuid primary key default gen_random_uuid(),
  seller_id    uuid not null references public.profiles(id) on delete cascade,
  category_id  int  references public.categories(id),
  title        text not null,
  description  text,
  price        numeric(10,2) not null check (price >= 0),
  condition    text not null check (condition in ('new','like_new','good','fair','poor')),
  status       text not null default 'active' check (status in ('active','sold','archived')),
  images       text[] not null default '{}',
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- Conversations
create table if not exists public.conversations (
  id          uuid primary key default gen_random_uuid(),
  listing_id  uuid references public.listings(id) on delete set null,
  buyer_id    uuid not null references public.profiles(id) on delete cascade,
  seller_id   uuid not null references public.profiles(id) on delete cascade,
  created_at  timestamptz not null default now()
);

-- Messages
create table if not exists public.messages (
  id              uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  sender_id       uuid not null references public.profiles(id) on delete cascade,
  body            text not null,
  created_at      timestamptz not null default now()
);

-- Offers
create table if not exists public.offers (
  id              uuid primary key default gen_random_uuid(),
  listing_id      uuid not null references public.listings(id) on delete cascade,
  buyer_id        uuid not null references public.profiles(id) on delete cascade,
  amount          numeric(10,2) not null check (amount >= 0),
  status          text not null default 'pending' check (status in ('pending','accepted','declined','withdrawn')),
  created_at      timestamptz not null default now()
);

-- Ratings
create table if not exists public.ratings (
  id          uuid primary key default gen_random_uuid(),
  reviewer_id uuid not null references public.profiles(id) on delete cascade,
  reviewee_id uuid not null references public.profiles(id) on delete cascade,
  listing_id  uuid references public.listings(id) on delete set null,
  score       int not null check (score between 1 and 5),
  comment     text,
  created_at  timestamptz not null default now(),
  unique (reviewer_id, listing_id)
);

-- Meetup suggestions (safe public locations on campus)
create table if not exists public.meetup_locations (
  id    serial primary key,
  name  text not null,
  notes text
);

-- Indexes
create index if not exists listings_seller_id_idx  on public.listings(seller_id);
create index if not exists listings_status_idx     on public.listings(status);
create index if not exists messages_conversation_id_idx on public.messages(conversation_id);
