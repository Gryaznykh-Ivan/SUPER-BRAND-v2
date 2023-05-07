import React from 'react'

interface IProps {
    className?: string;
    title: string;
    children: JSX.Element;
}

export default function Accordion({ title, children, className }: IProps) {
    return (
        <details className="group [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex items-center justify-between p-4 rounded-lg cursor-pointer">
                <div className={className}>
                    {title}
                </div>
                <div className="flex-shrink-0 transition duration-200 group-open:-rotate-180">
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.75 1L5 5L1.25 1" stroke="black" stroke-linecap="square" />
                    </svg>
                </div>
            </summary>
            {children}
        </details>
    )
}
