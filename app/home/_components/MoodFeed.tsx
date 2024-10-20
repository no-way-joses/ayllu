"use client"

import MoodFeedCard from "./MoodFeedCard"
import { useUser } from "@clerk/clerk-react";
import axios from "axios";

import { useState, useEffect } from "react";

export default function MoodFeed({ familyId } : any) {
  const { user, isLoaded } = useUser();
  const [ members, setMembers ] = useState([])

  useEffect(() => {
    if (!isLoaded || !familyId?.length ) return;

    console.log('family id in feed: ', familyId)

    axios.post(`${process.env.NEXT_PUBLIC_API}/family/get`, {
      familyId
    })
    .then(res => {
      // console.log("success get family", JSON.parse(res.data.body).family.members)

      if (res.data.errorMessage) {
        throw Error(res.data.errorMessage)
      }

      const membs = JSON.parse(res.data.body).family.members;

      setMembers(membs);
    })
    .catch(err => {
      console.log("error getting family", err)
    })
  }, [familyId, isLoaded])

  return (
    <div className="flex flex-col h-full w-full">
      {members?.map((member, i) => {
        return <MoodFeedCard key={i} userId={member}/>
      })}
      {members.length === 0 &&
      <div className="flex w-full h-full items-center justify-center">
        <p className="text-center"> Loading Feed... </p>
      </div>
      }
    </div>
  )
}