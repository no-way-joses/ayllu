"use client"

export default function MoodBar({ members } : any) {
  const moodOutlines = {
    "happy": "yellow",
    "sad": "blue",
    "angry": "red",
    "fearful": "purple",
    "disgust": "green"
  }

  return (
    <div className="h-[13%] bg-orange-600 shadow-md px-2 flex gap-2 items-center justify-evenly overflow-x-auto">
      <div className="rounded-full bg-orange-200 h-20 w-20 flex-shrink-0">

      </div>
      <div className="rounded-full bg-orange-200 h-20 w-20 flex-shrink-0">

      </div>
      <div className="rounded-full bg-orange-200 h-20 w-20 flex-shrink-0">

      </div>
      <div className="rounded-full bg-orange-200 h-20 w-20 flex-shrink-0">

      </div>
      <div className="rounded-full bg-orange-200 h-20 w-20 flex-shrink-0">

      </div>
      <div className="rounded-full bg-orange-200 h-20 w-20 flex-shrink-0">

      </div>
      {/* TODO: loop through members and render each one */}
      {members?.forEach((member) => (
        <div>
          Family Member
        </div>
      ))}
    </div>
  )
}