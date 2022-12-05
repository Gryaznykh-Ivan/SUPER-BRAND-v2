import React from 'react'

interface IProps {
    className?: string;
    id?: string;
    rows?: number;
    placeholder: string;
    onChange: () => void
}

export default function TextArea({ onChange, placeholder, className, id, rows=5 }: IProps) {
    return (
        <textarea className={`w-full text-sm border-[1px] border-gray-300 rounded-md ${className}`} id={id} placeholder={placeholder} rows={ rows } onChange={onChange} />
    )
}
