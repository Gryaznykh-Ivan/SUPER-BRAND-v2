import Link from 'next/link'
import React from 'react'
import SearchInput from '../../inputs/SearchInput'

export default function Provider() {
    return (
        <div className="rounded-md bg-white shadow-sm">
            <div className="flex justify-between border-b-[1px]">
                <h2 className="font-semibold p-5">Поставщик</h2>
            </div>
            {/* <div className="p-5">
                <SearchInput placeholder="Поиск по пользователям" onChange={() => { }} />
            </div> */}
            <div className="relative px-5 py-3 text-sm">
                <div className="flex justify-between">
                    <div className="flex">
                        <Link href="/users/example">
                            <div className="hover:underline">Иван Иванов</div>
                        </Link>
                        <div className="ml-2">
                            <svg className="stroke-green-800" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 13L9 17L19 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </div>
                </div>
                <div className="">+ 7 (996) 322-65-59</div>
                <div className="">test@gmail.com</div>
                <button className="absolute top-3 right-3 p-1.5 rounded-md hover:bg-gray-200">
                    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.6569 4.34315L10 10ZM10 10L4.34315 15.6569ZM10 10L15.6569 15.6569ZM10 10L4.34315 4.34315Z" fill="#D9D9D9" />
                        <path d="M15.6569 4.34315L10 10M10 10L4.34315 15.6569M10 10L15.6569 15.6569M10 10L4.34315 4.34315" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>
        </div>
    )
}
