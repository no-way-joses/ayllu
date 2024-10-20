"use client"

export default function EventModal({ setEventModal } : any) {
  return (
    <div onClick={() => {setEventModal(false)}} className="fixed inset-0 bg-black bg-opacity-60 background-blur-sm flex justify-center items-center">
      <div className="bg-orange-600 h-[70%] w-[80%] rounded-xl">
        <h1 className="text-center"> Upcoming Events </h1>
      </div>
    </div>
  )
}
