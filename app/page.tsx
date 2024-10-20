"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";
import Navbar from "./components/Navbar";

export default function Home() {
  const router = useRouter();

  const onSignin = () => {
    router.push('/signin');
  }

  const onSignup = () => {
    router.push('/signup');
  }

  return (
    // if the user isn't logged in / authenticated, redirect to login
    <div className="z-20 flex flex-col justify-center items-center w-full h-full">
      <Navbar />
      <div>
        <Image alt="logo" src="/logo.png" width="400" height="400" className="animate-fade animate-delay-7300"/>
        <h1 className="text-4xl text-center font-bold drop-shadow-sm animate-fade-up animate-ease-out animate-delay-900"> Welcome to AYLLU! </h1>
        <h2 className="text-center mt-4 animate-fade-up animate-ease-out animate-delay-700"> where family stays close </h2>
      </div>
      <div className="flex flex-col h-[30%] w-[70%] lg:w-[40%] justify-center">
        <div  onClick={onSignin}
              className="text-center leading-10 backdrop-blur-sm rounded-3xl hover:cursor-pointer bg-transparent/20 hover:bg-transparent/40 transition-colors p-5 border-5 border-shadow">
          <button>
            Sign In
          </button>
        </div>
        <div  onClick={onSignup}
              className="text-center mt-4 leading-10 backdrop-blur-sm rounded-3xl hover:cursor-pointer bg-transparent/20 hover:bg-transparent/40 transition-colors p-5 border-5 border-shadow">
          <button>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
