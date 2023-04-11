import Link from 'next/link'
import React from 'react'
import Accordion from '../accordions/Accordion'

export default function InfoAccordion() {
    return <Accordion className="font-semibold" title="Информация">
        <div className="pb-4 px-4 flex gap-4 flex-col">
            <Link href="#" className="text-md text-text-gray">О нас</Link>
            <Link href="#" className="text-md text-text-gray">Сотрудничество</Link>
            <Link href="#" className="text-md text-text-gray">Вакансии</Link>
            <Link href="#" className="text-md text-text-gray">Блог</Link>
        </div>
    </Accordion>
}
