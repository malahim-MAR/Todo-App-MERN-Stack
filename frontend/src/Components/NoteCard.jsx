import React from 'react'
import { SquarePen, Trash2 } from 'lucide-react'

const NoteCard = () => {
    return (
        <>

            <div className="card w-96 bg-base-100 card-sm shadow-sm  border-base-200" style={{ borderTop: "3px solid #3DA74B" }}>
                <div className="card-body">
                    <h2 className="card-title">Buy Grocery</h2>
                    <p>Go To Imtiaz Super Market On The End Week Of November</p>
                    <div className="flex justify-between align-middle card-actions">
                        <div>
                            <p className='text-grey-300'>10/7/2025</p>
                        </div>
                        <div className="flex gap-2">
                            <button className="cursor-pointer"><Trash2 size={14} color='red' /></button>
                            <button className="cursor-pointer"><SquarePen size={14} /></button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default NoteCard