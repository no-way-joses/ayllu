'use client'

import React, { useState } from 'react'

import Link from "next/link"

export default function Navbar() {
    const [ sidebarVisible, setSidebarVisible ] = useState(false);

    const toggleNavbar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    return(
        <div className="fixed
        top-0 left-0 h-full w-full z-50">
            <button
                className="absolute top-0 left-0 p-4 text-white bg-gray-900"
                onClick={toggleNavbar}
                >
                    {/*Menu Icon*/}
                    </button>
                    <div
                        className={`absolute top-0 left-0 h-full w-64 bg-gray-800 transition-transform duration-300 ease-out ${
                            sidebarVisible ? 'translate-x-0' : '-translate-x-full'
                      }`}
                    >
                         <div className="flex flex-col p-4 text-white">
          <h2 className="text-xl font-bold">User Information</h2>
          {/* <p>{user.name}</p>
          <p>{user.email}</p> */}
          <button
            className="mt-4 p-2 bg-red-500 text-white rounded-md"
            onClick={() => {}}
          >
            Logout
          </button>
        </div>

                    </div>
        </div>


        /*<div className={(sidebarVisible ? 'visible ' : 'hidden ') + "z-40 translate-x-full absolute w-15 h-full grid-col shadow-2xl pr-5 py-5 justify-between items center backdrop-blur-sm bg-transparent/20 text-white"}>
            <p onClick={() => {setSidebarVisible(!sidebarVisible)}} className="rounded-xl bg-neutral-900 hover:bg-neutral-400 active:bg-neutral-500 transition-all duration-200 px-3 py-2">test nav</p>
        </div>*/
    )
}