"use client"

import Image from "next/image"
import axios from "axios"
import { useUser } from "@clerk/clerk-react"
import { useEffect, useState } from "react"

export default function MoodFeedCard({ userId } : any ) {
  const { user, isLoaded } = useUser();
  const [ mood, setMood ] = useState('');

  useEffect(() => {
    if (!isLoaded) return;

    console.log('userid in moodfeedcard', userId)

    axios.post(`${process.env.NEXT_PUBLIC_API}/mood/get`, {
      userId
    })
    .then(res => {
      console.log('SUCCESS MOODS', JSON.parse(res.data.body).result)
      setMood(JSON.parse(res.data.body).result);
    })
    .catch(err => {
      console.log('ERROR MOODS', err)
    })
  }, [isLoaded, userId])

  return (
    <div className="w-full bg-orange-400 flex flex-col justify-center items-center border-b-2 border-b-orange-500 p-9">
      <div className="self-start w-36 flex items-center justify-around">
        <div className="bg-slate-50 w-12 h-12 rounded-full flex justify-center items-center">
          <span className="text-slate-600 text-2xl"> {user?.firstName[0]} </span>
        </div>
        <p className="font-bold bg-orange-300 px-5 rounded-lg shadow-sm"> {user?.firstName} </p>
      </div>
      <Image src={`/${mood}.png`} alt={`${mood}`} height="250" width="250"/>
      <p className="p-4">...is feeling <span className="font-bold">{mood}!</span></p>
    </div>
  )
}