import React from 'react'
import { Service } from '../../../types/store';

interface IProps {
    type: Service;
}

const serviceType = {
    "DISCOUNT": {
        className: "",
        text: "Скидка"
    },
    "SHIPPING": {
        className: "",
        text: "Доставка"
    }
}

export default function ServiceType({ type }: IProps) {
    return (
        <span className={`${serviceType[type].className}`}>{serviceType[type].text}</span>
    )
}
