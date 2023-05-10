import React, { useState } from 'react'

export default function UserPhone() {
    const [phone, setPhone] = useState("");

    const onPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (phone.length < e.target.value.length) {
            const phoneNumbers = e.target.value.replace(/[^0-9]/g, "");

            let phoneMask = "+* (***) ***-**-**";
            for (const number of phoneNumbers) {
                phoneMask = phoneMask.replace("*", number)
            }

            const index = phoneMask.split("").findIndex(c => c === "*")
            phoneMask = phoneMask.substring(0, index === -1 ? phoneMask.length : index)
            
            setPhone(phoneMask);
        } else {
            setPhone(e.target.value);
        }
    }

    return (
        <div className="space-y-5">
            <div className="text-lg">Номер телефона</div>
            <input type="text" className="w-full h-11 py-4 px-5 text-base border-[1px] border-line-divider rounded-lg focus:outline-none" placeholder="Номер телефона" value={phone} onChange={onPhoneChange} />
            <div className="space-y-3">
                <div className="text-base text-text-gray">Номер телефона необходим для входа в личный кабинет и оформления заказа.</div>
                <div className="text-base text-text-gray">При изменении номера телефона вам придется его подтвердить.</div>
            </div>
        </div>
    )
}
