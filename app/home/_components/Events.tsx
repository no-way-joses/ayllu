"use client"

export default function Events() {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="bg-orange-600 w-[95%] md:w-[60%] h-72 rounded-xl flex flex-col shadow-lg">
        <h2 className="p-2 font-bold bg-orange-700 rounded-t-xl">
          Upcoming Events
        </h2>
        <div className="px-3 flex flex-col gap-3 py-2 h-full selection:justify-center items-center overflow-y-auto">
          {/* TODO: map through events */}
          <div className="h-32 w-full text-center bg-orange-800 rounded-xl flex flex-col justify-evenly">
            <h3> Event 1 </h3>
            <p> Thanksgiving Dinner </p>
            <p> 11/28/24</p>
            <p> This is in ... days </p>
          </div>
          <div className="h-32 w-full text-center bg-orange-800 rounded-xl flex flex-col justify-evenly">
            <h3> Event 1 </h3>
            <p> Thanksgiving Dinner </p>
            <p> 11/28/24</p>
            <p> This is in ... days </p>
          </div>
          <div className="h-32 w-full text-center bg-orange-800 rounded-xl flex flex-col justify-evenly">
            <h3> Event 1 </h3>
            <p> Thanksgiving Dinner </p>
            <p> 11/28/24</p>
            <p> This is in ... days </p>
          </div>
        </div>
      </div>
      <div className="text-center w-80 leading-10 backdrop-blur-sm rounded-3xl hover:cursor-pointer bg-transparent/20 hover:bg-transparent/40 transition-colors p-2 border-5 border-shadow">
        <button onClick={() => {}}>
          Create an Event
        </button>
      </div>
    </div>
  )
}
