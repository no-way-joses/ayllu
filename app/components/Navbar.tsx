'use client'

import React, { useState } from 'react'

import Link from "next/link"

import { SignOutButton } from '@clerk/nextjs'


export default function Navbar() {
    const [ sidebarVisible, setSidebarVisible ] = useState(false);

    const toggleNavbar = ({isOpen, setIsOpen }: NavbarProps) => {
        setSidebarVisible(!sidebarVisible);
    };


    return(
        <div className="flex justify-start fixed navbar ${isOpen ? 'open' : 'closed'} top-0 left-0 z-50 ">
            <button className="absolute top-0 left-0 p-4 text-white bg-gray-900"
                onClick={toggleNavbar}
                >
                    {/*Menu Icon*/}
                    </button>
                    <div
                        className={`absolute top-0 left-0 h-full w-64 bg-gray-800 transition-transform duration-300 ease-out ${
                            sidebarVisible ? 'translate-x-0' : '-translate-x-full'
                      }`}
                    >
                         <div className="flex flex-col items-center justify between h-full p-4 text-white">
          <h2 className="text-xl font-bold">User Information</h2>
          {/* <p>{user.name}</p>
          <p>{user.email}</p> */}
          <h2 className="mt-2">Nav bar </h2>
          <SignOutButton>
          <button
            className="mt-4 p-2 bg-red-500 text-white rounded-md"
          >
            Logout
          </button>
          </SignOutButton>
        </div>

        </div>
        </div>



    )
}