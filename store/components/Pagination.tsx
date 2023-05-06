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

    const maxPages = 5;
    const middlePage = Math.ceil(maxPages / 2);
    const startPage = Math.max(1, currentPage - middlePage + 1);
    const endPage = Math.min(totalPages, currentPage + middlePage - 1);

    const getPageLink = (page: number) => {
        const { handle, ...currentQuery } = router.query;
        currentQuery.page = page.toString();
        return `${basePath}?${new URLSearchParams(currentQuery as any).toString()}`
    };

    const getPagination = (length: number, start: number) => {
         return <div className="flex justify-center gap-2">
            {prevPage &&
                <Link href={getPageLink(prevPage)} className="flex justify-center items-center w-10 h-10 rounded bg-main-blue/10 text-black">
                    <svg width="4" height="8" viewBox="0 0 4 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.1665 1.49995L1.045 3.53745C0.794458 3.77808 0.794458 4.17183 1.045 4.41245L3.1665 6.44995" fill="white" />
                        <path d="M3.1665 1.49995L1.045 3.53745C0.794458 3.77808 0.794458 4.17183 1.045 4.41245L3.1665 6.44995" stroke="black" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </Link>
            }
            {Array.from({ length }, (_, i) => {
                const page = start + i;
                const isActive = page === currentPage;

                if (isActive === true) {
                    return <span key={page} className={`flex justify-center items-center w-10 h-10 rounded bg-main-blue text-white`}>{page}</span>
                } else {
                    return <Link key={page} href={getPageLink(page)} className={`flex justify-center items-center w-10 h-10 rounded bg-main-blue/10 text-black`}>{page}</Link>
                }
            })}
            {nextPage &&
                <Link href={getPageLink(nextPage)} className="flex justify-center items-center w-10 h-10 rounded bg-main-blue/10 text-black">
                    <svg width="4" height="8" viewBox="0 0 4 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.856934 6.45L2.97843 4.4125C3.22898 4.17187 3.22898 3.77812 2.97843 3.5375L0.856934 1.5" fill="white" />
                        <path d="M0.856934 6.45L2.97843 4.4125C3.22898 4.17187 3.22898 3.77812 2.97843 3.5375L0.856934 1.5" stroke="black" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </Link>
            }
        </div>
    }

    if (totalPages <= maxPages) {
        return getPagination(totalPages, 1)
    } else if (currentPage <= middlePage) {
        return getPagination(maxPages, 1)
    } else if (currentPage >= totalPages - middlePage) {
        return getPagination(maxPages, endPage - maxPages + 1)
    }

    return getPagination(endPage - startPage + 1, startPage)
}
