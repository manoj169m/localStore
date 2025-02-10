import { Schema, model, models } from 'mongoose';

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
  quantity: {
    type: Number,
    required: true,
    default: 0, // Default to 0 if not specified
  },
  category: {
    type: String, // You could use a string for simple categories
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Product = models.Product || model('Product', ProductSchema);

export default Product;
