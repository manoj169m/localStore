import connectDB from '@/lib/mongodb';
import Product from '@/models/Products';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  if (req.method === 'POST') {
    try {
      const { name, price, description, image, quantity, category } = req.body;

      // Validate required fields
      if (!name || !price || quantity === undefined || quantity < 0) {
        return res.status(400).json({ message: 'Name, price, and valid quantity are required' });
      }

      // Create a new product
      const newProduct = new Product({
        name,
        price,
        description,
        image,
        quantity,
        category,
      });

      await newProduct.save();

      res.status(201).json(newProduct);
    } catch (error) {
      console.error('Error saving product:', error);
      res.status(500).json({ message: 'Server error', error });
    }
  }

  if (req.method === 'GET') {
    try {
      // Fetch all products, optionally can filter by category
      const { category: queryCategory } = req.query;

      let products;

      if (queryCategory) {
        // If a category is provided in the query, filter by it
        products = await Product.find({ category: queryCategory });
      } else {
        // Otherwise, fetch all products
        products = await Product.find();
      }

      res.status(200).json(products);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ message: 'Server error', error });
    }
  }

  // Handle unsupported HTTP methods
  res.status(405).json({ message: 'Method not allowed' });
}
