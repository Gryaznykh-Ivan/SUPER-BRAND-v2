import React from 'react'

interface IProps {
    w?: number;
    h?: number;
}

export default function Plus({ w = 24, h = 24 }: IProps) {
    return <svg width={ w } height={ h } viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 6V12M12 12V18M12 12H18M12 12H6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
}
