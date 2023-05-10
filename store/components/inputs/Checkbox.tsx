import React from 'react'

interface IProps {
    name: string;
    checked: boolean;
    [key: string]: any;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}


export default function Checkbox({ name, checked, onChange, ...rest }: IProps) {
    return (
        <div className="relative flex justify-center items-center">
            <input type="checkbox" className="sr-only peer" name={name} checked={checked} onChange={onChange} {...rest} />
            <div className="w-4 h-4 border-[1px] border-black rounded peer-checked:bg-main-blue peer-checked:border-0"></div>
            <svg className="absolute hidden peer-checked:block" width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.78882 9.12764L3.63447 8.97047L3.55206 8.88889L1.74895 7.08578L1.75006 7.08463L0 5.33453L2.04186 3.29269L3.78985 5.04068L7.95818 0.872345L10 2.91421L5.83171 7.0825L5.59618 7.32035L3.78882 9.12764ZM2.69136 7.08153L3.78868 8.17888L3.79077 8.17679L3.7919 8.17792L4.88612 7.08369L5.12164 6.8459L9.05339 2.91421L7.95818 1.819L3.78985 5.98729L2.04186 4.2393L0.946631 5.33453L2.69251 7.08038L2.69136 7.08153Z" fill="#595AD3" />
                <path d="M2.69136 7.08153L3.78868 8.17888L3.79077 8.17679L3.7919 8.17792L4.88612 7.08369L5.12164 6.8459L9.05339 2.91421L7.95818 1.819L3.78985 5.98729L2.04186 4.2393L0.946631 5.33453L2.69251 7.08038L2.69136 7.08153Z" fill="white" />
            </svg>
        </div>
    )
}
