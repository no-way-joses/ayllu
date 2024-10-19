"use client"
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import Image from "next/image";

import Navbar from "../components/Navbar";

import { useEffect, useRef } from "react";

export default function Home() {
  const router = useRouter();
  const { user } = useUser();
  const codeRef = useRef(null);

  const onCreate = () => {
    router.push('/home/create');
  }

  useEffect(() => {
    axios.post(`${process.env.NEXT_PUBLIC_API}/user`, {
      userId: user?.id,
      name: user?.firstName
    })
    .then((res) => {
      console.log('POST success', res);
    })
    .catch((err) => {
      console.log('POST error', err);
    })

    console.log('user id', user?.id)

    axios.post(`${process.env.NEXT_PUBLIC_API}/user/get`, {
      userId: user?.id
    })
    .then(res => {
      console.log('SUCCESS get user', res)
    })
    .catch(err => {
      console.log('ERROR get user', err)
    })
  }, [])

  const onJoin = () => {
    let familyId = codeRef.current.value;

    // connect user to family


  }

  return (
    <div className="w-screen h-screen">
      <div className="h-full w-full flex flex-col justify-center gap-12 items-center">
        <Image alt="logo" src="/logo.png" width="400" height="400"/>
        <h1 className="font-bold drop-shadow-sm text-3xl mt-0">Welcome to AYLLU!</h1>
        <div className="w-[70%] lg:w-[40%] flex flex-col gap-4 items-center">
          <div className="text-center w-80 leading-10 backdrop-blur-sm rounded-3xl hover:cursor-pointer bg-transparent/20 hover:bg-transparent/40 transition-colors p-2 border-5 border-shadow">
            <button onClick={onCreate}>
              Create a Family
            </button>
          </div>
          <div className="flex flex-col">
            <p className="text-center font-bold">or join an existing family</p>
            <div className="text-center leading-10 p-5 border-5 border-shadow flex">
              <input ref={codeRef} placeholder="family id" className="text-center rounded-tl-xl rounded-bl-xl text-black"></input>
              <button onClick={onJoin} className="bg-transparent/20 hover:bg-transparent/40 transition-colors rounded-tr-xl rounded-br-xl px-12">
                Join
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
