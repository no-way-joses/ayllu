'use client'

import React from 'react';
import { useState } from 'react';


const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 h-screen w-20 bg-orange-900 text-white z-50">
      <div className="flex flex-col p-4">
        <h1 className="text-xl font-bold">AYLLU</h1>
        <ul className="mt-4">
          <li className="mb-2">
            <a href="/">Home</a>
          </li>
          <li className="mb-2">
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;