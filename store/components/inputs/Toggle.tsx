import React, { useState } from 'react'

interface IProps {
    name: string;
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Toggle({ name, checked, onChange }: IProps) {
    return (
        <div className="relative">
            <input type="checkbox" className="sr-only peer" name={name} checked={checked} onChange={onChange} />
            <div className="w-[30px] h-4 bg-line-divider rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[1px] after:left-[1px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-[14px] after:w-[14px] after:transition-all peer-checked:bg-green-600"></div>
        </div>
    )
}
