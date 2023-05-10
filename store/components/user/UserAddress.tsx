import React from 'react'
import InputWithFloatingLabel from '../inputs/InputWithFloatingLabel'

export default function UserAddress() {
    return (
        <div className="space-y-5">
            <div className="text-lg">Адрес доставки</div>
            <div className="space-y-3">
                <InputWithFloatingLabel
                    id="country"
                    type="text"
                    className="w-full h-11 pt-3 px-5 text-base border-[1px] border-line-divider rounded-lg focus:outline-none capitalize"
                    placeholder="Cтрана"
                    onChange={() => {}}
                />
                <InputWithFloatingLabel
                    id="country"
                    type="text"
                    className="w-full h-11 pt-3 px-5 text-base border-[1px] border-line-divider rounded-lg focus:outline-none capitalize"
                    placeholder="Регион"
                    onChange={() => {}}
                />
                <InputWithFloatingLabel
                    id="country"
                    type="text"
                    className="w-full h-11 pt-3 px-5 text-base border-[1px] border-line-divider rounded-lg focus:outline-none capitalize"
                    placeholder="Город"
                    onChange={() => {}}
                />
                <InputWithFloatingLabel
                    id="country"
                    type="text"
                    className="w-full h-11 pt-3 px-5 text-base border-[1px] border-line-divider rounded-lg focus:outline-none capitalize"
                    placeholder="Улица"
                    onChange={() => {}}
                />
            </div>
        </div>
    )
}
