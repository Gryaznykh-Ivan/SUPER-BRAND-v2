import React from 'react'

interface IProps {
    className?: string;
    id?: string;
    options: Object;
    onChange: () => void
}

export default function Select({ onChange, options, className, id }: IProps) {
    return (
        <select className={`cursor-pointer w-full text-sm border-[1px] border-gray-300 rounded-md ${className}`} id={id} onChange={onChange} >
            {Object.entries(options).map(([key, value]) => <option key={ key } value={ key }>{ value }</option>)}
        </select>
    )
}
