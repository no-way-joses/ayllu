"use client"

import { useRouter } from "next/navigation";

export default function EventModal({ setEventModal } : any) {
  const router = useRouter();

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
            <div className="border h-full">
              <h2> Thanksgiving Party</h2>
            </div>
            <div className="border h-full">
              <h2> Halloween</h2>
            </div>
            <div className="border h-full">
              <h2> Secret Santa</h2>
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
