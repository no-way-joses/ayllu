"use client"

export default function EventModal({ setEventModal } : any) {
  return (
    <div onClick={() => {setEventModal(false)}} className="fixed inset-0 bg-black bg-opacity-60 background-blur-sm flex justify-center items-center animate-delay-200">
      <div className="bg-orange-600 h-[70%] w-[80%] rounded-xl animate-fade-up animate-delay-200">
        <h1 className="text-center text-2xl p-2"> Upcoming Events </h1>
      </div>
    </div>
  )
}
