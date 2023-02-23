import React from 'react'
import { OfferStatus as Statuses } from '../../../types/store';

interface IProps {
    status: Statuses;
}

const OfferStatuses = {
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
        text: "Активный"
    },
    "SOLD": {
        className: "bg-red-500",
        text: "Продано"
    },
    
}

export default function OfferStatus({ status }: IProps) {
    return (
        <span className={`${OfferStatuses[status].className} text-white px-2 py-1 rounded-md text-sm whitespace-nowrap`}>{OfferStatuses[status].text}</span>
    )
}
