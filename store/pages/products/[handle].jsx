/* eslint-disable react/no-unescaped-entities */
import Head from 'next/head'
import React from 'react'
import MainLayout from '../../components/layouts/Main'
import Breadcrumb from '../../components/Breadcrumbs'
import Accordion from '../../components/accordions/Accordion'
import OriginalityGuaranteedAccordion from '../../components/products/OriginalityGuaranteedAccordion'
import DeliveryAndPaymentAccordion from '../../components/products/DeliveryAndPaymentAccordion'
import RefundAccordion from '../../components/products/RefundAccordion'
import FAQAccordion from '../../components/products/FAQAccordion'
import FeaturedProducts from '../../components/collections/FeaturedProducts'
import RecentlyViewed from '../../components/collections/RecentlyViewed'
import SizeSelect from '../../components/products/SizeSelect'
import VerticalProductImageSlider from '../../components/sliders/VerticalProductImageSlider'
import HorizontalProductImageSlider from '../../components/sliders/HorizontalProductImageSlider'

export default function Product() {
    return (
        <MainLayout>
            <Head>
                <title>Товар</title>
                <meta name="description" content="Тут будет meta-description" />
            </Head>
            <div className="pb-8 pt-5">
                <div className="container flex flex-col px-4 md:px-10 lg:flex-row pb-8">
                    <div className="flex-1 hidden lg:block">
                        <VerticalProductImageSlider
                            images={[
                                {
                                    id: "1",
                                    src: "/image.jpg",
                                    alt: "TEST"
                                }, {
                                    id: "2",
                                    src: "/image.jpg",
                                    alt: "TEST"
                                }, {
                                    id: "3",
                                    src: "/image.jpg",
                                    alt: "TEST"
                                }, {
                                    id: "4",
                                    src: "/image.jpg",
                                    alt: "TEST"
                                }, {
                                    id: "5",
                                    src: "/image.jpg",
                                    alt: "TEST"
                                }, {
                                    id: "6",
                                    src: "/image.jpg",
                                    alt: "TEST"
                                }, {
                                    id: "7",
                                    src: "/image.jpg",
                                    alt: "TEST"
                                }, {
                                    id: "8",
                                    src: "/image.jpg",
                                    alt: "TEST"
                                },
                            ]}
                        />
                    </div>
                    <div className="lg:w-[460px]">
                        <div className="space-y-8 sticky top-28">
                            <div className="px-0 md:pl-8">
                                <div className="text-xs tracking-widest uppercase text-text-gray">Nike</div>
                                <div className="text-lg tracking-widest uppercase font-semibold">Air Jordan 1 Retro High OG "Stage Haze"</div>
                                <div className="text-xs tracking-widest uppercase text-text-gray">Кроссовки</div>
                            </div>
                            <div className="lg:hidden">
                                <HorizontalProductImageSlider
                                    images={[
                                        {
                                            id: "1",
                                            src: "/image.jpg",
                                            alt: "TEST"
                                        }, {
                                            id: "2",
                                            src: "/image.jpg",
                                            alt: "TEST"
                                        }, {
                                            id: "3",
                                            src: "/image.jpg",
                                            alt: "TEST"
                                        }, {
                                            id: "4",
                                            src: "/image.jpg",
                                            alt: "TEST"
                                        }, {
                                            id: "5",
                                            src: "/image.jpg",
                                            alt: "TEST"
                                        }, {
                                            id: "6",
                                            src: "/image.jpg",
                                            alt: "TEST"
                                        }, {
                                            id: "7",
                                            src: "/image.jpg",
                                            alt: "TEST"
                                        }, {
                                            id: "8",
                                            src: "/image.jpg",
                                            alt: "TEST"
                                        },
                                    ]}
                                />
                            </div>
                            <div className="px-0 md:pl-8">
                                <div className="flex items-center">
                                    <div className="text-main-red text-lg">от 32 000 ₽</div>
                                    <div className="text-base text-text-gray line-through ml-4">42 000 ₽</div>
                                </div>
                                <div className="text-text-gray text-sm mt-3">
                                    Все налоги и таможенные сборы включены. Стоимость доставки рассчитывается на этапе оформления заказа.
                                </div>
                            </div>
                            <div className="px-0 md:pl-8 space-y-2">
                                <SizeSelect />
                                {/* <button className="w-full text-base text-white bg-black rounded-lg h-12">Добавить в корзину</button> */}
                                <button className="w-full text-base text-white bg-main-blue rounded-lg h-14">
                                    <span className="font-semibold">Купить под заказ</span>
                                    <br />
                                    <span className="text-sm">56 000 ₽</span>
                                </button>
                                <button className="w-full text-base text-white bg-black rounded-lg h-14">
                                    <span className="font-semibold">Купить из наличия</span>
                                    <br />
                                    <span className="text-sm">132 000 ₽</span>
                                </button>
                            </div>
                            <div className="px-0 md:pl-8">
                                <div className="border-y-[1px] border-line-divider divide-y-[1px] divide-line-divider">
                                    <Accordion title="О товаре">
                                        <div className="pb-4 px-4 flex gap-4 flex-col text-base">
                                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab ea, voluptatem dolorum ipsa cumque, asperiores consequuntur architecto quidem, sequi aliquid ducimus. Aperiam sunt temporibus quo in ab. Dolor facere dolores voluptate iste ipsa maiores voluptatum mollitia rerum veniam quod saepe nostrum doloremque explicabo placeat, quas quo est pariatur reprehenderit eaque sit sequi nisi ad necessitatibus quidem. Deserunt repellat eaque hic ducimus, dolorem nam fugiat quae, at aspernatur voluptates perferendis voluptate quo, provident ullam doloremque qui laborum! Esse alias obcaecati, rerum sapiente possimus et quam commodi corporis tempore soluta ex tempora molestiae molestias iusto! Cum voluptatem repellat aut autem explicabo, reprehenderit culpa, at dicta perspiciatis libero beatae nemo doloremque rem ducimus ea non nesciunt sunt reiciendis voluptatibus hic maiores amet asperiores minus. Quidem at velit perspiciatis, consectetur vero laudantium nihil excepturi iure aspernatur. Delectus veniam reiciendis facere est ut cupiditate soluta? Praesentium, qui nisi odit voluptatem fugiat culpa nulla dignissimos dolor.</p>
                                        </div>
                                    </Accordion>
                                    <OriginalityGuaranteedAccordion />
                                    <DeliveryAndPaymentAccordion />
                                    <RefundAccordion />
                                    <FAQAccordion />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="py-8 space-y-8">
                    <FeaturedProducts />
                    <RecentlyViewed />
                </div>
            </div>

        </MainLayout>
    )
}
