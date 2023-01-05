import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import CollateBar from '../../components/filters/CollateBar'
import MainLayout from '../../components/layouts/Main'
import Pagination from '../../components/pagination/Pagination'
import ProductCard from '../../components/products/ProductCard'
import useScrollToTop from '../../hooks/useScrollToTop'
import { IProductGridCols } from '../../types'

interface IProps {
    query: {
        id: string;
        page: string;
    }
}

export default function Index({ query }: IProps) {
    const { scrollToTop } = useScrollToTop()
    const [productGridCols, setProductGridCols] = useState<IProductGridCols>({
        mobile: 2,
        laptop: 4
    })

    const onPageChange = (skip: number, limit: number) => {
        scrollToTop("smooth")
    }

    const onProductGridColsChange = (name: string, value: number) => {
        setProductGridCols(prev => ({ ...prev, [name]: value }))
    }

    return (
        <MainLayout>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="">
                <div className="text-3xl font-semibold mt-10 text-center">Collection Name: { query.id }</div>
                <div className={`container grid ${productGridCols.mobile === 2 ? "grid-cols-2" : "grid-cols-1"} ${productGridCols.laptop === 4 ? "md:grid-cols-4" : "md:grid-cols-3"} py-10`}>
                    <ProductCard
                        isSale={false}
                    />
                    <ProductCard
                        isSale={true}
                    />
                    <ProductCard
                        isSale={true}
                    />
                    <ProductCard
                        isSale={true}
                    />
                    <ProductCard
                        isSale={true}
                    />
                    <ProductCard
                        isSale={true}
                    />
                    <ProductCard
                        isSale={false}
                    />
                    <ProductCard
                        isSale={false}
                    />
                    <ProductCard
                        isSale={false}
                    />
                    <ProductCard
                        isSale={false}
                    />
                    <ProductCard
                        isSale={false}
                    />
                    <ProductCard
                        isSale={false}
                    />
                </div>
                <Pagination
                    page={query.page}
                    productPerPage={24}
                    totalProductCount={1490}
                    onPageChange={onPageChange}
                />
                <CollateBar
                    productGridCols={productGridCols}
                    onProductGridColsChange={onProductGridColsChange}
                />
            </div>
        </MainLayout>
    )
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    console.log(ctx.query)
    
    return {
        props: {
            query: {
                id: ctx.query.id,
                page: ctx.query.page || "1"
            }
        }
    }
}