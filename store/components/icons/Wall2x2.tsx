import React from 'react'

interface IProps {
    className?: string;
    w?: number;
    h?: number;
}

export default function Wall2x2({ w = 24, h = 24, className="" }: IProps) {
    return (
        <svg className={ className } width={ w } height={ h } viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="3" width="7" height="7" rx="2" stroke="inherit" strokeWidth="2" />
            <rect x="14" y="3" width="7" height="7" rx="2" stroke="inherit" strokeWidth="2" />
            <rect x="3" y="14" width="7" height="7" rx="2" stroke="inherit" strokeWidth="2" />
            <rect x="14" y="14" width="7" height="7" rx="2" stroke="inherit" strokeWidth="2" />
        </svg>

    )
}
