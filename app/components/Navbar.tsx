'use client'

import { useState } from 'react'

import Link from "next/link"

export default function Navbar() {
    const [ sidebarVisible, setSidebarVisible ] = useState(false)

    return(
        <div className={(sidebarVisible ? 'visible ' : 'hidden ') + "z-40 translate-x-full absolute w-15 h-full grid-col shadow-2xl pr-5 py-5 justify-between items center backdrop-blur-sm bg-transparent/20 text-white"}>
            <p onClick={() => {setSidebarVisible(!sidebarVisible)}} className="rounded-xl bg-neutral-900 hover:bg-neutral-400 active:bg-neutral-500 transition-all duration-200 px-3 py-2">test nav</p>
        </div>
    )
}