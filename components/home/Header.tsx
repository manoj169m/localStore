'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';

const Header = () => {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleSignin = () => {
    router.push('/signup');
  };

  const handleSignout = async () => {
    await signOut({ redirect: true, callbackUrl: '/' });
  };

  const AuthButton = () => {
    if (status === 'loading') {
      return null;
    }

    if (session) {
      return (
        <button
          onClick={handleSignout}
          className="bg-green-700 px-3 text-white rounded-md hover:bg-green-800"
        >
          Sign Out
        </button>
      );
    }

    return (
      <button
        onClick={handleSignin}
        className="bg-green-700 px-3 py-1 text-white rounded-md hover:bg-green-800"
        >
        Admin Login
      </button>
    );
  };

  const Adminpage =()=>{
    if(session){
      return(
      <Link href="/signup/dashboard" className="hover:text-green-300">Admin Dashboard</Link>
      )
    }
  }

  return (
    <header className="bg-white text-black sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="flex items-center">
          <Link href="/"> 
            Balu Maligai
          </Link>
        </div>
        
        <nav className="hidden md:flex space-x-4">
          <Link href="/" className="hover:text-green-300">Home</Link>
          <Link href="/about" className="hover:text-green-300">About</Link>
          <Link href="/product" className="hover:text-green-300">Products</Link>
          <Adminpage/>
        </nav>

        <div className="hidden md:block">
          <AuthButton />
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-green-700 p-2">
          <Link href="/" className="block p-2 hover:bg-green-600">Home</Link>
          <Link href="/about" className="block p-2 hover:bg-green-600">About</Link>
          <Link href="/product" className="block p-2 hover:bg-green-600">Products</Link>
          <div className="">
            <AuthButton />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;