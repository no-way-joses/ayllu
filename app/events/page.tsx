"use client"

import axios from 'axios';
import { useEffect, useState } from 'react';
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI('API_KEY'); // <--- here API KEY
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const prompt = "Write a story about a magic backpack.";

(async () => {
    const result = await model.generateContent(prompt);
    console.log(result.response.text());
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
        axios.post(`https://54mc904vld.execute-api.us-east-2.amazonaws.com/prod/plan/get`, { // <--- hardcoded for now
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
        axios.post(`https://54mc904vld.execute-api.us-east-2.amazonaws.com/prod/plan`, newEvent) // <--- hardcoded for now
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
        <div>
            <h1>Events</h1>
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
            <div className="create-event-card">
                <h2>Create Event</h2>
                <input
                    type="text"
                    name="title"
                    value={newEvent.title}
                    onChange={handleInputChange}
                    placeholder="Title"
                />
                <input
                    type="date"
                    name="startDate"
                    value={newEvent.startDate}
                    onChange={handleInputChange}
                    placeholder="Start Date"
                />
                <input
                    type="text"
                    name="description"
                    value={newEvent.description}
                    onChange={handleInputChange}
                    placeholder="Description"
                />
                <input
                    type="date"
                    name="endDate"
                    value={newEvent.endDate}
                    onChange={handleInputChange}
                    placeholder="End Date"
                />
                <input
                    type="time"
                    name="startHour"
                    value={newEvent.startHour}
                    onChange={handleInputChange}
                    placeholder="Start Hour"
                />
                <input
                    type="time"
                    name="endHour"
                    value={newEvent.endHour}
                    onChange={handleInputChange}
                    placeholder="End Hour"
                />
                <button onClick={handleCreateEvent}>Create Event</button>
            </div>
        </div>
    );
}