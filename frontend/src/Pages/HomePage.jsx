import React, { useState } from 'react'
import NoteCard from '../Components/NoteCard'
import RateLimiter from '../Components/RateLimiter';
import { useEffect } from 'react';
import axios from 'axios';
import { SquarePen, Trash2 } from 'lucide-react'



const HomePage = () => {
    const [isRateLimited, setIsRateLimited] = useState(true);
    const [loading, setLoading] = useState(true);
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const res = await axios.get("http://localhost:5001/api/notes");
                console.log(res.data);
                setNotes(res.data);
                setIsRateLimited(false);
                setLoading(false);
            } catch (error) {
                console.log("Error fetching note:", error);
                if (error.response?.status === 429) {
                    setIsRateLimited(true);
                    console.log("You are being rate limited.");
                } else {
                    setIsRateLimited(false);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchNote();
    }, []);


    return (
        <div className="min-h-screen relative">
            {isRateLimited && <RateLimiter />}
            {loading && <div className="flex justify-center items-center h-screen"> <span class="loading loading-dots loading-sm"></span>
            </div>}
            {notes.length > 0 && !isRateLimited && (
                <div className="p-7 flex gap-5 flex-wrap justify-around items-center" >
                    {notes.map((note) => (
                        <div key={note.id} className="card w-96 bg-base-100 card-sm shadow-sm  border-base-200" style={{ borderTop: "3px solid #3DA74B" }}>
                            <div className="card-body">
                                <h2 className="card-title">{note.title}</h2>
                                <p>{note.content}</p>
                                <div className="flex justify-between align-middle card-actions">
                                    <div>
                                        <p className='text-grey-300'>{note.updatedAt}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="cursor-pointer"><Trash2 size={14} color='red' /></button>
                                        <button className="cursor-pointer"><SquarePen size={14} /></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>



    );

}

export default HomePage