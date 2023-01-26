import React from 'react'

interface IProps {
    available: boolean;
}

export default function Status({ available }: IProps) {
    return (
        <span className={`${available ? "bg-green-600" : "bg-gray-400"} text-white px-2 py-1 rounded-md text-sm whitespace-nowrap`}>{available ? "Активный" : "Черновик"}</span>
    )
}
