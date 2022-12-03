import React from 'react'
import Link from 'next/link'

export default function Footer() {
    return (
        <div className="p-8 bg-white">
            <div className="container grid grid-cols-1 gap-10 md:grid-cols-4">
                <div className="max-w-[200px] md:max-w-none">
                    <div className="uppercase font-bold text-xxs mb-5">ПОМОЩЬ</div>
                    <div className="text-base">
                        <Link href="/information/ways-of-payment" className="block leading-6 text-gray-600">Способ оплаты</Link>
                        <Link href="/information/delivery" className="block leading-6 text-gray-600">Доставка и самовывоз</Link>
                        <Link href="/information/faq" className="block leading-6 text-gray-600">Частные вопросы</Link>
                    </div>
                </div>
                <div className="max-w-[200px] md:max-w-none">
                    <div className="uppercase font-bold text-xxs mb-5">ПОЛИТИКИ И УСЛОВИЯ</div>
                    <div className="text-base">
                        <Link href="/information/refund-policy" className="block leading-6 text-gray-600">Обмен и возврат</Link>
                        <Link href="/information/privacy-policy" className="block leading-6 text-gray-600">Политика конфиденциальности</Link>
                        <Link href="/information/terms-of-service" className="block leading-6 text-gray-600">Условия предоставления услуг</Link>
                    </div>
                </div>
                <div className="max-w-[200px] md:max-w-none">
                    <div className="uppercase font-bold text-xxs mb-5">СЛУЖБА КЛИЕНТСКОЙ ПОДДЕРЖКИ</div>
                    <div className="text-base">
                        <a href="mailto:support@thesortage.com" className="block leading-6 text-gray-600">support@thesortage.com</a>
                        <a href="tel:+7(995)788-00-58" className="block leading-6 text-gray-600">+7(995)788-00-58</a>
                        <div className="block leading-6 mt-3 text-gray-600">Звонки принимаются ежедневно</div>
                        <div className="block leading-6 text-gray-600">с 10:00 до 22:00 по МСК.</div>
                    </div>
                </div>
                <div className="max-w-[250px] md:max-w-none">
                    <div className="uppercase font-bold text-xxs mb-5">АДРЕС МАГАЗИНА</div>
                    <div className="text-base">
                        <div className="block leading-6 text-gray-600">Москва, Кутузовский проспект 48 Галереи Времена Года, 3 этаж.</div>
                        <div className="block leading-6 mt-3 text-gray-600">Время работы: ежедневно с 11:00 до 22:00.</div>
                    </div>
                </div>
            </div>
            <div className="text-xxs text-center mt-8">© 2022, Super Brand</div>
        </div>
    )
}
