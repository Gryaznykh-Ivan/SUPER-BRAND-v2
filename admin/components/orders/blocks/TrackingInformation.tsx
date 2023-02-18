import { useRouter } from 'next/router'
import React from 'react'
import Input from '../../inputs/Input'

export default function TrackingInformation() {
    const router = useRouter()

    return (
        <div className="rounded-md bg-white shadow-sm">
            <div className="p-5 border-b-[1px] flex justify-between items-center">
                <h2 className="font-semibold">Информаций для отслеживания</h2>
            </div>
            <div className="p-5 grid grid-cols-2 gap-4">
                <div className="">
                    <label htmlFor="tracking" className="text-sm">Трек-номер</label>
                    <Input type="text" placeholder="Трек-номер" id="tracking" onChange={() => { }} />
                </div>
                <div className="">
                    <label htmlFor="carrier" className="text-sm">Перевозчик</label>
                    <Input type="text" placeholder="Перевозчик" id="carrier" onChange={() => { }} />
                </div>
            </div>
        </div>
    )
}
