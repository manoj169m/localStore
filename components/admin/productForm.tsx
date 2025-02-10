'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useSession, signIn } from 'next-auth/react';

interface ProductFormData {
  name: string;
  price: string;
  description: string;
  image: string;
  quantity: string;
  category: string;
}

interface FormErrors {
  name?: string;
  price?: string;
  quantity?: string;
  image?: string;
  submit?: string;
}

export const categories = [
  'Oil',
  'Agarbatti',
  'Biscuit',
  'Dhal',
];

const ProductForm = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    price: '',
    description: '',
    image: '',
    quantity: '',
    category: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCategoryChange = (value: string) => {
    setFormData((prevState) => ({
      ...prevState,
      category: value,
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    }

    // Price validation
    if (!formData.price.trim()) {
      newErrors.price = 'Price is required';
    } else if (isNaN(Number(formData.price)) || Number(formData.price) < 0) {
      newErrors.price = 'Price must be a positive number';
    }

    // Quantity validation
    if (!formData.quantity.trim()) {
      newErrors.quantity = 'Quantity is required';
    } else if (isNaN(Number(formData.quantity)) || Number(formData.quantity) < 0) {
      newErrors.quantity = 'Quantity must be a non-negative number';
    }

    // Optional: Image URL validation
    if (formData.image.trim() && !isValidUrl(formData.image)) {
      newErrors.image = 'Invalid image URL';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
          quantity: Number(formData.quantity),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create product');
      }

      // Reset form and redirect or show success message
      setFormData({
        name: '',
        price: '',
        description: '',
        image: '',
        quantity: '',
        category: '',
      });
      router.push('/product'); // Redirect to products page
    } catch (error) {
      // Handle any submission errors
      setErrors((prevErrors) => ({
        ...prevErrors,
        submit: error.message,
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (status === 'loading') return; // Do nothing while loading
    if (!session) signIn(); // If not authenticated, redirect to sign-in page
  }, [session, status]);

  if (!session) {
    return <p>Redirecting to sign-in page...</p>;
  }

  const handleEdit = () => {
    router.push('/signup/dashboard/edit');
  };

  return (
    <div>
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Create New Product</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter product name"
                className={errors.name ? 'border-red-500' : ''}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                placeholder="Enter price"
                step="0.01"
                min="0"
                className={errors.price ? 'border-red-500' : ''}
              />
              {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
            </div>

            <div>
              <Label htmlFor="description">Description (Optional)</Label>
              <Input
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter product description"
              />
            </div>

            <div>
              <Label htmlFor="image">Image URL (Optional)</Label>
              <Input
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="Enter image URL"
                className={errors.image ? 'border-red-500' : ''}
              />
              {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
            </div>

            <div>
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                name="quantity"
                type="number"
                value={formData.quantity}
                onChange={handleChange}
                placeholder="Enter quantity"
                min="0"
                className={errors.quantity ? 'border-red-500' : ''}
              />
              {errors.quantity && <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>}
            </div>

            <div>
              <Label>Category</Label>
              <Select value={formData.category} onValueChange={handleCategoryChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {errors.submit && <div className="text-red-500 text-sm mt-2">{errors.submit}</div>}

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? 'Creating Product...' : 'Create Product'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <button onClick={handleEdit}>Edit products</button>
    </div>
  );
};

export default ProductForm;
