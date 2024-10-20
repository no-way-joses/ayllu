"use client"

import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import axios from "axios";

interface Event {
  title: string;
  startDate: string;
  description?: string;
  endDate?: string;
  startHour?: string;
  endHour?: string;
  familyId: string;
}

export default function EventModal({ setEventModal } : any) {
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    axios.post(`${process.env.NEXT_PUBLIC_API}/plan/get`, {
        familyId: "940d88d6-63eb-4732-af21-1816b726582f", // <--- hardcoded for now
        startDate: "2021-09-01" // <--- hardcoded for now
      })
        .then(response => {
            console.log('Events fetched:', JSON.parse(response.data.body)['plans']);
            setEvents(JSON.parse(response.data.body)['plans'])
        })
        .catch(error => console.error('Error fetching events:', error));
}, []);

  const onPlan = () => {
    router.push('/events')
  }

  return (
    <div className="flex justify-center items-center">
      <div onClick={() => {setEventModal(false)}} className="fixed inset-0 bg-black bg-opacity-60 background-blur-sm flex justify-center items-center animate-delay-200">
      </div>
      <div className="bg-orange-600 h-[80%] w-[80%] top-7 rounded-xl animate-fade-up animate-delay-200 absolute">
          <h1 className="text-center text-2xl p-2"> Upcoming Events </h1>
          <div className="bg-orange-700 h-96 w-full flex flex-col gap-8 justify-around">
            <div className="h-full flex flex-col justify-center items-center">
              <div className="h-full flex flex-col justify-center items-center">
                <h2 className="text-lg font-bold"> Halloweenies</h2>
                <p>Dont forget to dress up!</p>
                <p> Starts on: <span className="font-bold"> 10/29/24 </span> </p>
              </div>
              <div className="h-full flex flex-col justify-center items-center">
                <h2 className="text-lg font-bold"> Thanksgiving Party</h2>
                <p>Bring your biggest turkey!</p>
                <p> Starts on: <span className="font-bold"> 11/28/24 </span> </p>
              </div>
              <div className="h-full flex flex-col justify-center items-center">
                <h2 className="text-lg font-bold"> Secret Santa </h2>
                <p>Don't forget a present pls</p>
                <p> Starts on: <span className="font-bold"> 12/25 /24 </span> </p>
              </div>
            </div>
          </div>
          <div onClick={onPlan}
                  className="text-center mt-4 mx-5 leading-10 backdrop-blur-sm rounded-3xl hover:cursor-pointer bg-transparent/20 hover:bg-transparent/40 transition-colors p-5 border-5 border-shadow">
              <button>
                Plan an Event
              </button>
            </div>
        </div>
      </div>
  )
}
