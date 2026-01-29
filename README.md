## Restaurant CMS Manager

A full-stack Restaurant Management System built with React (Vite), Node.js(TypeScript), and PostgreSQL. 
The system allows admnistrators to manage their food menu and restaurant details with a live database connection.


Features
-
- Modular Dashboard: Clean, responsive UI for managing restaurant operation.
- Menu Management(CRUD): Create: Add new dishes with price and description
  - Read: Live syncing with pgAdmin4/PostgreSQL database
  - Update: Inline editing of existing menu items
  - Delete: Permanent removal of items from the database
- Restuarant Info: Manages business details like name, address, and contact info
- Type Safety: Strict TypeScript implementation on both Frontend and Backend.
- Live Analytics: Real-time stat cards fetching data directly from PostgreSQL.
- 


Tech Stack
-
<table>
  <tr>
    <th>Frontend</th>
    <td>React 18(TypeScript) </td>
    <td>Tailwind CSS</td>
    <td>Lucide React(Icons)</td>
  </tr>
  <tr>
    <th>Backend</th>
    <td>Node.js/Express </td>
    <td>ts-node-dev </td>
    <td>CORS Middleware</td>
  </tr>
  <tr>
    <th>Database</th>
    <td>PostgreSQL </td>
    <td>pgAdmin4</td
  </tr>
</table>

Project Structure
-

├── restaurant-cms/          # Frontend (React)

│   ├── src/

│   │   ├── components/

│   │   │   └── MenuLayout/  # Modular Menu Logic

│   │   └── types/           # Shared TS Interfaces
│   └── ...
└── server/                  # Backend (Node.js/TS)

    ├── server.ts            # API Endpoints
    
    └── package.json         # Backend dependencies

Setup & Installation
-

1. Database Setup(pgAdmin4)
   1. Open pgAdmin4 and create a database named restaurant_db
   2. Run the following SQL script to create the table

      CREATE TABLE menu_items (
      
    id SERIAL PRIMARY KEY,
   
    name VARCHAR(255) NOT NULL,
   
    category VARCHAR(100),
   
    price DECIMAL(10, 2),
   
    description TEXT
);


2. Frontend Configuration
   1. Navigate to the restaurant-cms folder
   2. Install dependencies: npm install
   3. Start the app: npm run dev


How to run project
-

cd server

npm install

# Configure your .env with DATABASE_URL

npm run dev


How the Restaurant Manager looks like
-

<img width="1900" height="800" alt="Screenshot 2026-01-29 222052" src="https://github.com/user-attachments/assets/7cbff14f-5ea0-4d0e-a17f-b710e35b0869" />

<img width="1900" height="800" alt="Screenshot 2026-01-29 222036" src="https://github.com/user-attachments/assets/912d4f81-7ca1-4b51-90c1-1a2a93cacb4c" />


<img width="1900" height="800" alt="Screenshot 2026-01-29 222013" src="https://github.com/user-attachments/assets/967a3901-aa93-4abd-82df-5285abf00535" />
<img width="1900" height="800" alt="Screenshot 2026-01-29 221957" src="https://github.com/user-attachments/assets/3434ad72-26ab-4c66-afc7-2c1b5cc18500" />

