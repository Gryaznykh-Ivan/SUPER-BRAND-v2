import React from 'react'

interface IProps {
    w?: number;
    h?: number;
}

export default function Refund({ w=24, h=24 }: IProps) {
    return <svg width={ w } height={ h } viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 15V14C16 12.9391 15.5786 11.9217 14.8284 11.1716C14.0783 10.4214 13.0609 10 12 10H8M8 10L11 13M8 10L11 7M20 21V5C20 4.46957 19.7893 3.96086 19.4142 3.58579C19.0391 3.21071 18.5304 3 18 3H6C5.46957 3 4.96086 3.21071 4.58579 3.58579C4.21071 3.96086 4 4.46957 4 5V21L8 19L12 21L16 19L20 21Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>

}