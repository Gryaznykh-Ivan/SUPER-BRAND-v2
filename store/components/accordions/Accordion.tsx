import React from 'react'

interface IProps {
    title: string;
    children: JSX.Element;
}

export default function Accordion({ title, children }: IProps) {
    return (
        <details className="group [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex items-center justify-between p-4 rounded-lg cursor-pointer">
                <span className="text-md font-semibold">
                    {title}
                </span>
                <svg className="flex-shrink-0 m-2 transition duration-200 group-open:-rotate-180" width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.75 1L5 5L1.25 1" stroke="black" strokeLinecap="square" />
                </svg>
            </summary>
            {children}
        </details>
    )
}
