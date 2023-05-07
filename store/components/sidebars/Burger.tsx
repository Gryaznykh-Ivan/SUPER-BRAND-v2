import Link from 'next/link';
import React from 'react'
import Accordion from '../accordions/Accordion';
import Modal from '../portals/Modal';

interface IProps {
    isActive: boolean;
    onClose: () => void;
}

export default function Burger({ isActive, onClose }: IProps) {

    return (
        <Modal>
            <div className={`fixed inset-0 bg-black ${isActive ? "bg-opacity-30 visible" : "bg-opacity-0 invisible"} flex transition-all duration-300 z-20`} onClick={onClose}>
                <div className={`${isActive === false ? "-translate-x-full" : ""} w-5/6 max-w-sm bg-white h-screen transform transition-all duration-300 overflow-hidden`} onClick={e => e.stopPropagation()}>
                    <div className="flex flex-col h-screen">
                        <div className="h-14 flex justify-center items-center border-b-[1px] border-line-divider">
                            <svg width="85" height="11" viewBox="0 0 85 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.12012 5.63184H2.5498L2.78906 4.22363L4.77148 4.23047C5.07227 4.23047 5.35938 4.18945 5.63281 4.10742C5.91081 4.02083 6.14323 3.88184 6.33008 3.69043C6.52148 3.49447 6.64225 3.23242 6.69238 2.9043C6.7334 2.5944 6.70605 2.35059 6.61035 2.17285C6.51465 1.99512 6.36198 1.86751 6.15234 1.79004C5.94727 1.70801 5.70345 1.66471 5.4209 1.66016L3.94434 1.65332L2.49512 10H0.492188L2.21484 0.046875L5.48242 0.0537109C5.91081 0.0582682 6.32552 0.108398 6.72656 0.204102C7.1276 0.299805 7.48307 0.450195 7.79297 0.655273C8.10286 0.860352 8.34212 1.13151 8.51074 1.46875C8.68392 1.80599 8.75456 2.2207 8.72266 2.71289C8.69076 3.25065 8.53581 3.69271 8.25781 4.03906C7.97982 4.38086 7.62435 4.63835 7.19141 4.81152C6.76302 4.9847 6.30273 5.08496 5.81055 5.1123L5.12012 5.63184ZM4.30664 10H1.20312L2.25586 8.40039L4.36816 8.40723C4.66895 8.40723 4.94922 8.3571 5.20898 8.25684C5.47331 8.15202 5.69434 7.99707 5.87207 7.79199C6.0498 7.58691 6.16146 7.32487 6.20703 7.00586C6.24805 6.73698 6.23665 6.50228 6.17285 6.30176C6.10905 6.09668 5.99056 5.93945 5.81738 5.83008C5.64876 5.71615 5.42318 5.65234 5.14062 5.63867L3.11719 5.63184L3.37012 4.22363L5.69434 4.23047L6.03613 4.77734C6.48275 4.80013 6.87012 4.90267 7.19824 5.08496C7.53092 5.2627 7.78385 5.51562 7.95703 5.84375C8.13021 6.17188 8.20085 6.56608 8.16895 7.02637C8.12337 7.7373 7.91602 8.31152 7.54688 8.74902C7.17773 9.18652 6.70605 9.50553 6.13184 9.70605C5.56217 9.90658 4.95378 10.0046 4.30664 10ZM10.8828 0.046875L14.3896 0.0537109C14.9958 0.0628255 15.5449 0.174479 16.0371 0.388672C16.5339 0.602865 16.9189 0.924154 17.1924 1.35254C17.4704 1.78092 17.5866 2.32552 17.541 2.98633C17.4954 3.52865 17.3633 3.98665 17.1445 4.36035C16.9303 4.73405 16.641 5.05078 16.2764 5.31055C15.9163 5.57031 15.5016 5.79362 15.0322 5.98047L14.335 6.31543H11.0947L11.3682 4.71582L13.5967 4.72949C13.9294 4.72493 14.2324 4.66113 14.5059 4.53809C14.7793 4.41504 15.0049 4.2373 15.1826 4.00488C15.3649 3.7679 15.4788 3.48079 15.5244 3.14355C15.5654 2.84733 15.5449 2.58984 15.4629 2.37109C15.3854 2.15234 15.251 1.98145 15.0596 1.8584C14.8682 1.73535 14.6243 1.66927 14.3281 1.66016L12.6123 1.65332L11.1631 10H9.16016L10.8828 0.046875ZM14.6084 10L13.1729 5.56348L15.1895 5.5498L16.7412 9.89062V10H14.6084ZM23.2217 1.85156L19.2158 10H17.0146L22.333 0.046875H23.7412L23.2217 1.85156ZM24.0146 10L22.7979 1.63965L22.873 0.046875H24.1924L26.0723 10H24.0146ZM24.5205 6.29492L24.2402 7.90137H19.1201L19.4004 6.29492H24.5205ZM36.5996 0.046875L34.8701 10H32.9287L30.1738 3.25293L29.0049 10H27.002L28.7246 0.046875H30.6729L33.4346 6.80078L34.6035 0.046875H36.5996ZM39.6689 10H37.4541L37.7412 8.40039L39.7305 8.41406C40.3503 8.41406 40.8721 8.26823 41.2959 7.97656C41.7197 7.68034 42.0524 7.29297 42.2939 6.81445C42.54 6.33138 42.7064 5.80957 42.793 5.24902L42.8545 4.76367C42.8955 4.41732 42.9092 4.06641 42.8955 3.71094C42.8818 3.35091 42.8158 3.01823 42.6973 2.71289C42.5833 2.40755 42.401 2.15918 42.1504 1.96777C41.8997 1.77637 41.5602 1.67383 41.1318 1.66016L38.8623 1.65332L39.1426 0.046875L41.1934 0.0537109C41.8587 0.0673828 42.4375 0.204102 42.9297 0.463867C43.4219 0.719076 43.8252 1.06543 44.1396 1.50293C44.4541 1.94043 44.6729 2.44173 44.7959 3.00684C44.9189 3.56738 44.944 4.15755 44.8711 4.77734L44.8164 5.2627C44.7253 5.92806 44.5361 6.55013 44.249 7.12891C43.9665 7.70768 43.5996 8.21354 43.1484 8.64648C42.7018 9.07487 42.1846 9.40983 41.5967 9.65137C41.0088 9.88835 40.3662 10.0046 39.6689 10ZM40.3184 0.046875L38.5889 10H36.5859L38.3086 0.046875H40.3184ZM55.0156 0.046875L53.2861 10H51.3447L48.5898 3.25293L47.4209 10H45.418L47.1406 0.046875H49.0889L51.8506 6.80078L53.0195 0.046875H55.0156ZM60.4775 1.85156L56.4717 10H54.2705L59.5889 0.046875H60.9971L60.4775 1.85156ZM61.2705 10L60.0537 1.63965L60.1289 0.046875H61.4482L63.3281 10H61.2705ZM61.7764 6.29492L61.4961 7.90137H56.376L56.6562 6.29492H61.7764ZM66.9307 0.046875H68.5576L69.7676 7.33398L73.5068 0.046875H75.2705L70.0615 10H68.6943L66.9307 0.046875ZM65.9805 0.046875H67.6758L66.7393 7.25879L66.2539 10H64.2578L65.9805 0.046875ZM74.4502 0.046875H76.1523L74.4297 10H72.4199L72.9326 7.08789L74.4502 0.046875ZM82.9268 8.40039L82.6465 10H77.499L77.7725 8.40039H82.9268ZM79.8848 0.046875L78.1553 10H76.1523L77.875 0.046875H79.8848ZM83.002 4.10059L82.7285 5.65918H78.251L78.5244 4.10059H83.002ZM84.3623 0.046875L84.082 1.65332H78.9414L79.2285 0.046875H84.3623Z" fill="black" />
                            </svg>
                        </div>
                        <div className="flex-1 flex flex-col overflow-y-auto">
                            <Accordion className="text-md" title="Nike">
                                <div className="">
                                    <Link href="/collections/Nike" className="text-md p-4 pl-10 flex items-center" onClick={onClose}>Всe Nike</Link>
                                </div>
                            </Accordion>
                            <Accordion className="text-md" title="Adidas">
                                <div className="">
                                    <Link href="/collections/adidas" className="text-md p-4 pl-10 flex items-center" onClick={onClose}>Всe Adidas</Link>
                                </div>
                            </Accordion>
                            <Accordion className="text-md" title="New Balance">
                                <div className="">
                                    <Link href="/collections/new-balance" className="text-md p-4 pl-10 flex items-center" onClick={onClose}>Всe New Balance</Link>
                                </div>
                            </Accordion>
                            <Accordion className="text-md" title="Одежда">
                                <div className="">
                                    <Link href="/collections/cloth" className="text-md p-4 pl-10 flex items-center" onClick={onClose}>Вся одежда</Link>
                                    <Link href="/collections/cloth" className="text-md p-4 pl-10 flex items-center" onClick={onClose}>Travis Scott</Link>
                                    <Link href="/collections/cloth" className="text-md p-4 pl-10 flex items-center" onClick={onClose}>Chrome Hearts</Link>
                                    <Link href="/collections/cloth" className="text-md p-4 pl-10 flex items-center" onClick={onClose}>Kith</Link>
                                    <Link href="/collections/cloth" className="text-md p-4 pl-10 flex items-center" onClick={onClose}>Fear of God</Link>
                                </div>
                            </Accordion>
                            <Accordion className="text-md" title="Аксессуары">
                                <div className="">
                                    <Link href="/collections/test" className="text-md p-4 pl-10 flex items-center" onClick={onClose}>Вся одежда</Link>
                                </div>
                            </Accordion>
                            <Link href="/collections/sale" className="text-md p-4 flex items-center text-main-red" onClick={onClose}>Sale</Link>
                            <div className="my-5 mx-4 border-t-[1px] border-line-divider"></div>
                            <div className="mb-8">
                                <Link href="/user" className="flex items-center gap-4 p-4" onClick={onClose}>
                                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="24" cy="24" r="24" fill="#FECB2F" />
                                        <path d="M30.6229 31.92C30.6229 28.824 27.5429 26.32 23.7509 26.32C19.9589 26.32 16.8789 28.824 16.8789 31.92M23.7509 23.92C24.8118 23.92 25.8292 23.4986 26.5793 22.7484C27.3295 21.9983 27.7509 20.9808 27.7509 19.92C27.7509 18.8591 27.3295 17.8417 26.5793 17.0916C25.8292 16.3414 24.8118 15.92 23.7509 15.92C22.69 15.92 21.6726 16.3414 20.9225 17.0916C20.1723 17.8417 19.7509 18.8591 19.7509 19.92C19.7509 20.9808 20.1723 21.9983 20.9225 22.7484C21.6726 23.4986 22.69 23.92 23.7509 23.92Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                    <div className="flex flex-col flex-1">
                                        <div className="text-base fo">Здравствуйте, Артур</div>
                                        <div className="text-sm text-text-gray">Профиль пользователя</div>
                                    </div>
                                    <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1 1.25L5 5L1 8.75" stroke="black" stroke-linecap="square" />
                                    </svg>
                                </Link>
                                <Link href="/orders" className="flex text-base p-4 flex items-center" onClick={onClose}>
                                    <div className="flex-1">Заказы</div>
                                    <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1 1.25L5 5L1 8.75" stroke="black" stroke-linecap="square" />
                                    </svg>
                                </Link>
                                <Link href="/refunds" className="flex text-base p-4 flex items-center" onClick={onClose}>
                                    <div className="flex-1">Возвраты</div>
                                    <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1 1.25L5 5L1 8.75" stroke="black" stroke-linecap="square" />
                                    </svg>
                                </Link>
                                <Link href="/auth/logout" className="text-base p-4 flex items-center text-main-red" onClick={onClose}>Выйти из аккаунта</Link>
                            </div>
                            <div className="flex-1 bg-main-gray divide-y-[1px] divide-line-divider border-y-[1px] border-line-divider">
                                <Link href="/auth/login" className="flex items-center gap-4 h-14 p-4">
                                    <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M14.6 17C14.6 13.904 11.5523 11.4 7.8 11.4C4.04773 11.4 1 13.904 1 17M7.8 9C8.84975 9 9.85651 8.57857 10.5988 7.82843C11.3411 7.07828 11.7581 6.06087 11.7581 5C11.7581 3.93913 11.3411 2.92172 10.5988 2.17157C9.85651 1.42143 8.84975 1 7.8 1C6.75025 1 5.74349 1.42143 5.00121 2.17157C4.25892 2.92172 3.84191 3.93913 3.84191 5C3.84191 6.06087 4.25892 7.07828 5.00121 7.82843C5.74349 8.57857 6.75025 9 7.8 9Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                    <div className="text-base">Вход | Регистрация</div>
                                </Link>
                                <Accordion className="text-base" title="Поддержка">
                                    <div className="pb-4 px-4 flex gap-4 flex-col">
                                        <Link href="/pages/support" className="text-base text-text-gray">Помощь покупателю</Link>
                                        <Link href="/pages/delivery" className="text-base text-text-gray">Доставка и самовывоз</Link>
                                        <Link href="/pages/refund" className="text-base text-text-gray">Обмен и возврат</Link>
                                        <Link href="/pages/payment" className="text-base text-text-gray">Способы оплаты</Link>
                                    </div>
                                </Accordion>
                                <Accordion className="text-base" title="Информация">
                                    <div className="pb-4 px-4 flex gap-4 flex-col">
                                        <Link href="pages/about-us" className="text-base text-text-gray">О нас</Link>
                                        <Link href="/pages/cooperation" className="text-base text-text-gray">Сотрудничество</Link>
                                        <Link href="/pages/job" className="text-base text-text-gray">Вакансии</Link>
                                        <Link href="/pages/blog" className="text-base text-text-gray">Блог</Link>
                                    </div>
                                </Accordion>
                                <div className="flex flex-col items-center gap-4 py-8">
                                    <span className="text-base text-text-gray">8 (495) 336-25-56</span>
                                    <span className="text-base text-text-gray">hello@brandname.ru</span>
                                    <div className="flex gap-4">
                                        <Link href="#">
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect width="20" height="20" rx="10" fill="#0077FF" />
                                                <path d="M10.4913 13.5C6.73298 13.5 4.58932 10.8724 4.5 6.5H6.38257C6.44441 9.70921 7.83229 11.0686 8.93161 11.3488V6.5H10.7042V9.26777C11.7898 9.14865 12.9304 7.88739 13.3151 6.5H15.0878C14.9428 7.21954 14.6538 7.90083 14.2388 8.50125C13.8238 9.10167 13.2919 9.60832 12.6761 9.98949C13.3634 10.3378 13.9705 10.8307 14.4573 11.4359C14.944 12.041 15.2994 12.7445 15.5 13.5H13.5487C13.3687 12.8438 13.0027 12.2564 12.4967 11.8114C11.9907 11.3664 11.3672 11.0836 10.7042 10.9985V13.5H10.4913V13.5Z" fill="white" />
                                            </svg>
                                        </Link>
                                        <Link href="#">
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect width="20" height="20" rx="10" fill="#27A6E5" />
                                                <path d="M14 6.30111L12.4973 14.1461C12.4973 14.1461 12.287 14.6901 11.7094 14.4292L8.24229 11.6763L8.22621 11.6682C8.69454 11.2327 12.3262 7.85133 12.4849 7.69806C12.7306 7.46068 12.5781 7.31936 12.2928 7.49868L6.9284 11.0265L4.85882 10.3054C4.85882 10.3054 4.53313 10.1854 4.5018 9.92455C4.47005 9.66327 4.86954 9.52195 4.86954 9.52195L13.3066 6.09447C13.3066 6.09447 14 5.77896 14 6.30111Z" fill="#FEFEFE" />
                                            </svg>
                                        </Link>
                                        <Link href="#">
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect width="20" height="20" rx="10" fill="#48C95F" />
                                                <path d="M13.9634 6.03125C12.9756 5.04687 11.6585 4.5 10.2683 4.5C7.37805 4.5 5.03658 6.83333 5.03658 9.71354C5.03658 10.625 5.29268 11.5365 5.73171 12.3021L5 15L7.78049 14.2708C8.54878 14.6719 9.39024 14.8906 10.2683 14.8906C13.1585 14.8906 15.5 12.5573 15.5 9.67708C15.4634 8.32813 14.9512 7.01562 13.9634 6.03125ZM12.7927 11.5729C12.6829 11.8646 12.1707 12.1562 11.9146 12.1927C11.6951 12.2292 11.4024 12.2292 11.1098 12.1562C10.9268 12.0833 10.6707 12.0104 10.378 11.8646C9.06098 11.3177 8.21951 10.0052 8.14634 9.89583C8.07317 9.82292 7.59756 9.20312 7.59756 8.54687C7.59756 7.89062 7.92683 7.59896 8.03658 7.45312C8.14634 7.30729 8.29268 7.30729 8.40244 7.30729C8.47561 7.30729 8.58536 7.30729 8.65854 7.30729C8.73171 7.30729 8.84146 7.27083 8.95122 7.52604C9.06098 7.78125 9.31707 8.4375 9.35366 8.47396C9.39024 8.54688 9.39024 8.61979 9.35366 8.69271C9.31707 8.76562 9.28049 8.83854 9.20732 8.91146C9.13414 8.98437 9.06097 9.09375 9.02439 9.13021C8.95122 9.20312 8.87805 9.27604 8.95122 9.38542C9.02439 9.53125 9.28049 9.93229 9.68293 10.2969C10.1951 10.7344 10.5976 10.8802 10.7439 10.9531C10.8902 11.026 10.9634 10.9896 11.0366 10.9167C11.1098 10.8437 11.3659 10.5521 11.439 10.4063C11.5122 10.2604 11.622 10.2969 11.7317 10.3333C11.8415 10.3698 12.5 10.6979 12.6098 10.7708C12.7561 10.8438 12.8293 10.8802 12.8659 10.9167C12.9024 11.026 12.9024 11.2812 12.7927 11.5729Z" fill="white" />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}
