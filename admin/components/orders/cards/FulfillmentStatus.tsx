import React from 'react'
import { FulfillmentStatus as Statuses } from '../../../types/store';

interface IProps {
    status: Statuses;
}

const FulfillmentStatuses = {
    "SENT": {
        className: "bg-gray-400",
        text: "Отправлен"
    },
    "DELIVERED": {
        className: "bg-green-600",
        text: "Доставлен"
    }
}

export default function FulfillmentStatus({ status }: IProps) {
    return (
        <span className={`${FulfillmentStatuses[status].className} text-white px-2 py-1 rounded-md text-sm whitespace-nowrap`}>{FulfillmentStatuses[status].text}</span>
    )
}
