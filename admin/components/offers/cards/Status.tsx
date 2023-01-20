import React from 'react'
import { OfferStatus } from '../../../types/store';

interface IProps {
    status: OfferStatus;
}

const statuses = {
    "OFFERED": {
        className: "bg-gray-400",
        text: "Предложено"
    },
    "ACCEPTED": {
        className: "bg-gray-400",
        text: "Ожидает принятия"
    },
    "DECLINED": {
        className: "bg-red-500",
        text: "Отклонено"
    },
    "ACTIVE": {
        className: "bg-green-600",
        text: "Активно"
    },
    "SOLD": {
        className: "bg-red-500",
        text: "Продано"
    },
    
}

export default function Status({ status }: IProps) {
    return (
        <span className={`${statuses[status].className} text-white px-2 py-1 rounded-md text-sm`}>{statuses[status].text}</span>
    )
}
