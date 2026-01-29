import express, { Request, Response } from 'express';
import { Pool } from 'pg';
import cors from 'cors';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

app.get('/api/menu', async (req: Request, res: Response): Promise<void> => {
  try {
    // Updated table name and columns
    const result = await pool.query('SELECT id, name, price, image_url, category, description FROM products ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

app.post('/api/menu', async (req: Request, res: Response): Promise<void> => {
  const { name, category, price, description, image_url } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO products (name, category, price, description, image_url) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, category || 'General', price, description, image_url]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

app.put('/api/menu/:id', async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { name, category, price, description, image_url } = req.body;
  try {
    await pool.query(
      'UPDATE products SET name=$1, category=$2, price=$3, description=$4, image_url=$5 WHERE id=$6',
      [name, category, price, description, image_url, id]
    );
    res.json({ message: 'Updated successfully' });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

app.delete('/api/menu/:id', async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM products WHERE id = $1', [id]);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
