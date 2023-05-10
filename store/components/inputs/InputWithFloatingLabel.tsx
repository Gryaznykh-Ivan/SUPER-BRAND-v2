import React from 'react'

interface IProps {
    id: string;
    type: string;
    className?: string;
    placeholder?: string;
    [key: string]: any;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputWithFloatingLabel({ id, type, className, placeholder, onChange, ...rest }: IProps) {
    return (
        <label htmlFor={id} className="relative block overflow-hidden">
            <input
                id={id}
                type={type}
                placeholder={placeholder}
                className={`peer placeholder-transparent ${className}`}
                {...rest}
            />
            <span className="absolute start-5 top-3 text-sm text-gray-400 -translate-y-1/2 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-1/2 peer-focus:text-sm peer-focus:top-3">{placeholder}</span>
        </label>
    )
}
