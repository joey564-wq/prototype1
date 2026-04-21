# Campus Exchange – Site Map

```
/                       Home / Landing
├── /login              Sign in
├── /register           Sign up (Chico State email required)
├── /listings           Browse listings (search, filter)
│   ├── /listings/new   Create listing (auth + verified)
│   └── /listings/:id   Listing detail (photos, price, seller info, offers)
├── /messages           Inbox – conversation list (auth)
│   └── /messages/:id   Conversation thread (auth)
└── /profile/:userId    Public user profile (ratings, active listings)
    └── /profile/me     Own profile / settings (auth)
```

## Key User Flows

### Buyer Flow
1. Register → verify email → browse `/listings`
2. Open listing detail → message seller or make offer
3. Agree on meetup → complete transaction → leave rating

### Seller Flow
1. Register → verify email → `/listings/new`
2. Fill title / photos / price / condition / category → publish
3. Receive messages / offers → accept → coordinate meetup
4. Mark listing as Sold → receive buyer rating
