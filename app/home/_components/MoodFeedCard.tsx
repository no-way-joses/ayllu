"use client"

import Image from "next/image"

export default function MoodFeedCard() {
  return (
    <div className="w-full bg-orange-400 flex flex-col justify-center items-center border-b-2 border-b-orange-500 p-9">
      <div className="self-start w-28 flex items-center justify-around">
        <div className="bg-slate-50 w-12 h-12 rounded-full"></div>
        <p> Mom </p>
      </div>
      <Image src={"/happy.png"} alt="happy" height="250" width="250"/>
      <p>...is feeling happy!</p>
    </div>
  )
}