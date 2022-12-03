import React, { useEffect, useMemo, useState } from 'react'
import Link from 'next/link';
import { useRouter } from 'next/router'
import { IPaginationPage } from '../../types';
import { Context } from 'next-redux-wrapper';

interface IProps {
    page: string;
    productPerPage: number;
    totalProductCount: number;
    onPageChange: (skip: number, limit: number) => void;
}

export default function Pagination({ page, productPerPage, totalProductCount, onPageChange }: IProps) {
    const router = useRouter()

    const totalPageCount = useMemo(() => {
        return Math.ceil(totalProductCount / productPerPage)
    }, [productPerPage, totalProductCount])

    const [pagination, setPagination] = useState<IPaginationPage[]>(createPaginationPanel(page))

    function createPaginationPanel(page: string) {
        const items: IPaginationPage[] = []
        const pageBreakOffset = 2

        console.log();

        if (page === undefined) return []

        const pageIndex = +page
        if (isNaN(pageIndex) === true) return []

        if (pageIndex - pageBreakOffset > 0) {
            for (let i = pageIndex - pageBreakOffset; i < pageIndex; i++) {
                items.push({
                    id: i,
                    title: i.toString(),
                    isActive: false,
                    search: {
                        pathname: router.pathname,
                        query: {
                            ...router.query,
                            page: i
                        }
                    },
                    skip: (i - 1) * productPerPage,
                    limit: productPerPage
                })
            }
        } else {
            for (let i = 1; i < pageIndex; i++) {
                items.push({
                    id: i,
                    title: i.toString(),
                    isActive: false,
                    search: {
                        pathname: router.pathname,
                        query: {
                            ...router.query,
                            page: i
                        }
                    },
                    skip: (i - 1) * productPerPage,
                    limit: productPerPage
                })
            }
        }

        items.push({
            id: pageIndex,
            title: page,
            isActive: true,
            search: {
                pathname: router.pathname,
                query: {
                    ...router.query,
                    page: pageIndex
                }
            },
            skip: pageIndex * productPerPage,
            limit: productPerPage
        })

        if (pageIndex + pageBreakOffset < totalPageCount) {
            for (let i = pageIndex + 1; i < pageIndex + pageBreakOffset + 1; i++) {
                items.push({
                    id: i,
                    title: i.toString(),
                    isActive: false,
                    search: {
                        pathname: router.pathname,
                        query: {
                            ...router.query,
                            page: i
                        }
                    },
                    skip: (i - 1) * productPerPage,
                    limit: productPerPage
                })
            }
        } else {
            for (let i = pageIndex + 1; i < totalPageCount + 1; i++) {
                items.push({
                    id: i,
                    title: i.toString(),
                    isActive: false,
                    search: {
                        pathname: router.pathname,
                        query: {
                            ...router.query,
                            page: i
                        }
                    },
                    skip: (i - 1) * productPerPage,
                    limit: productPerPage
                })
            }
        }


        if (items[items.length - 1].id <= totalPageCount - pageBreakOffset + 1) {
            if (items[items.length - 1].id !== totalPageCount - pageBreakOffset + 1) {
                items.push({
                    id: -2,
                    title: "...",
                    isActive: false,
                    search: {
                        pathname: "#",
                    },
                    limit: 0,
                    skip: 0,
                })
            }

            items.push({
                id: totalPageCount,
                title: totalPageCount.toString(),
                isActive: false,
                search: {
                    pathname: router.pathname,
                    query: {
                        ...router.query,
                        page: totalPageCount
                    }
                },
                skip: (totalPageCount - 1) * productPerPage,
                limit: productPerPage
            })
        }

        if (items[0].id >= pageBreakOffset) {
            if (items[0].id !== pageBreakOffset) {
                items.unshift({
                    id: -1,
                    title: "...",
                    isActive: false,
                    search: {
                        pathname: "#",
                    },
                    limit: 0,
                    skip: 0,
                })
            }

            items.unshift({
                id: 1,
                title: "1",
                isActive: false,
                search: {
                    pathname: router.pathname,
                    query: {
                        ...router.query,
                        page: 1
                    }
                },
                skip: 0,
                limit: productPerPage
            })
        }

        return items
    }

    const updatePaginationPanel = (page: string) => {
        setPagination(createPaginationPanel(page))
    }

    useEffect(() => {
        updatePaginationPanel(page)

        const pageData = pagination.find(a => a.isActive === true)
        if (pageData === undefined) return

        onPageChange(pageData.skip, pageData.limit)
    }, [page])

    return (
        <div className="flex items-center justify-center my-4 flex-nowrap">
            {pagination.map(page =>
                <div key={page.id} className="">
                    {page.search.pathname === "#" ?
                        (
                            <div className="w-5 py-3 flex items-center justify-center text-gray-400">
                                {page.title}
                            </div>
                        ) : (
                            <Link href={page.search} scroll={ false } className={`w-10 py-3 flex items-center justify-center rounded-lg ${page.isActive && "bg-gray-200"}`}>
                                {page.title}
                            </Link>
                        )
                    }
                </div>
            )
            }
        </div >
    )
}