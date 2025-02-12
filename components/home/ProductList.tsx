'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';


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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="overflow-hidden group">
            <Skeleton className="h-64 w-full" />
            <div className="p-4">
              <Skeleton className="h-4 w-2/3 mb-2" />
              <Skeleton className="h-4 w-1/3" />
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card className="w-full">
        <CardContent className="text-center p-6">
          <p className="text-red-500">Error: {error}</p>
          <Button onClick={fetchProducts} className="mt-4">
            Retry
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (!products.length) {
    return (
      <Card className="w-full">
        <CardContent className="text-center p-6">
          <p>No products found{category ? ` in category: ${category}` : ''}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 min-h-screen p-6 ">
      {products.map((product) => (
        <Card 
          key={product._id} 
          className="overflow-hidden group hover:shadow-lg transition-shadow duration-300 max-h-fit"
        >
          <div className="relative h-64 overflow-hidden">
            {product.image && (
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            )}
            <div className="absolute top-2 right-2">
              {product.quantity > 0 ? (
                <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs">
                  In Stock
                </span>
              ) : (
                <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs">
                  Out of Stock
                </span>
              )}
            </div>
          </div>
          
          <div className="p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold leading-tight flex-1 pr-2">
                {product.name}
              </h3>
              <p className="text-lg font-bold text-blue-600">
                ${product.price.toFixed(2)}
              </p>
            </div>
            
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {product.description}
            </p>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">
                {product.quantity} units available
              </span>
              <Button 
                onClick={() => handleAddToCart(product)}
                className="bg-blue-600 hover:bg-blue-700"
                disabled={product.quantity === 0}
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ProductList;