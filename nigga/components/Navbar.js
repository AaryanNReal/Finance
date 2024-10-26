// components/Navbar.js
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from "react";
import { auth } from "../lib/firebase"; // Import your Firebase configuration
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // Initialize the router

  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      // Redirect to FinancialForm after successful login
      router.push('/financialForm'); // Updated to point to the correct path
    } catch (error) {
      console.error("Error signing in: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Error signing out: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <nav className="bg-gray-800 text-white px-9 h-14 py-4 transition-all duration-300 hover:h-16">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link href="/">Empower</Link>
        </div>

        {/* Links */}
        <div className="flex space-x-6">
          <Link href="/" className="hover:text-gray-400">Home</Link>
          <Link href="/about" className="hover:text-gray-400">About Us</Link>
          <Link href="/contact" className="hover:text-gray-400">Contact</Link>
          <Link href="/discover" className="hover:text-gray-400">Discover</Link>
        </div>

        {/* Login/Logout Button */}
        <div>
          {user ? (
            <button
              onClick={handleSignOut}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-4 rounded"
              aria-label="Logout"
            >
              {loading ? 'Logging out...' : 'Logout'}
            </button>
          ) : (
            <button
              onClick={handleSignIn}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-4 rounded"
              aria-label="Login"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
