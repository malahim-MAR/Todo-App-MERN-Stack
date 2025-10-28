import React, { useState } from 'react'
import NoteCard from '../Components/NoteCard'
import RateLimiter from '../Components/RateLimiter';
import { useEffect } from 'react';
import axios from 'axios';
const HomePage = () => {
    const [isRateLimited, setIsRateLimited] = useState(false);
    const [loading, setLoading] = useState(true);
    const [note, setNote] = useState();

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const res = await axios.get("http://localhost:5001/api/notes")
                console.log(res.data);
                setNote(res.data);
                setLoading(false);
            } catch (error) {
                console.log("Error fetching note:", error);

            }

        }
        fetchNote();
    }, []);

    return (
        <div className="min-h-screen relative">
            {isRateLimited ? (
                <RateLimiter onReset={() => setIsRateLimited(false)} />
            ) : (
                <div className="p-7">
                    {
                        
                    }
                    <NoteCard />
                </div>
            )}
        </div>
    );

}

export default HomePage