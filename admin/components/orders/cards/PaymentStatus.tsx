import React from 'react'
import { PaymentStatus as Statuses } from '../../../types/store';

interface IProps {
    status: Statuses;
}

const PaymentStatuses = {
    "UNPAID": {
        className: "bg-gray-400",
        text: "Не оплачено"
    },
    "PAID": {
        className: "bg-green-600",
        text: "Оплачено"
    },
    "REFUNDED": {
        className: "bg-red-500",
        text: "Возврат"
    },
    "PARTIALLY_PAID": {
        className: "bg-gray-400",
        text: "Частичено оплачен"
    },
    "NEED_TO_RETURN": {
        className: "bg-red-500",
        text: "Долг"
    },
}

export default function PaymentStatus({ status }: IProps) {
    return (
        <span className={`${PaymentStatuses[status].className} text-white px-2 py-1 rounded-md text-sm whitespace-nowrap`}>{PaymentStatuses[status].text}</span>
    )
}
