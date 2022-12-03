import React, { useRef, useState } from 'react'
import PlusIcon from '../icons/Plus';

interface IProps {
    question: string;
    answer: string;
}

export default function TextAccordion({ question, answer }: IProps) {
    const [isOpened, setIsOpened] = useState(false)
    const ref = useRef<HTMLParagraphElement>(null)

    const onToggle = () => {
        setIsOpened(prev => !prev)
    }

    return (
        <div className="w-full">
            <div className={`flex justify-between items-center py-3 cursor-pointer hover:bg-gray-100 rounded-lg px-4 ${isOpened && "bg-gray-100"}`} onClick={onToggle}>
                <h2 className={`${isOpened ? "font-semibold" : "font-normal"}`}>{question}</h2>
                <div className={`ml-2 transition-transform duration-300 ${isOpened ? "rotate-45" : "rotate-0"}`}>
                    <PlusIcon />
                </div>
            </div>
            <div className="overflow-hidden transition-all duration-300 px-4" style={({ height: isOpened ? ref.current?.clientHeight : 0 })}>
                <p className="py-4" ref={ref}>{answer}</p>
            </div>
        </div>
    )
}
