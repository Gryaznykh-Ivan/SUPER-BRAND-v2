import React from 'react'

interface IProps {
    className?: string;
    w?: number;
    h?: number;
}

export default function wall({ w = 26, h = 26, className="" }: IProps) {
    return (
        <svg className={ className } width={ w } height={ h } viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="1.95996" y="1.95996" width="4.8" height="4.8" rx="2" stroke="inherit" strokeWidth="2" />
            <rect x="10.6001" y="1.95996" width="4.8" height="4.8" rx="2" stroke="inherit" strokeWidth="2" />
            <rect x="19.2402" y="1.95996" width="4.8" height="4.8" rx="2" stroke="inherit" strokeWidth="2" />
            <rect x="1.95996" y="10.6001" width="4.8" height="4.8" rx="2" stroke="inherit" strokeWidth="2" />
            <rect x="10.6001" y="10.6001" width="4.8" height="4.8" rx="2" stroke="inherit" strokeWidth="2" />
            <rect x="19.2402" y="10.6001" width="4.8" height="4.8" rx="2" stroke="inherit" strokeWidth="2" />
            <rect x="1.95996" y="19.24" width="4.8" height="4.8" rx="2" stroke="inherit" strokeWidth="2" />
            <rect x="10.6001" y="19.24" width="4.8" height="4.8" rx="2" stroke="inherit" strokeWidth="2" />
            <rect x="19.2402" y="19.24" width="4.8" height="4.8" rx="2" stroke="inherit" strokeWidth="2" />
        </svg>
    )
}
