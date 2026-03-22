#  Restaurant CMS Manager

> A full-stack Restaurant Management System built with React (Vite), Node.js (TypeScript), and PostgreSQL.

The system allows administrators to manage their food menu and restaurant details with a live database connection. It connects to the shared backend API powering the RestaurantApp mobile ordering platform.

---

## Features

- **Modular Dashboard** — Clean, responsive UI for managing restaurant operations
- **Menu Management (CRUD)**
  - **Create** — Add new dishes with name, price, category, image and description
  - **Read** — Live syncing with PostgreSQL database
  - **Update** — Inline editing of existing menu items
  - **Delete** — Permanent removal of items from the database
- **Order Management** — View all customer orders with status badges and item details
- **User Management** — View all registered customers
- **Restaurant Info** — Manages business details like name, address and contact info
- **Live Analytics** — Real-time stat cards fetching data directly from PostgreSQL
- **Type Safety** — Strict TypeScript implementation on both frontend and backend

---

## Tech Stack

| Layer | Technologies |
|-------|-------------|
| **Frontend** | React 18 (TypeScript), Vite, Tailwind CSS, Lucide React |
| **Database** | PostgreSQL, pgAdmin4, Render (cloud hosting) |

---

## Screenshots

<img width="1900" height="800" alt="Dashboard" src="https://github.com/user-attachments/assets/7cbff14f-5ea0-4d0e-a17f-b710e35b0869" />
<img width="1900" height="800" alt="Menu Management" src="https://github.com/user-attachments/assets/912d4f81-7ca1-4b51-90c1-1a2a93cacb4c" />
<img width="1900" height="800" alt="Order List" src="https://github.com/user-attachments/assets/967a3901-aa93-4abd-82df-5285abf00535" />
<img width="1900" height="800" alt="Users" src="https://github.com/user-attachments/assets/3434ad72-26ab-4c66-afc7-2c1b5cc18500" />

---

---

## Setup & Installation

### 1. Database Setup (pgAdmin4)

Open pgAdmin4, create a database named `RestaurantApp`, then run:

```sql
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  address TEXT,
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  category VARCHAR(100),
  image_url TEXT,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  total_amount NUMERIC(10, 2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
  product_id INTEGER REFERENCES products(id) ON DELETE SET NULL,
  quantity INTEGER NOT NULL DEFAULT 1
);
```



### 3. Frontend Setup

```bash
cd restaurant-cms
npm install
```


Start the CMS:
```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## Usage

1. Open the CMS in your browser — you land on the **Dashboard**
2. Use the sidebar to navigate between pages:
   - **Dashboard** — view total orders, users, and recent order list
   - **Menu** — add, edit or delete menu items (updates mobile app instantly)
   - **Users** — view all registered customers
   - **Settings** — admin preferences and security options
3. To add a menu item: go to **Menu**, fill in the form, paste an image URL, and click **Add Product**

---

## API Endpoints Used

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Fetch all menu items |
| POST | `/api/products` | Add new menu item |
| PUT | `/api/products/:id` | Update menu item |
| DELETE | `/api/products/:id` | Delete menu item |
| GET | `/api/orders` | Fetch all orders |
| GET | `/api/users` | Fetch all users |
| GET | `/api/dashboard/stats` | Total orders & users count |

---


## Roadmap

- [ ] Admin login with role-based access control
- [ ] Update order status (pending → completed → cancelled)
- [ ] Product image upload via Cloudinary
- [ ] Sales analytics charts
- [ ] Dark mode

---

## Authors

Built by **Ndima Mhangwani** 🇿🇦

---


## Project Status

🟢 **Active — Version 1.0.0**
