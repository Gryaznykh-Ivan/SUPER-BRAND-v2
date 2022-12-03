import React from 'react'

interface IProps {
    className?: string;
    w?: number;
    h?: number;
}

export default function Check({ w=24, h=24, className="stroke-black" }: IProps) {
    return <svg className={ className } width={ w } height={ h } viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 13L9 17L19 7" stroke="inherit" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>

}