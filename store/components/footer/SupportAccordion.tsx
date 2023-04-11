import Link from 'next/link'
import React from 'react'
import Accordion from '../accordions/Accordion'

export default function SupportAccordion() {
    return <Accordion className="font-semibold" title="Поддержка">
        <div className="pb-4 px-4 flex gap-4 flex-col">
            <Link href="#" className="text-md text-text-gray">Помощь покупателю</Link>
            <Link href="#" className="text-md text-text-gray">Доставка и самовывоз</Link>
            <Link href="#" className="text-md text-text-gray">Обмен и возврат</Link>
            <Link href="#" className="text-md text-text-gray">Способы оплаты</Link>
        </div>
    </Accordion>
}
