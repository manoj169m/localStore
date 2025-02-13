'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  quantity: number;
  category: string;
}

interface ProductCardProps {
  category?: string;
}

const ProductList: React.FC<ProductCardProps> = ({ category }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const url = category
        ? `/api/products?category=${encodeURIComponent(category)}`
        : '/api/products';

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setProducts(Array.isArray(data) ? data : [data]);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to fetch products');
      console.error('Error fetching products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [category]);

  const handleAddToCart = (product: Product) => {
    // Here you would typically dispatch to a cart context or store
    alert(`Added ${product.name} to cart`);
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white p-6 rounded-lg shadow-lg animate-pulse">
            <div className="h-48 bg-gray-300 rounded-t-lg"></div>
            <div className="mt-4 h-6 bg-gray-300 rounded mb-2"></div>
            <div className="h-6 bg-gray-300 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto text-center p-6">
        <p className="text-red-500">Error: {error}</p>
        <Button onClick={fetchProducts} className="mt-4">
          Retry
        </Button>
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="max-w-md mx-auto text-center p-6">
        <p>No products found{category ? ` in category: ${category}` : ''}</p>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-green-50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-green-900 text-center mb-12 animate-fade-in">
          Our Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 group relative"
            >
              <div className="relative w-full h-48 overflow-hidden group-hover:scale-110 transition-transform duration-300">
                {product.image && (
                  <Image
                    className="w-full h-full object-cover rounded-t-lg"
                    src={product.image}
                    alt={product.name}
                    width={320}
                    height={192}
                    unoptimized
                  />
                )}
              </div>
              <h3 className="text-2xl font-semibold text-green-900 mt-4">{product.name}</h3>
              <p className="text-green-600 text-xl mt-2">₹{product.price.toFixed(2)}</p>
              <p className="text-gray-600 text-sm mt-2 line-clamp-3">{product.description}</p>
              <div className="flex items-center justify-between mt-4">
                <span className="text-sm text-gray-500">{product.quantity} units</span>
                <Button
                  onClick={() => handleAddToCart(product)}
                  className="bg-blue-600 hover:bg-blue-700"
                  disabled={product.quantity === 0}
                >
                  Add to Cart
                </Button>
              </div>
              {product.quantity > 0 ? (
                <span className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs">
                  In Stock
                </span>
              ) : (
                <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs">
                  Out of Stock
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductList;
