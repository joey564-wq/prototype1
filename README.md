<div align="center">

# 🎓 Campus Exchange

*A modern marketplace for Chico State students to buy and sell items within a verified campus community*

[![React](https://img.shields.io/badge/React-18-blue?logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20+-green?logo=node.js)](https://nodejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38bdf8?logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ecf8e?logo=supabase)](https://supabase.com/)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**🔗 Live Demo:** [https://main.d264xu0805yylg.amplifyapp.com](https://main.d264xu0805yylg.amplifyapp.com)

</div>

---

## ✨ Features

- 🔐 **Verified Student Community** – Only Chico State email addresses allowed
- 📱 **Mobile-First Design** – Responsive and optimized for all devices
- 🎨 **Modern UI/UX** – Clean, polished interface with smooth animations
- 💬 **In-App Messaging** – Communicate with buyers and sellers directly
- ⭐ **Favorites System** – Save items you're interested in
- 📊 **User Profiles** – View seller ratings and reviews
- 🔍 **Smart Filtering** – Search by category, condition, and price range
- 🚀 **Fast Performance** – Built with Vite for instant page loads

---

## 📸 Screenshots

<!-- Add screenshots here when available -->
> *Screenshots coming soon!*

---

## 🏗️ Project Structure

```
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── lib/            # API utilities & mock data
│   │   └── main.jsx        # App entry point
│   └── tailwind.config.js  # Design system configuration
├── api/                    # Express Backend
│   ├── src/
│   │   ├── routes/         # API route handlers
│   │   ├── middleware/     # Auth & validation middleware
│   │   ├── lib/            # Supabase client
│   │   └── index.js        # Server entry point
│   ├── openapi.yaml        # API documentation
│   └── README.md           # API-specific docs
├── db/                     # Database
│   ├── 01_schema.sql       # Database schema
│   ├── 02_seed.sql         # Sample data
│   └── 03_policies.sql     # Row-level security policies
├── tests/                  # Testing
│   └── smoke.sh            # API smoke test script
└── README.md
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18, Vite, Tailwind CSS, React Router v6 |
| **Backend** | Express 4, Node.js 20+ |
| **Database** | Supabase (PostgreSQL + Auth + Storage) |
| **Authentication** | Supabase Auth (Chico State email required) |
| **Styling** | Tailwind CSS with custom design system |
| **API Documentation** | OpenAPI 3.0 (Swagger) |

---

## 🚀 Quick Start

### Prerequisites

- Node.js ≥ 20
- A [Supabase](https://supabase.com) project (free tier works)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/joey564-wq/prototype1.git
cd prototype1

# Install dependencies
cd client && npm install && cd ..
cd api    && npm install && cd ..
```

### Configuration

```bash
# Copy environment files
cp client/.env.example client/.env
cp api/.env.example    api/.env

# Fill in your Supabase credentials in both files
# Required: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY
```

### Database Setup

Run the SQL migrations in the Supabase SQL editor:

1. [`db/01_schema.sql`](db/01_schema.sql) – Create tables and relationships
2. [`db/02_seed.sql`](db/02_seed.sql) – Load sample data (optional)
3. [`db/03_policies.sql`](db/03_policies.sql) – Configure row-level security (optional)

### Start Development Servers

```bash
# Terminal 1 - Start the API
cd api && npm run dev
# API running at http://localhost:3000

# Terminal 2 - Start the frontend
cd client && npm run dev
# Frontend running at http://localhost:5173
```

---

## 📚 API Documentation

The REST API is documented using OpenAPI 3.0 specification:

- [`api/openapi.yaml`](api/openapi.yaml) – Complete API specification
- [`api/README.md`](api/README.md) – API usage guide

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| GET | `/api/listings` | Get all listings |
| GET | `/api/listings/:id` | Get single listing |
| POST | `/api/listings` | Create new listing |
| GET | `/api/users/:userId/listings` | Get user's listings |

---

## 🧪 Testing

Run the API smoke test to verify the backend is working:

```bash
./tests/smoke.sh
```

---

## 📖 Documentation

- [`docs/PRD.md`](docs/PRD.md) – Product requirements document
- [`docs/sitemap.md`](docs/sitemap.md) – Page hierarchy & user flows
- [`docs/openapi.yaml`](docs/openapi.yaml) – REST API specification
- [`docs/deployment.md`](docs/deployment.md) – Environment variables & hosting guide

---

## 🎨 Design System

The app uses a custom design system built on Tailwind CSS:

- **Primary Color**: Brand indigo (`#4f46e5`)
- **Success Color**: Green (`#22c55e`)
- **Warning Color**: Amber (`#f59e0b`)
- **Danger Color**: Red (`#ef4444`)
- **Typography**: System fonts with clear hierarchy
- **Shadows**: 5-level shadow scale for depth
- **Border Radius**: Consistent rounded corners (0.375rem - 1.5rem)

See [`client/tailwind.config.js`](client/tailwind.config.js) for full configuration.

---

## 🔐 Security

- **Authentication**: Supabase Auth with email verification
- **Authorization**: Row-level security policies in PostgreSQL
- **API Security**: Helmet middleware for Express
- **CORS**: Configured for allowed origins
- **Input Validation**: Zod schema validation on API endpoints

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👥 Authors

- **Joey** - *Initial development* - [joey564-wq](https://github.com/joey564-wq)

---

## 🙏 Acknowledgments

- Chico State community for inspiration
- Supabase for the excellent database and auth platform
- Vite for the lightning-fast build tool
- Tailwind CSS for the utility-first CSS framework

---

<div align="center">

**Built with ❤️ for Chico State students**

</div>
