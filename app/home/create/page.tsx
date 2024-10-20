"use client"
import { useRouter } from "next/navigation";
import { Courier_Prime } from "next/font/google";
import { useUser } from "@clerk/clerk-react";

import axios from "axios";

import { useEffect, useRef, useState } from "react";

const courierPrime = Courier_Prime({
  subsets: ["latin"],
  weight: "400",
  display: "swap"
});

export default function Create() {
  const router = useRouter();
  const nameRef = useRef(null);
  const { user } = useUser();

  const [famCreate, setFamCreate] = useState(false);
  const [familyID, setfamilyID] = useState("");

  const onCreate = async () => {
    if (nameRef.current.value) {
      try {
        const familyResponse = await axios.post(`${process.env.NEXT_PUBLIC_API}/family`, {
          userId: user?.id,
          name: nameRef.current.value,
        });

        console.log('SUCCESS family post', JSON.parse(familyResponse.data.body));

        let famId = JSON.parse(familyResponse.data.body).familyId;

        setFamCreate(true);

        // router.push('/home');

      } catch (err) {
        console.error('ERROR', err);
      }
    }
  };

  return (
    <div className="w-screen h-screen">
    <div className="w-full h-full flex flex-col justify-center items-center">

      {famCreate ?
      <div>
      <h1 className="text-5xl drop-shadow-sm animate-fade-in"> Family Created!!! </h1>
      <h2 className="text-l drop-shadow-sm mt-2"> Your Family ID is: {familyID} </h2>
      </div> :
      <>
      <h1 className="text-5xl drop-shadow-sm"> Create a Family! </h1>
      <h2 className="text-l drop-shadow-sm mt-3"> What's your family name? </h2>
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