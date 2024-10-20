"use client"

import Image from "next/image";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";

export default function MoodModal({ setModalOpen } : any) {
  const { user } = useUser();
  const [selectedMood, setSelectedMood] = useState('');

  const setMood = () => {
    // TODO: Set user mood in database
    axios.post(`${process.env.NEXT_PUBLIC_API}/mood`, {
      userId: user?.id,
      result: selectedMood
    })
    .then((res) => {
      console.log('Successful Mood Post', res)
      setModalOpen(false);
    })
    .catch((err) => {
      console.log('Error Posting Mood', err)
    })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 background-blur-sm flex justify-center items-center">
      <div className="bg-orange-500 h-[50%] w-[90%] rounded-3xl flex flex-col justify-around items-center">
        <h2 className="text-center font-bold text-2xl drop-shadow-md">
          How are you feeling today?
        </h2>
        { selectedMood.length ? <h2>you're feeling {selectedMood}</h2> : <h2>you're feeling...</h2> }
        <div className="w-full flex items-center justify-evenly overflow-scroll bg-orange-600">
          <Image src={"/happy.png"} alt="happy" height="300" width="300" layout="responsive" className="w-full h-auto hover:opacity-60 ${selectedImage === 'happy' ? 'border-4 border-blue-500 shadow-lg'}" onClick={() => setSelectedMood('happy')}/>
          <Image src={"/sad.png"} alt="sad" height="300" width="300" layout="responsive" className="w-full h-auto hover:opacity-60" onClick={() => setSelectedMood('sad')}/>
          <Image src={"/angry.png"} alt="angry" height="300" width="300" layout="responsive" className="w-full h-auto hover:opacity-60" onClick={() => setSelectedMood('angry')}/>
          <Image src={"/fearful.png"} alt="fearful" height="300" width="300" layout="responsive" className="w-full h-auto hover:opacity-60" onClick={() => setSelectedMood('fearful')}/>
          <Image src={"/disgust.png"} alt="disgust" height="300" width="300" layout="responsive" className="w-full h-auto hover:opacity-60" onClick={() => setSelectedMood('disgust')}/>
        </div>
        <div className="text-center w-80 leading-10 backdrop-blur-sm rounded-3xl hover:cursor-pointer bg-transparent/20 hover:bg-transparent/40 transition-colors p-2 border-5 border-shadow">
          <button onClick={setMood}>
            Set Mood
          </button>
          </div>
      </div>
    </div>
  )
}