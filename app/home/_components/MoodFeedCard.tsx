"use client"

import Image from "next/image"
import axios from "axios"
import { useUser } from "@clerk/clerk-react"
import { useEffect, useState } from "react"

export default function MoodFeedCard({ userId } : any) {
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
  }, [isLoaded])

  return (
    <div className="w-full bg-orange-400 flex flex-col justify-center items-center border-b-2 border-b-orange-500 p-9">
      <div className="self-start w-28 flex items-center justify-around">
        <div className="bg-slate-50 w-12 h-12 rounded-full"></div>
        <p> {user?.firstName} </p>
      </div>
      <Image src={`/${mood}.png`} alt={`${mood}`} height="250" width="250"/>
      <p>...is feeling {mood}!</p>
    </div>
  )
}