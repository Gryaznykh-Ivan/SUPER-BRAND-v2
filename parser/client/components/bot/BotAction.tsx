import React from 'react'

const actions = {
    REST: {
        text: "Отдыхаем",
        style: "text-gray-500"
    },
    RECEIVING_PRODUCTS_FROM_SHOP: {
        text: "Получаем список продуктов требующих обновления цен Shopify",
        style: "text-gray-500"
    },
    RECEIVING_PRODUCTS_FROM_STOCKX: {
        text: "Получаем цены продуктов Stockx",
        style: "text-gray-500"
    },
    UPLOADING_PRODUCTS: {
        text: "Загружаем актуальные данные в Shopify",
        style: "text-gray-500"
    }
}

interface IProps {
    action: string;
}

export default function BotAction({ action }: IProps) {
    return (
        <div className={actions[action as keyof typeof actions].style}>{actions[action as keyof typeof actions].text}</div>
    )
}
