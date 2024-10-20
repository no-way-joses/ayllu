"use client"

import axios from 'axios';
import { useEffect, useState } from 'react';

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
            .then(response => setEvents(response.data))
            .catch(error => console.error('Error fetching events:', error));
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewEvent(prevState => ({ ...prevState, [name]: value }));
    };

    const handleCreateEvent = () => {
        axios.post(`${process.env.NEXT_PUBLIC_API}/plan`, newEvent)
            .then(response => {
                setEvents([...events, response.data]);
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