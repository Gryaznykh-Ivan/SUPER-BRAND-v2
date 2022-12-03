import React from 'react'

interface IProps {
    w?: number;
    h?: number;
}


export default function Sort({ w=24, h=24 }: IProps) {
    return (
        <svg width={ w } height={ h } viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17 20L21 16M3 4H16H3ZM3 8H12H3ZM3 12H12H3ZM17 8V20V8ZM17 20L13 16L17 20Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

    )
}
