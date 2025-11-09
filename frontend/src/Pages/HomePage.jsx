import React, { useState, useEffect } from 'react';
import NoteCard from '../Components/NoteCard';
import RateLimiter from '../Components/RateLimiter';
import axios from 'axios';
import { SquarePen, Trash2 } from 'lucide-react';

const HomePage = () => {
    const [isRateLimited, setIsRateLimited] = useState(false);
    const [loading, setLoading] = useState(true);
    const [notes, setNotes] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                setLoading(true);
                const res = await axios.get('http://localhost:5001/api/notes');
                setNotes(res.data);
                setIsRateLimited(false);
                setError(null);
            } catch (err) {
                console.error('Error fetching notes:', err);

                if (err.response?.status === 429) {
                    setIsRateLimited(true);
                } else {
                    setIsRateLimited(false);
                    setError('Failed to load notes. Try again later.');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchNotes();
    }, []);

    // --- Render logic ---
    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-dots loading-md"></span>
            </div>
        );
    }

    if (isRateLimited) {
        return (
            <>
                <div className='h-[100vh]'>
                    <RateLimiter />

                </div>
            </>
        )

    }

    if (error) {
        return (
            <div className="flex flex-col justify-center items-center h-screen text-center text-error">
                <p>{error}</p>
                <button
                    className="btn btn-sm mt-3"
                    onClick={() => window.location.reload()}
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-7 flex flex-wrap justify-around gap-5 bg-base-200">
            {notes.length > 0 ? (
                notes.map((note) => (
                    <div
                        key={note.id}
                        className="card w-96 bg-base-100 shadow-sm border border-base-300"
                        style={{ borderTop: '3px solid #3DA74B' }}
                    >
                        <div className="card-body">
                            <h2 className="card-title">{note.title}</h2>
                            <p>{note.content}</p>
                            <div className="flex justify-between items-center card-actions">
                                <small className="text-gray-400">{note.updatedAt}</small>
                                <div className="flex gap-2">
                                    <button className="btn btn-ghost btn-xs text-error">
                                        <Trash2 size={14} />
                                    </button>
                                    <button className="btn btn-ghost btn-xs">
                                        <SquarePen size={14} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-center text-gray-500 mt-10">No notes available.</p>
            )}
        </div>
    );
};

export default HomePage;
