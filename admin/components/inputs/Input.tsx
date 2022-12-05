import React from 'react'

interface IProps {
    className?: string;
    id?: string;
    value?: any;
    type: string;
    placeholder: string;
    onChange: () => void
}

export default function Input({ onChange, value, placeholder, type, className, id }: IProps) {
    return (
        <input className={`w-full text-sm border-[1px] border-gray-300 rounded-md ${className}`} value={ value } id={ id } type={type} placeholder={placeholder} onChange={onChange} />
    )
}
