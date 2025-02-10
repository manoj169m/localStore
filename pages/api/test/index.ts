import connectDB from '@/lib/mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectDB();
    res.status(200).json({ message: 'MongoDB connected successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Database connection failed', details: error });
  }
}