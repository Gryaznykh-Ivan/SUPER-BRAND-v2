import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import Breadcrumb from '../../components/Breadcrumbs'
import FeaturedProducts from '../../components/collections/FeaturedProducts'
import RecentlyViewed from '../../components/collections/RecentlyViewed'
import Hero from '../../components/collections/Hero'
import MainLayout from '../../components/layouts/Main'
import Pagination from '../../components/Pagination'
import ProductCard from '../../components/products/ProductCard'
import ProductFilterSort from '../../components/products/ProductFilterSort'
import { wrapper } from '@/store'
import { collectionService, useGetCollectionInfoByHandleQuery, useGetCollectionProductsByHandleQuery } from '@/services/collectionService'
import { useRouter } from 'next/router'
import { IErrorResponse } from '@/types/api'

const productsPerPage = 20

interface IInitialProps {
    handle: string;
    skip: number;
    limit: number;
}

function Collection({ handle, skip, limit }: IInitialProps) {
    const { isFetching: isCollectionInfoFetching, isError: isCollectionInfoError, error: collectionInfoError, data: collectionInfoData } = useGetCollectionInfoByHandleQuery({ handle })
    const { isFetching: isCollectionProductsFetching, isError: isCollectionProductsError, error: collectionProductsError, data: collectionProductsData } = useGetCollectionProductsByHandleQuery({ handle, skip, limit })

    return (
        <MainLayout>
            <div className="">
                {isCollectionInfoFetching === true &&
                    <div className="flex justify-center border-2 p-5 z-10 ">
                        <svg className="animate-spin" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 3.99999V8.99999H4.582M4.582 8.99999C5.24585 7.35812 6.43568 5.9829 7.96503 5.08985C9.49438 4.1968 11.2768 3.8364 13.033 4.06513C14.7891 4.29386 16.4198 5.09878 17.6694 6.35377C18.919 7.60875 19.7168 9.24285 19.938 11M4.582 8.99999H9M20 20V15H19.419M19.419 15C18.7542 16.6409 17.564 18.015 16.0348 18.9073C14.5056 19.7995 12.7237 20.1595 10.9681 19.9309C9.21246 19.7022 7.5822 18.8979 6.33253 17.6437C5.08287 16.3896 4.28435 14.7564 4.062 13M19.419 15H15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                }
                {isCollectionInfoFetching === false && isCollectionInfoError === true &&
                    <div className="flex flex-col items-center py-5">
                        <div className="text-2xl font-bold text-red-600">Что-то пошло не так</div>
                        {(collectionInfoError && "status" in collectionInfoError) &&
                            <div className="text-gray-500">{(collectionInfoError.data as IErrorResponse)?.message}</div>
                        }
                    </div>
                }
                {isCollectionInfoFetching === false && isCollectionInfoError === false && collectionInfoData?.data &&
                    <>
                        <Head>
                            <title>{collectionInfoData.data.metaTitle}</title>
                            <meta name="description" content={collectionInfoData.data.metaDescription} />
                        </Head>
                        <Hero
                            title={collectionInfoData.data.title}
                            description={collectionInfoData.data.description}
                        />

                        <div className="container px-4 md:px-10 py-8 space-y-8">
                            <Breadcrumb className="hidden md:flex md:gap-2" crumbs={[{ title: collectionInfoData.data.title, link: `/collections/${collectionInfoData.data.handle}`, active: true }]} />
                            {isCollectionProductsFetching === true &&
                                <div className="flex justify-center p-5 z-10 ">
                                    <svg className="animate-spin" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4 3.99999V8.99999H4.582M4.582 8.99999C5.24585 7.35812 6.43568 5.9829 7.96503 5.08985C9.49438 4.1968 11.2768 3.8364 13.033 4.06513C14.7891 4.29386 16.4198 5.09878 17.6694 6.35377C18.919 7.60875 19.7168 9.24285 19.938 11M4.582 8.99999H9M20 20V15H19.419M19.419 15C18.7542 16.6409 17.564 18.015 16.0348 18.9073C14.5056 19.7995 12.7237 20.1595 10.9681 19.9309C9.21246 19.7022 7.5822 18.8979 6.33253 17.6437C5.08287 16.3896 4.28435 14.7564 4.062 13M19.419 15H15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            }
                            {isCollectionProductsFetching === false && isCollectionProductsError === true &&
                                <div className="flex flex-col items-center py-5">
                                    <div className="text-2xl font-bold text-red-600">Что-то пошло не так</div>
                                    {(collectionProductsError && "status" in collectionProductsError) &&
                                        <div className="text-gray-500">{(collectionProductsError.data as IErrorResponse)?.message}</div>
                                    }
                                </div>
                            }
                            {isCollectionProductsFetching === false && isCollectionProductsError === false && collectionProductsData?.data &&
                                <>
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                                        {collectionProductsData.data.products.map(product =>
                                            <ProductCard
                                                key={product.handle}
                                                handle={product.handle}
                                                title={product.title}
                                                vendor={product.vendor}
                                                image={product.image}
                                                type={product.type}
                                                price={product.price}
                                                compareAtPrice={product.compareAtPrice}
                                            />
                                        )}
                                    </div>
                                    <Pagination
                                        basePath={`/collections/${handle}`}
                                        currentPage={collectionProductsData.data.currentPage}
                                        totalPages={collectionProductsData.data.totalPages}
                                    />
                                </>
                            }
                        </div>
                        <ProductFilterSort />
                    </>
                }
                <div className="py-8 space-y-8">
                    <FeaturedProducts />
                    <RecentlyViewed />
                </div>
            </div>
        </MainLayout>
    )
}

Collection.getInitialProps = wrapper.getInitialPageProps(
    store => async (context) => {
        const query = {
            handle: context.query.handle as string,
            limit: 20,
            skip: isNaN(+(context.query.page ?? 1)) === true ? 0 : (+(context.query.page ?? 1) - 1) * productsPerPage,
        }

        const isCSR = typeof window === "undefined"
        if (isCSR === false) return query

        await store.dispatch(collectionService.endpoints.getCollectionInfoByHandle.initiate({ handle: query.handle }))
        await store.dispatch(collectionService.endpoints.getCollectionProductsByHandle.initiate(query))

        return query
    }
)

export default Collection