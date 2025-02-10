import Footer from '@/components/home/Footer';
import Header from '@/components/home/Header';
import ProductCard from '@/components/home/ProductList';
import type { NextPage } from 'next';
import Head from 'next/head';


const ProductsPage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Products - Grocery Store</title>
        <meta name="description" content="Explore our fresh products." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <ProductCard />
      <Footer/>
    </div>
  );
};

export default ProductsPage;