'use client'

import React from 'react';
import { SignInButton, SignOutButton, useUser } from '@clerk/nextjs'


const Navbar = () => {

  const { user, isSignedIn } = useUser();

  return (
    <nav className="flex top-0 left-0 h-screen w-24 bg-orange-700 text-white">
      <div className="flex flex-col p-4">
        <h1 className="text-l font-bold">AYLLU</h1>
        <ul className="mt-4">
          <li className="mb-2 text-m">
            <a href="/home">Home</a>
          </li>
          <li className="mb-2">
            <a href="/details">Details</a>
          </li>
          <li>
          { isSignedIn && (
            <SignOutButton redirectUrl="/">
            <button>Logout</button>
            </SignOutButton>
          )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;