import React from 'react'
import Checkbox from '../inputs/Checkbox'

export default function UserEmail() {
    return (
        <div className="space-y-5">
            <div className="text-lg">Адрес электронной почты</div>
            <input type="text" className="w-full h-11 py-4 px-5 text-base border-[1px] border-line-divider rounded-lg focus:outline-none" placeholder="Адрес электронной почты" />
            <div className="flex items-start gap-3">
                <Checkbox id="stockDiscountInfo" name="stockDiscountInfo" checked={true} onChange={() => { }} />
                <label htmlFor="stockDiscountInfo" className="text-base leading-4">Отправляйте мне информацию об акциях и скидках</label>
            </div>
            <div className="text-base text-text-gray">На электронную почту будут приходить письма с подтверждением заказа и обновлением его статуса.</div>
        </div>
    )
}
