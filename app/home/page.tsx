"use client"
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import Image from "next/image";

import { IoCalendarNumberOutline } from "react-icons/io5";

import Navbar from "../components/Navbar";

import { useEffect, useRef, useState } from "react";
import MoodFeed from "./_components/MoodFeed";
import MoodModal from "./_components/MoodModal";
import Events from "./_components/Events";

export default function Home() {
  let [ hasFamily, setFamily ] = useState(false);
  let [ modalOpen, setModalOpen ] = useState(false); // TODO: change back to true

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

    axios.post(`${process.env.NEXT_PUBLIC_API}/user`, {
      userId: user?.id
    })
    .then(res => {
      console.log('SUCCESS get user', res)

      // TODO: update hasFamily state to true if family id exists
      // setFamily(true);
    })
    .catch(err => {
      console.log('ERROR get user', err)
    })
  }, [])

  const onJoin = () => {
    let familyId = codeRef.current.value;

    axios.put(`${process.env.NEXT_PUBLIC_API}/user/family`, {
      userId: user?.id,
      familyId
    })
    .then(res => {
      console.log('SUCCESS join', res);
      router.push('/home');
    })
    .catch(err => {
      console.log('ERROR join', err);
    })
  }

  return (
    <div className="w-screen h-screen">

      { hasFamily ? (
        <div className="relative h-full w-full flex flex-col">
          <div className="fixed z-[999] bottom-4 right-4 rounded-full bg-orange-600 h-20 w-20 drop-shadow-lg hover:cursor-pointer justify-center items-center">
            <IoCalendarNumberOutline className=""/>
          </div>
          <MoodFeed/>
        </div>
      )
      :
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
      }
      {
        modalOpen && <MoodModal setModalOpen={setModalOpen}/>
      }
    </div>
  );
}
