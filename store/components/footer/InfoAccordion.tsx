import Link from 'next/link'
import React from 'react'
import Accordion from '../accordions/Accordion'

export default function InfoAccordion() {
    return <Accordion className="text-md font-semibold" title="Информация">
        <div className="pb-4 px-4 flex gap-4 flex-col">
            <Link href="pages/about-us" className="text-md text-text-gray">О нас</Link>
            <Link href="/pages/cooperation" className="text-md text-text-gray">Сотрудничество</Link>
            <Link href="/pages/job" className="text-md text-text-gray">Вакансии</Link>
            <Link href="/pages/blog" className="text-md text-text-gray">Блог</Link>
        </div>
    </Accordion>
}
