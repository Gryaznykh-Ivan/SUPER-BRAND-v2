import Link from 'next/link'
import React from 'react'
import Accordion from '../accordions/Accordion'

export default function DeliveryAndPaymentAccordion() {
    return <Accordion title="Оплата и доставка">
        <div className="pb-4 px-4 flex gap-4 flex-col text-md">
            <p>Мы предлагаем бесплатный обмен и полный возврат для всех заказов при следующих условиях:</p>
            <ul>
                <li>1) товар не был в употреблении (стиран, ношен);</li>
                <li>2) сохранены его товарный вид, потребительские свойства;</li>
                <li>3) пломбы, фабричные ярлыки, в том числе КИЗ (контрольно-идентификационный знак) на товаре или его упаковке (в зависимости от того, что применимо) должны быть целыми, не мятыми и не повреждёнными.</li>
            </ul>
            <p>Больше информации можно найти на этой странице.</p>
        </div>
    </Accordion>
}
