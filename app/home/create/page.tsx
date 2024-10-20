"use client"
import { useRouter } from "next/navigation";
import { Courier_Prime } from "next/font/google";
import { useUser } from "@clerk/clerk-react";
import Image from "next/image";


import axios from "axios";

import { useEffect, useRef, useState } from "react";

import { FaCopy } from "react-icons/fa6";

const courierPrime = Courier_Prime({
  subsets: ["latin"],
  weight: "400",
  display: "swap"
});

export default function Create() {
  const router = useRouter();
  const nameRef = useRef(null);
  const { user, isLoaded } = useUser();

  const [famCreate, setFamCreate] = useState(false);
  const [familyID, setfamilyID] = useState("");
  const [copySuccess, setCopySuccess] = useState('');

  const copyClick = async () => {
    try {
      await navigator.clipboard.writeText(`${familyID}`);
      setCopySuccess('Copied');
      setTimeout(() => setCopySuccess(''), 2000);
    } catch (err) {
      setCopySuccess('Failed');
    }
  };

  const onCreate = async () => {
    if (nameRef.current.value && isLoaded) {
      try {
        const familyResponse = await axios.post(`${process.env.NEXT_PUBLIC_API}/family`, {
          userId: user?.id,
          name: nameRef.current.value,
        });

        console.log('SUCCESS family post', JSON.parse(familyResponse.data.body));

        const famId = JSON.parse(familyResponse.data.body).familyId;

        setfamilyID(famId);
        setFamCreate(true);

        router.push('/home');

      } catch (err) {
        console.error('ERROR', err);
      }
    }
  };

  return (
    <div className="w-screen h-screen">
    <div className="w-full h-full flex flex-col justify-center items-center">

      {famCreate ?
      <div className="w-full h-full flex flex-col justify-center items-center">
        <Image src="/happy.png" alt="happy" width="400" height="400" className="animate-fade animate-delay-1000 animate-ease-in" />
        <h1 className="text-5xl drop-shadow-sm animate-fade-up animate-delay-700"> Family Created! </h1>
        <h2 className="text-l drop-shadow-sm mt-4 animate-fade-up animate-delay-900"> Your Family ID is: </h2>
        <h2 className="font-bold underline whitespace-nowrap mt-[1px]"> {familyID} </h2>
        <div className="flex gap-8 flex-row">
        <button onClick = {() => {router.push('/home')}} className="mt-4 text-white bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"> Next </button>
        <button onClick={copyClick} className=" mt-4 text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"> Copy ID </button>
        </div>
      </div>
      :
      <>
      <h1 className="text-5xl drop-shadow-sm"> Create a Family! </h1>
      <h2 className="text-xl drop-shadow-sm mt-3"> What's your family name? </h2>
      <input ref={nameRef} placeholder="family name..." className={`mt-1 text-center rounded-xl text-black pt-1 pb-1 w-64 ${courierPrime.className}`}></input>
      <button onClick = {onCreate} className=" mt-4 bg-transparent/20 hover:bg-transparent/40 transition-colors rounded shadow px-14 py-2">
        Next
      </button>
      </>
      }
    </div>
    </div>
  )
}


  // const onCreate = () => {
  //   if (nameRef.current.value) {
  //     axios.post(`${process.env.NEXT_PUBLIC_API}/family`, {
  //       userId: user?.id,
  //       name: nameRef.current.value
  //     })
  //     .then(res => {
  //       let id = JSON.parse(res.data.body).familyId;
  //       console.log('SUCCESS family post', id);

  //       axios.put(`${process.env.NEXT_PUBLIC_API}/user/family`, {
  //         userId: user?.id,
  //         familyId: id
  //       })
  //       .then(res => {
  //         console.log('SUCCESS linking user to family', res);
  //         router.push('/home');
  //       })
  //       .catch(err => {
  //         console.log('ERROR linking user to family', err);
  //       })

  //     })
  //     .catch(err => {
  //       console.log('ERROR family post', err);
  //     })
  //   }
  // }