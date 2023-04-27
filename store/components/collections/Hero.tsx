import React, { useEffect, useRef, useState } from 'react'

interface IProps {
    title: string;
    description: string;
}

export default function Hero({ title, description }: IProps) {
    const descriptionRef = useRef<HTMLParagraphElement>(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const [canExpand, setCanExpand] = useState(false);

    useEffect(() => {
        const resetCanExpand = () => {
            if (!descriptionRef.current) return;

            setCanExpand(descriptionRef.current.scrollHeight > descriptionRef.current.offsetHeight);
        }

        resetCanExpand();

        let resizeTimeout: NodeJS.Timeout;
        const handleResize = () => {
            clearTimeout(resizeTimeout);

            resizeTimeout = setTimeout(resetCanExpand, 100);
        }

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [isExpanded]);

    const onToggleExpanded = () => {
        setIsExpanded(prev => !prev);
    }

    return (
        <div className="flex flex-col items-center py-10 px-8 md:px-10 border-b-[1px] border-line-divider">
            <div className="container px-4 md:px-10 max-w-[800px] text-center">
                <h1 className="text-xl tracking-widest font-medium uppercase mb-4">{title}</h1>
                <p className={`${isExpanded === false ? "line-clamp-3" : ""} prose max-w-full`} ref={descriptionRef} dangerouslySetInnerHTML={{ __html: description }}></p>
                {(canExpand === true || isExpanded === true) &&
                    <button className="text-md font-normal underline" onClick={onToggleExpanded}>{isExpanded === true ? "Скрыть" : "Читать дальше"}</button>
                }
            </div>
        </div>
    )
}
