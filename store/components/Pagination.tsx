import Link from 'next/link'
import React from 'react'

export default function Pagination() {
    return (
        <div className="flex justify-center gap-1">
            <Link href="#" className="flex justify-center items-center w-10 h-10 rounded bg-gray-100 text-black mr-1">
                <svg width="4" height="8" viewBox="0 0 4 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.1665 1.49995L1.045 3.53745C0.794458 3.77808 0.794458 4.17183 1.045 4.41245L3.1665 6.44995" fill="white" />
                    <path d="M3.1665 1.49995L1.045 3.53745C0.794458 3.77808 0.794458 4.17183 1.045 4.41245L3.1665 6.44995" stroke="black" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </Link>
            <Link href="#" className="flex justify-center items-center w-10 h-10 rounded bg-black text-white">1</Link>
            <Link href="#" className="flex justify-center items-center w-10 h-10 rounded bg-gray-100 text-black">2</Link>
            <Link href="#" className="flex justify-center items-center w-10 h-10 rounded bg-gray-100 text-black">3</Link>
            <Link href="#" className="flex justify-center items-center w-10 h-10 rounded bg-gray-100 text-black">4</Link>
            <Link href="#" className="flex justify-center items-center w-10 h-10 rounded bg-gray-100 text-black">5</Link>
            <Link href="#" className="flex justify-center items-center w-10 h-10 rounded bg-gray-100 text-black ml-1">
                <svg width="4" height="8" viewBox="0 0 4 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.856934 6.45L2.97843 4.4125C3.22898 4.17187 3.22898 3.77812 2.97843 3.5375L0.856934 1.5" fill="white" />
                    <path d="M0.856934 6.45L2.97843 4.4125C3.22898 4.17187 3.22898 3.77812 2.97843 3.5375L0.856934 1.5" stroke="black" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </Link>
        </div>
    )
}
