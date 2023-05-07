/* eslint-disable react/no-unescaped-entities */
import Head from 'next/head'
import React from 'react'
import MainLayout from '@/components/layouts/Main'
import Accordion from '@/components/accordions/Accordion'
import FeaturedProducts from '@/components/collections/FeaturedProducts'
import RecentlyViewed from '@/components/collections/RecentlyViewed'
import SizeSelect from '@/components/products/SizeSelect'
import VerticalProductImageSlider from '@/components/sliders/VerticalProductImageSlider'
import HorizontalProductImageSlider from '@/components/sliders/HorizontalProductImageSlider'

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
                                <button className="flex flex-col justify-center items-center w-full bg-main-blue rounded-lg h-[50px]">
                                    <span className="font-medium text-base text-white leading-4">Купить из наличия</span>
                                    <span className="text-sm text-white leading-3">132 000 ₽</span>
                                </button>
                                <button className="flex flex-col justify-center items-center w-full bg-black rounded-lg h-[50px]">
                                    <span className="font-medium text-base text-white leading-4">Купить из наличия</span>
                                    <div className="flex gap-2">
                                        <span className="text-sm text-white leading-[14px]">132 000 ₽</span>
                                        <span className="text-sm text-gray-500 line-through leading-[14px]">132 000 ₽</span>
                                    </div>
                                </button>
                            </div>
                            <div className="px-0 md:pl-8">
                                <div className="border-y-[1px] border-line-divider divide-y-[1px] divide-line-divider">
                                    <Accordion title="Как это работает?">
                                        <div className="pb-4 px-4 flex gap-4 flex-col text-base">
                                            <p>В нашем магазине все товары разделены на две основные категории: "В наличии" и "Под заказ".</p>
                                            <ul className="list-disc pl-4 space-y-3">
                                                <li>Товары “В наличии” находится на нашем складе в Москве, проверены и могут быть доставлены в кратчайшие сроки.</li>
                                                <li>Товаров из категории “Под заказ” нет в наличии, но вы можете заказать их у нас. Такие товары доставляются дольше, но и цена на них, как правило, ниже. Среднее время доставки: 14-20 рабочих дней.</li>
                                            </ul>
                                        </div>
                                    </Accordion>
                                    <Accordion title="О товаре">
                                        <div className="pb-4 px-4 flex gap-4 flex-col text-base">
                                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab ea, voluptatem dolorum ipsa cumque, asperiores consequuntur architecto quidem, sequi aliquid ducimus. Aperiam sunt temporibus quo in ab. Dolor facere dolores voluptate iste ipsa maiores voluptatum mollitia rerum veniam quod saepe nostrum doloremque explicabo placeat, quas quo est pariatur reprehenderit eaque sit sequi nisi ad necessitatibus quidem. Deserunt repellat eaque hic ducimus, dolorem nam fugiat quae, at aspernatur voluptates perferendis voluptate quo, provident ullam doloremque qui laborum! Esse alias obcaecati, rerum sapiente possimus et quam commodi corporis tempore soluta ex tempora molestiae molestias iusto! Cum voluptatem repellat aut autem explicabo, reprehenderit culpa, at dicta perspiciatis libero beatae nemo doloremque rem ducimus ea non nesciunt sunt reiciendis voluptatibus hic maiores amet asperiores minus. Quidem at velit perspiciatis, consectetur vero laudantium nihil excepturi iure aspernatur. Delectus veniam reiciendis facere est ut cupiditate soluta? Praesentium, qui nisi odit voluptatem fugiat culpa nulla dignissimos dolor.</p>
                                        </div>
                                    </Accordion>
                                    <Accordion title="Гарантия подлинности">
                                        <div className="pb-4 px-4 flex gap-4 flex-col text-base">
                                            <p>Мы предлагаем бесплатный обмен и полный возврат для всех заказов при следующих условиях:</p>
                                            <ul>
                                                <li>1) товар не был в употреблении (стиран, ношен);</li>
                                                <li>2) сохранены его товарный вид, потребительские свойства;</li>
                                                <li>3) пломбы, фабричные ярлыки, в том числе КИЗ (контрольно-идентификационный знак) на товаре или его упаковке (в зависимости от того, что применимо) должны быть целыми, не мятыми и не повреждёнными.</li>
                                            </ul>
                                            <p>Больше информации можно найти на этой странице.</p>
                                        </div>
                                    </Accordion>
                                    <Accordion title="Оплата и доставка">
                                        <div className="pb-4 px-4 flex gap-4 flex-col text-base">
                                            <p>Мы предлагаем бесплатный обмен и полный возврат для всех заказов при следующих условиях:</p>
                                            <ul>
                                                <li>1) товар не был в употреблении (стиран, ношен);</li>
                                                <li>2) сохранены его товарный вид, потребительские свойства;</li>
                                                <li>3) пломбы, фабричные ярлыки, в том числе КИЗ (контрольно-идентификационный знак) на товаре или его упаковке (в зависимости от того, что применимо) должны быть целыми, не мятыми и не повреждёнными.</li>
                                            </ul>
                                            <p>Больше информации можно найти на этой странице.</p>
                                        </div>
                                    </Accordion>
                                    <Accordion title="Обмен и возврат">
                                        <div className="pb-4 px-4 flex gap-4 flex-col text-base">
                                            <p>Мы предлагаем бесплатный обмен и полный возврат для всех заказов при следующих условиях:</p>
                                            <ul>
                                                <li>1) товар не был в употреблении (стиран, ношен);</li>
                                                <li>2) сохранены его товарный вид, потребительские свойства;</li>
                                                <li>3) пломбы, фабричные ярлыки, в том числе КИЗ (контрольно-идентификационный знак) на товаре или его упаковке (в зависимости от того, что применимо) должны быть целыми, не мятыми и не повреждёнными.</li>
                                            </ul>
                                            <p>Больше информации можно найти на этой странице.</p>
                                        </div>
                                    </Accordion>
                                    <Accordion title="Остались вопросы по товару?">
                                        <div className="pb-4 px-4 flex gap-4 flex-col text-base">
                                            <p>Мы предлагаем бесплатный обмен и полный возврат для всех заказов при следующих условиях:</p>
                                            <ul>
                                                <li>1) товар не был в употреблении (стиран, ношен);</li>
                                                <li>2) сохранены его товарный вид, потребительские свойства;</li>
                                                <li>3) пломбы, фабричные ярлыки, в том числе КИЗ (контрольно-идентификационный знак) на товаре или его упаковке (в зависимости от того, что применимо) должны быть целыми, не мятыми и не повреждёнными.</li>
                                            </ul>
                                            <p>Больше информации можно найти на этой странице.</p>
                                        </div>
                                    </Accordion>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pb-8 space-y-8">
                    <FeaturedProducts />
                    <RecentlyViewed />
                </div>
            </div>

        </MainLayout>
    )
}
