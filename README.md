# Bengal Basket – Client

Authentic Bengali food & grocery delivery platform, built as a production-ready full-stack TypeScript project.

🔗 **Live Site:** https://bengal-basket-client.vercel.app
🔗 **API (Server):** https://bengal-basket-server.onrender.com
🔗 **Server Repository:** https://github.com/mouislambd/bengal-basket-server

## Demo Credentials

**Admin**
- Email: `admin@gmail.com`
- Password: `1234567890`

**User**
- Email: `demo@bengalbasket.com`
- Password: `demo123456`

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Auth:** Better Auth (Email/Password + Google OAuth)
- **HTTP Client:** Axios
- **Icons:** React Icons

## Features

- 🏠 Home page with hero section, categories, featured products, testimonials, and newsletter signup
- 🔍 Explore Foods page with search, category filter, sorting, and pagination
- 📄 Food details page with description, key info, reviews & ratings, and related items
- 🔐 Authentication with email/password, Google OAuth, and demo login
- ➕ Protected pages: Add Item, Manage Items (CRUD for logged-in users)
- 🛒 Buy Now flow with SSLCommerz payment integration
- 📦 My Orders page for tracking personal orders
- 🛠️ Admin panel to manage all orders and mark deliveries
- ⭐ Reviews & ratings system on each product
- 📱 Fully responsive design

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/mouislambd/Bengal-basket-client.git
cd Bengal-basket-client
npm install
```

### Environment Variables

Create a `.env.local` file in the root directory:

```
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_IMGBB_API_KEY=your_imgbb_api_key
```

### Run Locally

```bash
npm run dev
```

App will be available at `http://localhost:3000`.

### Build

```bash
npm run build
npm start
```

## Project Structure

```
app/
├── page.tsx              # Home page
├── foods/                # Explore & food details pages
├── login/                # Login page
├── register/             # Register page
├── items/add/            # Protected: Add item
├── items/manage/         # Protected: Manage items
├── my-orders/            # User order history
├── admin/orders/         # Admin order management
├── payment/              # Payment success/fail/cancel pages
├── about/, contact/      # Additional pages
components/
├── FoodCard.tsx
├── Navbar.tsx / Footer.tsx
├── ReviewSection.tsx
├── BuyNowButton.tsx
├── RelatedItems.tsx
├── NewsletterForm.tsx
lib/
├── api.ts                # Axios instance
├── auth-client.ts        # Better Auth client
```

## Related Repository

Backend/API source code: https://github.com/mouislambd/bengal-basket-server

## License

This project was built for educational purposes as part of the Programming Hero SCIC-13 course.