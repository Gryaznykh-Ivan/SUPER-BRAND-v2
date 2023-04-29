import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'

interface IProps {
    basePath: string;
    currentPage: number;
    totalPages: number;
}

export default function Pagination({ basePath, currentPage, totalPages }: IProps) {
    const router = useRouter()

    const prevPage = currentPage > 1 ? currentPage - 1 : null;
    const nextPage = currentPage < totalPages ? currentPage + 1 : null;
    const maxPages = 6; // максимальное количество страниц
    const middlePage = Math.ceil(maxPages / 2); // середина

    const getPageLink = (page: number) => {
        const { handle, ...currentQuery } = router.query;

        currentQuery.page = page.toString();

        return `${basePath}?${new URLSearchParams(currentQuery as any).toString()}`
    };

    if (totalPages <= maxPages) {
        return (
            <div className="flex justify-center gap-1">
                {prevPage &&
                    <Link href={getPageLink(prevPage)} className="flex justify-center items-center w-10 h-10 rounded bg-gray-100 text-black mr-1">
                        <svg width="4" height="8" viewBox="0 0 4 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.1665 1.49995L1.045 3.53745C0.794458 3.77808 0.794458 4.17183 1.045 4.41245L3.1665 6.44995" fill="white" />
                            <path d="M3.1665 1.49995L1.045 3.53745C0.794458 3.77808 0.794458 4.17183 1.045 4.41245L3.1665 6.44995" stroke="black" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </Link>
                }
                {Array.from({ length: totalPages }, (_, i) => {
                    const page = i + 1;
                    const isActive = page === currentPage;

                    if (isActive === true) {
                        return <span key={page} className={`flex justify-center items-center w-10 h-10 rounded bg-black text-white`}>{page}</span>
                    } else {
                        return <Link key={page} href={getPageLink(page)} className={`flex justify-center items-center w-10 h-10 rounded bg-gray-100 text-black`}>{page}</Link>
                    }
                })}
                {nextPage &&
                    <Link href={getPageLink(nextPage)} className="flex justify-center items-center w-10 h-10 rounded bg-gray-100 text-black ml-1">
                        <svg width="4" height="8" viewBox="0 0 4 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.856934 6.45L2.97843 4.4125C3.22898 4.17187 3.22898 3.77812 2.97843 3.5375L0.856934 1.5" fill="white" />
                            <path d="M0.856934 6.45L2.97843 4.4125C3.22898 4.17187 3.22898 3.77812 2.97843 3.5375L0.856934 1.5" stroke="black" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </Link>
                }
            </div>
        );
    }


    const startPage = Math.max(1, currentPage - middlePage + 1);
    const endPage = Math.min(totalPages, currentPage + middlePage - 1);
    const showPrevEllipsis = startPage > 1;
    const showNextEllipsis = endPage < totalPages;

    return (
        <div className="flex justify-center gap-1">
            {prevPage &&
                <Link href={getPageLink(prevPage)} className="flex justify-center items-center w-10 h-10 rounded bg-gray-100 text-black mr-1">
                    <svg width="4" height="8" viewBox="0 0 4 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.1665 1.49995L1.045 3.53745C0.794458 3.77808 0.794458 4.17183 1.045 4.41245L3.1665 6.44995" fill="white" />
                        <path d="M3.1665 1.49995L1.045 3.53745C0.794458 3.77808 0.794458 4.17183 1.045 4.41245L3.1665 6.44995" stroke="black" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </Link>
            }
            {currentPage >= maxPages - middlePage + 2 &&
                <>
                    <Link href={getPageLink(1)} className={`flex justify-center items-center w-10 h-10 rounded ${currentPage === 1 ? "bg-black text-white" : "bg-gray-100 text-black"}`}>1</Link>
                    {showPrevEllipsis && <div className="flex justify-center items-center w-10 h-10">...</div>}
                </>
            }
            {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
                const page = startPage + i;
                const isActive = page === currentPage;

                if (isActive === true) {
                    return <span key={page} className={`flex justify-center items-center w-10 h-10 rounded bg-black text-white`}>{page}</span>
                } else {
                    return <Link key={page} href={getPageLink(page)} className={`flex justify-center items-center w-10 h-10 rounded bg-gray-100 text-black`}>{page}</Link>
                }
            })}
            {currentPage <= totalPages - maxPages + middlePage - 1 &&
                <>
                    {showNextEllipsis && <div className="flex justify-center items-center w-10 h-10">...</div>}
                    <Link href={getPageLink(totalPages)} className={`flex justify-center items-center w-10 h-10 rounded ${currentPage === totalPages ? "bg-black text-white" : "bg-gray-100 text-black"}`}>
                        {totalPages}
                    </Link>
                </>
            }
            {nextPage &&
                <Link href={getPageLink(nextPage)} className="flex justify-center items-center w-10 h-10 rounded bg-gray-100 text-black ml-1">
                    <svg width="4" height="8" viewBox="0 0 4 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.856934 6.45L2.97843 4.4125C3.22898 4.17187 3.22898 3.77812 2.97843 3.5375L0.856934 1.5" fill="white" />
                        <path d="M0.856934 6.45L2.97843 4.4125C3.22898 4.17187 3.22898 3.77812 2.97843 3.5375L0.856934 1.5" stroke="black" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </Link>
            }
        </div>
    )
}
