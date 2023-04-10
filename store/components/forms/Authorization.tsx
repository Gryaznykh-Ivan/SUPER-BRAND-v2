import React from 'react'

export default function Authorization() {
    return (
        <form className="text-center space-y-10 max-w-sm px-4 md:px-0">
            <div className="text-xl">Вход или регистрация</div>
            <div className="text-md text-text-gray">Введите номер телефона, мы отправим вам СМС с кодом подтверждения</div>
            <div className="flex flex-col space-y-4">
                <input type="text" className="h-14 text-md outline-none text-center border-b-[1px] border-line-divider focus:bg-main-gray" placeholder="Номер должен начинаться с +7" inputMode="numeric" />
                <input type="text" className="h-14 text-xl outline-none text-center border-b-[1px] border-line-divider focus:bg-main-gray tracking-widest" maxLength={4} placeholder="****" inputMode="numeric" />
            </div>
            <button className="w-full h-14 bg-black text-white text-md font-medium rounded-xl">Продолжить</button>
            <div className="text-md text-text-gray">Оплата за отправку СМС-сообщения не взимается</div>
        </form>
    )
}
