import React from 'react'

export default function Authorization() {
    return (
        <form className="text-center space-y-10 max-w-sm px-4 md:px-0">
            <div className="text-lg">Вход или регистрация</div>
            <div className="text-base text-text-gray">Введите номер телефона, мы отправим вам СМС с кодом подтверждения</div>
            <div className="flex flex-col space-y-4">
                <input type="text" className="h-14 text-md outline-none text-center border-b-[1px] border-line-divider" placeholder="Введите номер" inputMode="numeric" />
                <input type="text" className="h-14 text-md outline-none text-center border-b-[1px] border-line-divider" maxLength={4} placeholder="Введите код из СМС" inputMode="numeric" />
            </div>
            <div className="space-y-2">
                <button className="w-full h-14 bg-black text-white text-base font-medium rounded-xl">Продолжить</button>
                <button className="w-full h-14 bg-main-blue text-white text-base font-medium rounded-xl">Продолжить</button>
                <button className="w-full h-14 bg-main-blue/10 text-black text-base rounded-xl">Отправить код еще раз</button>
                <button className="w-full h-14 bg-main-blue/10 text-black text-base rounded-xl">Изменить номер телефона</button>
            </div>
            <div className="text-base text-text-gray">Оплата за отправку СМС-сообщения не взимается</div>
        </form>
    )
}
