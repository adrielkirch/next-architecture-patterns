// pages/api/products.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const filePath = path.join(process.cwd(), 'public', 'products.json');
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    const products = JSON.parse(jsonData);

    res.status(200).json(products);
  } catch (error) {
    console.error('Error reading products.json:', error);
    res.status(500).json({ message: 'Failed to fetch products' });
  }
}
