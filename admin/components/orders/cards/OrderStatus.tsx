import React from 'react'
import { OrderStatus as Statuses } from '../../../types/store';

interface IProps {
    status: Statuses;
}

const OrderStatuses = {
    "FULFILLED": {
        className: "bg-green-600",
        text: "Исполнено"
    },
    "PARTIALLY_FULFILLED": {
        className: "bg-gray-400",
        text: "Ожидает принятия"
    },
    "UNFULFILLED": {
        className: "bg-gray-400",
        text: "Не исполнено"
    },
    "CANCELED": {
        className: "bg-red-500",
        text: "Отменено"
    }
}

export default function OrderStatus({ status }: IProps) {
    return (
        <span className={`${OrderStatuses[status].className} text-white px-2 py-1 rounded-md text-sm whitespace-nowrap`}>{OrderStatuses[status].text}</span>
    )
}
