import React from 'react'

interface IProps {
    className?: string;
    id?: string;
    value?: any;
    name?: string;
    onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type: string;
    placeholder: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({ onChange, onBlur, value, placeholder, type, className, id, name }: IProps) {
    return (
        <input className={`w-full text-sm border-[1px] border-gray-300 rounded-md ${className}`} name={name} value={value} id={id} type={type} placeholder={placeholder} onChange={onChange} onBlur={ onBlur } />
    )
}
