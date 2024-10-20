"use client"

import Image from "next/image";
import Navbar from "../components/Navbar";
import axios from "axios";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";

export default function Details() {
  const [ familyId, setFamilyId ] = useState('');
  const {user, isLoaded} = useUser()

  useEffect(() => {
    if (!isLoaded) return;

    axios.post(`${process.env.NEXT_PUBLIC_API}/user/get`, {
      userId: user?.id,
     })
    .then((res) => {
      console.log('Getting family details', JSON.parse(res.data.body).Item.familyId);
      let currentFamilyId = JSON.parse(res.data.body).Item.familyId
      setFamilyId(currentFamilyId);
    })
    .catch((err) => {
      console.log('POST error', err);
    })
  }, [])

  return (
  <div className="w-screen h-screen">
       <div className=" z-20 flex flex-col justify-center items-center w-screen h-screen text-neutral-800">
        <div className="mx-11 leading-10 backdrop-blur-sm rounded-3xl bg-transparent/20 p-5 border-5 border-shadow">
          <h1 className=" text-lg text-start items-center whitespace-pre-line">Family Details</h1>
          <p className="text-2xl text-left indent-5 whitespace-break-spaces">{familyId}</p>
          <p className="text-lg text-end">END OF DETAILS</p>
        </div>
      </div>
    </div>
  )
}

