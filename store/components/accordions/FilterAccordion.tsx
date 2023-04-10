import React from 'react'

interface IProps {
    title: string;
    children: JSX.Element;
}

export default function FilterAccordion({ title, children }: IProps) {
    return (
        <details className="group [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex items-center justify-between cursor-pointer group-open:border-b-[1px] border-line-divider pr-2">
                <div className="flex items-center text-md font-medium h-11 border-b-[1px] group-open:border-black border-transparent">
                    {title}
                </div>
                <div className="flex-shrink-0 transition duration-200 group-open:-rotate-180">
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.03996 1.15234L4.29996 4.54675C4.68496 4.94762 5.31496 4.94762 5.69996 4.54675L8.95996 1.15234" fill="white" />
                        <path d="M1.03996 1.15234L4.29996 4.54675C4.68496 4.94762 5.31496 4.94762 5.69996 4.54675L8.95996 1.15234" stroke="#6E6E6E" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            </summary>
            {children}
        </details>
    )
}
