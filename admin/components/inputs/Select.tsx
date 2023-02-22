import React from 'react'

interface IProps {
    className?: string;
    id?: string;
    value?: string;
    name?: string;
    options: Object;
    onChange: (e: React.ChangeEvent<any>) => void
}

export default function Select({ onChange, options, className, id, value, name }: IProps) {
    return (
        <select className={`cursor-pointer w-full text-sm border-[1px] border-gray-300 rounded-md ${className}`} name={ name } value={ value } id={id} onChange={onChange}>
            {Object.entries(options).map(([key, value]) => <option key={ key } value={ key }>{ value }</option>)}
        </select>
    )
}
