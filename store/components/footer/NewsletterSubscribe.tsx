import React from 'react'

export default function NewsletterSubscribe() {
    return (
        <div className="pt-8 flex flex-col gap-8 lg:flex-row md:p-16">
            <div className="">
                <div className="font-semibold tracking-widest text-xl leading-6">Подписывайтесь на нашу новостную рассылку</div>
                <div className="text-base tracking-widest mt-4">Подпишитесь и получите эксклюзивный ранний доступ к скидкам и новым поступлениям</div>
            </div>
            <div className="">
                <div className="text-base tracking-widest font-medium uppercase mb-2">адрес электронной почты</div>
                <div className="w-full flex flex-col gap-6 md:flex-row">
                    <input type="text" className="h-11 border-b-[1px] border-line-divider outline-none bg-transparent md:flex-1" />
                    <button className="h-11 bg-black text-white uppercase px-10">Подписаться</button>
                </div>
                <div className="text-sm text-text-gray mt-3">Подписываясь, вы подтверждаете, что хотите получать письма от Brandname, а также принимаете наши Условия предоставления услуг и Политику конфиденциальности.</div>
            </div>
        </div>
    )
}
