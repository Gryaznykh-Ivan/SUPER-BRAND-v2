import React from 'react'

interface IProps {
    className?: string;
    id?: string;
    rows?: number;
    value?: string;
    name?: string;
    placeholder: string;
    onChange: (e: React.ChangeEvent<any>) => void
}

export default function TextArea({ onChange, placeholder, className, id, rows = 5, value, name }: IProps) {
    return (
        <textarea className={`w-full text-sm border-[1px] border-gray-300 rounded-md ${className}`} name={ name } value={value} id={id} placeholder={placeholder} rows={rows} onChange={onChange} />
    )
}
