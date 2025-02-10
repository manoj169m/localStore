// pages/api/products/[id].ts
import connectDB from '@/lib/mongodb';
import Product from '@/models/Products';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();
  
  const { id } = req.query;
  
  if (!id) {
    return res.status(400).json({ message: 'Product ID is required' });
  }

  switch (req.method) {
    case 'PUT':
      try {
        const { name, price, description, image, quantity, category } = req.body;
        
        // Validate required fields
        if (!name || !price || quantity === undefined || quantity < 0) {
          return res.status(400).json({ message: 'Name, price, and valid quantity are required' });
        }
        
        const updatedProduct = await Product.findByIdAndUpdate(
          id,
          {
            name,
            price,
            description,
            image,
            quantity,
            category,
          },
          { new: true } // Returns the updated document
        );
        
        if (!updatedProduct) {
          return res.status(404).json({ message: 'Product not found' });
        }
        
        res.status(200).json(updatedProduct);
      } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ message: 'Server error', error });
      }
      break;

    case 'DELETE':
      try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        
        if (!deletedProduct) {
          return res.status(404).json({ message: 'Product not found' });
        }
        
        res.status(200).json({ message: 'Product deleted successfully' });
      } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ message: 'Server error', error });
      }
      break;

    default:
      res.status(405).json({ message: 'Method not allowed' });
  }
}