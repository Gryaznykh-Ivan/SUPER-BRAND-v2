import React from 'react'
import Input from '../../inputs/Input'

export default function Note() {
    return (
        <div className="rounded-md bg-white shadow-sm">
            <div className="p-5 border-b-[1px] flex justify-between items-center">
                <h2 className="font-semibold">Заметка</h2>
            </div>
            <div className="p-5">
                <Input type="text" placeholder="Заметка" id="note" onChange={() => { }} />
            </div>
        </div>
    )
}
