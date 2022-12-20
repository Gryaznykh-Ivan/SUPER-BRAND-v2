import React, { useRef, useState } from 'react'

interface IProps {
    name: string;
    content: JSX.Element;
}

export default function JSXAccordion({ name, content }: IProps) {
    const [isOpened, setIsOpened] = useState(false)
    const ref = useRef<HTMLParagraphElement>(null)

    const onToggle = () => {
        setIsOpened(prev => !prev)
    }

    return (
        <div className="w-full">
            <div className={`flex justify-between items-center py-3 cursor-pointer hover:bg-gray-100 px-4 ${isOpened && "bg-gray-50"}`} onClick={onToggle}>
                <div className="flex items-center">
                    <h2 className="ml-3">{name}</h2>
                </div>
                <div className={`ml-2 transition-transform duration-300 ${isOpened ? "rotate-45" : "rotate-0"}`}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 6V12M12 12V18M12 12H18M12 12H6" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </div>
            </div>
            <div className="overflow-hidden transition-all duration-300" style={({ height: isOpened ? ref.current?.clientHeight : 0 })}>
                <div className="" ref={ref}>{content}</div>
            </div>
        </div>
    )
}
