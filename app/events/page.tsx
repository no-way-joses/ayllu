"use client"

import axios from 'axios';
import { useEffect, useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI); // <--- here API KEY
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const prompt = "Create just ONE title (NOTHING ELSE, JUST THE TITLE) of recommendation of an event for families who are at a distance. If you can, also take into account special events depending on the month.";
const prompt2 = "Using the next title, CREATE JUST A SMALL DESCRIPTION of the event AND NOTHING ELSE: ";
let generatedTitle = "";
let generatedDescription = "";

(async () => {
    const result = await model.generateContent(prompt);
    generatedTitle = result.response.text();
    console.log(generatedTitle);


    const result2 = await model.generateContent(prompt2 + generatedTitle);
    generatedDescription = result2.response.text();
    console.log(generatedDescription);
})();

interface Event {
    title: string;
    startDate: string;
    description?: string;
    endDate?: string;
    startHour?: string;
    endHour?: string;
    familyId: string;
}

export default function Event() {
    const [events, setEvents] = useState<Event[]>([]);
    const [newEvent, setNewEvent] = useState<Event>({
        title: '',
        startDate: '',
        description: '',
        endDate: '',
        startHour: '',
        endHour: '',
        familyId: '1', // <--- hardcoded for now
    });

    useEffect(() => {
        axios.post(`${process.env.NEXT_PUBLIC_API}/plan/get`, {
            familyId: "1", // <--- hardcoded for now
            startDate: "2021-09-01" // <--- hardcoded for now
          })
            .then(response => {
                console.log('Events fetched:', JSON.parse(response.data.body)['plans']);
                setEvents(JSON.parse(response.data.body)['plans'])
            })
            .catch(error => console.error('Error fetching events:', error));
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewEvent(prevState => ({ ...prevState, [name]: value }));
    };

    const handleCreateEvent = () => {
        axios.post(`${process.env.NEXT_PUBLIC_API}/plan`, newEvent)
            .then(response => {
                console.log('Event created:', response.data);
                setEvents([...events, newEvent]);
                setNewEvent({
                    title: '',
                    startDate: '',
                    description: '',
                    endDate: '',
                    startHour: '',
                    endHour: '',
                    familyId: '1' // <--- hardcoded for now
                });
            })
            .catch(error => console.error('Error creating event:', error));
    };

    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            <div>

                {events.map((event, index) => (
                    <div key={index} className="event-card">
                        <h2>{event.title}</h2>
                        <p>Start Date: {event.startDate}</p>
                        {event.description && <p>Description: {event.description}</p>}
                        {event.endDate && <p>End Date: {event.endDate}</p>}
                        {event.startHour && <p>Start Hour: {event.startHour}</p>}
                        {event.endHour && <p>End Hour: {event.endHour}</p>}
                    </div>
                ))}

            </div>
            <div className="create-event-card bg-orange-700 rounded-xl flex flex-col items-center gap-4 text-center p-6">
                <h2 className="text-xl">Create Event</h2>
                <input
                    type="text"
                    name="title"
                    value={newEvent.title}
                    onChange={handleInputChange}
                    placeholder={`Title: ${generatedTitle}`}
                    className="rounded-sm p-5 text-black w-full"
                />
                <input
                    type="text"
                    name="description"
                    value={newEvent.description}
                    onChange={handleInputChange}
                    placeholder={`Description: ${generatedDescription}`}
                    className="rounded-sm p-5 text-black w-full"
                />
                <div className="flex justify-between gap-2 w-full">
                    <div>
                        <p> Start date: </p>
                        <input
                            type="date"
                            name="startDate"
                            value={newEvent.startDate}
                            onChange={handleInputChange}
                            placeholder="Start Date"
                            className="rounded-sm p-5 text-black"
                        />
                    </div>
                    <div>
                        <p> End date: </p>
                        <input
                            type="date"
                            name="endDate"
                            value={newEvent.endDate}
                            onChange={handleInputChange}
                            placeholder="End Date"
                            className="rounded-sm p-5 text-black"
                            />
                    </div>
                </div>
                <div className="flex justify-between gap-2 w-full">
                <div>
                    <p> Start time: </p>
                    <input
                        type="time"
                        name="startHour"
                        value={newEvent.startHour}
                        onChange={handleInputChange}
                        placeholder="Start Hour"
                        className="rounded-sm p-5 text-black"
                        />
                </div>
                <div>
                    <p> End time: </p>
                    <input
                        type="time"
                        name="endHour"
                        value={newEvent.endHour}
                        onChange={handleInputChange}
                        placeholder="End Hour"
                        className="rounded-sm p-5 text-black"
                        />
                    </div>
                </div>
                <div className="text-center w-80 leading-10 backdrop-blur-sm rounded-3xl hover:cursor-pointer bg-transparent/20 hover:bg-transparent/40 transition-colors p-2 border-5 border-shadow">
                    <button onClick={handleCreateEvent}>
                        Create Event
                    </button>
                </div>
            </div>
        </div>
    );
}