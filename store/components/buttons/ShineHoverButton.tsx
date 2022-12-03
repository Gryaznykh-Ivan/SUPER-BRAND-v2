import React from 'react'

interface IProps {
    className?: string;
    children: React.ReactNode;
}

export default function ShineHoverButton({ className="", children }: IProps) {
    return (
        <button className={`group flex justify-center items-center relative cursor-pointer py-3 px-8 rounded-lg font-semibold overflow-hidden hover:scale-[102%] ${ className }`}>
            <div className="text-sm md:text-xl">{ children }</div>
            <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-gray-300 opacity-40 group-hover:animate-shine" />
        </button>
    );
}
