import React from 'react'

export default function UserName() {
    return (
        <div className="space-y-5">
            <div className="text-lg">Имя и фамилия</div>
            <div className="space-y-3">
                <input type="text" className="w-full h-11 py-4 px-5 text-base border-[1px] border-line-divider rounded-lg focus:outline-none capitalize" placeholder="Имя" />
                <div className="">
                    <input type="text" className="w-full h-11 py-4 px-5 text-base border-[1px] border-main-red rounded-lg focus:outline-none capitalize" placeholder="Фамилия" />
                    <div className="text-main-red text-sm mt-2">Фамилия должна состоять из букв и быть длиной от 1 до 32 символов</div>
                </div>
            </div>
            <div className="text-base text-text-gray">
                Эти данные необходимы для более быстрого оформления заказа, а также для его получения.
            </div>
        </div>
    )
}
