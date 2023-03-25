import React from 'react'
import { ProductStatus as Statuses } from '../../types/store';

interface IProps {
    status: Statuses;
}

const ProductStatuses = {
    "DONE": {
        className: "bg-green-600",
        text: "Готово"
    },
    "ERROR": {
        className: "bg-red-500",
        text: "Ошибка"
    },
    "WAITING_STOCKX_DATA": {
        className: "bg-gray-400",
        text: "В очереди"
    },
    "WAITING_SHOP_UPDATE": {
        className: "bg-gray-400",
        text: "Ожидает загрузку"
    }
}

export default function ProductStatus({ status }: IProps) {
    return (
        <span className={`${ProductStatuses[status].className} text-white px-2 py-1 rounded-md text-sm whitespace-nowrap`}>{ProductStatuses[status].text}</span>
    )
}
