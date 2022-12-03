import React from 'react'

interface IProps {
    w?: number;
    h?: number;
}

export default function Cross({ w = 24, h = 24 }: IProps) {
    return <svg width={ w } height={ h } viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 3L12 12M12 12L3 21M12 12L21 21M12 12L3 3" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>



}
