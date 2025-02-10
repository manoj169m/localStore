import About from '@/components/home/about';
import Footer from '@/components/home/Footer';
import Header from '@/components/home/Header';
import Head from 'next/head';


const AboutPage = () => {
  return (
    <div>
      <Head>
        <title>About Us - Grocery Store</title>
        <meta name="description" content="Learn more about our grocery store." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <About />
      <Footer />
    </div>
  );
};

export default AboutPage;