import React from 'react'
import { OfferStatus as Statuses } from '../../../types/store';

interface IProps {
    status: Statuses;
}

const OfferStatuses = {
    "NO_MATCH": {
        className: "bg-gray-400",
        text: "Нет соответствия"
    },
    "OFFERED": {
        className: "bg-gray-400",
        text: "Предложено"
    },
    "ACCEPTED": {
        className: "bg-gray-400",
        text: "Ожидает принятия"
    },
    "RETURN_APPROVAL": {
        className: "bg-gray-400",
        text: "Утверждение возврата"
    },
    "RETURNING": {
        className: "bg-gray-400",
        text: "Возврат"
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
