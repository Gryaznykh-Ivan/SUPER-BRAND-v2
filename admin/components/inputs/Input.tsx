import React from 'react'

interface IProps {
    className?: string;
    id?: string;
    value?: any;
    name?: string;
    type: string;
    placeholder: string;
    onChange: (e: React.ChangeEvent<any>) => void
}

export default function Input({ onChange, value, placeholder, type, className, id, name }: IProps) {
    return (
        <input className={`w-full text-sm border-[1px] border-gray-300 rounded-md ${className}`} name={name} value={value} id={id} type={type} placeholder={placeholder} onChange={onChange} />
    )
}
