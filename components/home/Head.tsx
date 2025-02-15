'use client';
import { useEffect, useState } from "react";

// Define types for the component if needed
const HeadSection: React.FC = () => {
  // Define an array of images related to the grocery store
  const images: string[] = [
    "/g1.webp", // Replace with your actual image paths
    "/g2.webp",
    "/g3.webp",
    "/g4.webp",
  ];

  // Set up a state to manage the current image index
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  // Change the background image every 5 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // 5000 ms = 5 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [images.length]);

  return (
    <section
      className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-green-600 bg-cover bg-center transition-all duration-1000"
      style={{ backgroundImage: `url(${images[currentImageIndex]})` }}
    >
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4 animate-fade-in">
          Welcome to Our Grocery Store
        </h1>
        <p className="text-xl text-green-100 animate-fade-in">
          Our Trusted Local Grocery Store for Fresh and Quality Produce,
          <br />
          Serving Our Community for Over 20 Years
        </p>
      </div>
    </section>
  );
};

export default HeadSection;
