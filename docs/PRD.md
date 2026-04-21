# Campus Exchange – Product Requirements Document

## 1. Overview
Campus Exchange is a mobile-first marketplace for Chico State University students to buy and sell items safely within a verified campus community.

## 2. Goals
- Enable fast, local, trustworthy exchanges between students.
- Restrict access to verified Chico State email holders (`@mail.csuchico.edu` / `@csuchico.edu`).
- Surface strong trust signals: verified badges, ratings, and reviews.

## 3. Target Users
| Persona | Description |
|---------|-------------|
| Buyer | Student searching for affordable campus items |
| Seller | Student offloading used items |
| Both | Most students act as both |

## 4. Core Features (MVP)

### 4.1 Authentication & Verification
- Register with a Chico State email address only.
- Email verification required before posting or messaging.
- Profile shows verified badge once confirmed.

### 4.2 Listings
- Fields: title, description, price, condition, category, up to 6 photos.
- Conditions: New, Like New, Good, Fair, Poor.
- Statuses: Active, Sold, Archived.
- Full-text search + filter by category, price range, condition.

### 4.3 Messaging
- Direct, free-form chat per listing.
- Optional: make / accept / decline monetary offers within a conversation.

### 4.4 Ratings & Reviews
- Buyers and sellers rate each other (1–5 stars + optional comment) after a transaction.
- Average rating displayed on profile.

### 4.5 Safe Meetup Locations
- Curated list of public on-campus spots shown during transaction coordination.

## 5. Non-Functional Requirements
- Mobile-first PWA; works offline (read) via service worker.
- Sub-2 s time to interactive on 4G.
- HTTPS only; all API routes authenticated where required.

## 6. Out of Scope (v1)
- Payment processing.
- Shipping / delivery.
- Push notifications (future).
