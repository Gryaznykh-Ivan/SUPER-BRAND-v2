import React, { useMemo, useRef, useState } from 'react'
import PlusIcon from '../icons/Plus';

interface IProps {
    title: string;
    content: JSX.Element;
}

export default function FilterAccordion({ title, content }: IProps) {
    const [isOpened, setIsOpened] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    const style = useMemo(() => ({ height: isOpened ? ref.current?.clientHeight : 0 }), [isOpened])

    const onToggle = () => {
        setIsOpened(prev => !prev)
    }

    return (
        <div className="w-full">
            <div className={`flex justify-between items-center py-3 cursor-pointer hover:bg-gray-100 px-4 ${isOpened && "bg-gray-100 font-semibold"}`} onClick={onToggle}>
                <div className={`flex items-center`}>
                    <h2>{title}</h2>
                </div>
                <div className={`ml-2 transition-transform duration-300 ${isOpened ? "rotate-45" : "rotate-0"}`}>
                    <PlusIcon />
                </div>
            </div>
            <div className="overflow-hidden transition-all duration-300 px-4" style={style}>
                <div className="py-4" ref={ref}>{content}</div>
            </div>
        </div>
    )
}
