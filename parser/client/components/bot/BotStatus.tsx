import React from 'react'

const statuses = {
    ACTIVE: {
        text: "Активен",
        style: "text-green-600"
    },
    INACTIVE: {
        text: "Неактивен",
        style: "text-gray-500"
    }
}

interface IProps {
    status: string;
}

export default function BotStatus({ status }: IProps) {
    return (
        <div className={statuses[status as keyof typeof statuses].style}>{statuses[status as keyof typeof statuses].text}</div>
    )
}
