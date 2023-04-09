import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../../hooks/store';
import useSetBodyScroll from '../../hooks/useSetBodyScroll';
import Burger from '../sidebars/Burger';
import MegaMenu from './MegaMenu';

export default function Header() {
    const [isSearchOpened, setIsSearchOpened] = useState<boolean>(false);
    const [isBurgerOpened, setIsBurgerOpened] = useState<boolean>(false);

    const setBodyScrollResize = useSetBodyScroll(true);
    const setBodyScroll = useSetBodyScroll(false);

    useEffect(() => {
        setBodyScrollResize(!isBurgerOpened);
    }, [isBurgerOpened]);

    useEffect(() => {
        setBodyScroll(!isSearchOpened);
    }, [isSearchOpened]);

    const onSearchToggle = () => {
        setIsSearchOpened(prev => !prev)
    }

    const onBurgerToggle = () => {
        setIsBurgerOpened(prev => !prev);
    }

    return (
        <div className="relative">
            <div className="fixed w-full z-20">
                <div className="h-14 border-b-[1px] bg-white">
                    <div className="container grid grid-cols-3 px-3 md:px-10 items-center h-full">
                        <div className="flex">
                            <button className="p-2 transform hover:scale-110 md:hidden" onClick={onBurgerToggle}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2.59844 3.02316C2.43973 3.02316 2.28751 3.08621 2.17528 3.19844C2.06305 3.31067 2 3.46289 2 3.62161C2 3.78033 2.06305 3.93255 2.17528 4.04478C2.28751 4.15702 2.43973 4.22007 2.59844 4.22007H21.4016C21.5603 4.22007 21.7125 4.15702 21.8247 4.04478C21.937 3.93255 22 3.78033 22 3.62161C22 3.46289 21.937 3.31067 21.8247 3.19844C21.7125 3.08621 21.5603 3.02316 21.4016 3.02316H2.59844ZM2 12C2 11.8413 2.06305 11.6891 2.17528 11.5768C2.28751 11.4646 2.43973 11.4015 2.59844 11.4015H21.4016C21.5603 11.4015 21.7125 11.4646 21.8247 11.5768C21.937 11.6891 22 11.8413 22 12C22 12.1587 21.937 12.3109 21.8247 12.4232C21.7125 12.5354 21.5603 12.5985 21.4016 12.5985H2.59844C2.43973 12.5985 2.28751 12.5354 2.17528 12.4232C2.06305 12.3109 2 12.1587 2 12ZM2 20.3784C2 20.2197 2.06305 20.0674 2.17528 19.9552C2.28751 19.843 2.43973 19.7799 2.59844 19.7799H21.4016C21.5603 19.7799 21.7125 19.843 21.8247 19.9552C21.937 20.0674 22 20.2197 22 20.3784C22 20.5371 21.937 20.6893 21.8247 20.8016C21.7125 20.9138 21.5603 20.9768 21.4016 20.9768H2.59844C2.43973 20.9768 2.28751 20.9138 2.17528 20.8016C2.06305 20.6893 2 20.5371 2 20.3784Z" fill="black" />
                                </svg>
                            </button>
                            <button className="p-2 transform hover:scale-110 md:hidden block" onClick={onSearchToggle}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M21.9999 22.0001L17.1666 17.1667M19.7778 10.8888C19.7778 15.798 15.7982 19.7777 10.889 19.7777C5.97975 19.7777 2.00006 15.798 2.00006 10.8888C2.00006 5.97963 5.97975 1.99994 10.889 1.99994C15.7982 1.99994 19.7778 5.97963 19.7778 10.8888Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                        <Link href="/" className="text-center italic font-extrabold text-xl whitespace-nowrap">
                            LOGO
                        </Link>
                        <div className="flex justify-self-end">
                            <button className="p-2 transform hover:scale-110 hidden md:block" onClick={onSearchToggle}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M21.9999 22.0001L17.1666 17.1667M19.7778 10.8888C19.7778 15.798 15.7982 19.7777 10.889 19.7777C5.97975 19.7777 2.00006 15.798 2.00006 10.8888C2.00006 5.97963 5.97975 1.99994 10.889 1.99994C15.7982 1.99994 19.7778 5.97963 19.7778 10.8888Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                            <Link href="#" className="p-2 transform hover:scale-110">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20.9755 3.74612C20.4326 3.19227 19.788 2.75298 19.0785 2.45337C18.3691 2.15377 17.6087 1.99971 16.8408 2C16.073 2.00029 15.3127 2.15494 14.6035 2.45509C13.8942 2.75524 13.2499 3.19502 12.7074 3.74929L11.9992 4.48052L11.2969 3.75087L11.2923 3.74621C10.7496 3.19262 10.1054 2.75348 9.39629 2.45388C8.68723 2.15428 7.92726 2.00007 7.15978 2.00007C6.39229 2.00007 5.63232 2.15428 4.92326 2.45388C4.2142 2.75348 3.56993 3.19262 3.02724 3.74621L2.71174 4.06805C1.61573 5.18608 1 6.70244 1 8.28357C1 9.86469 1.61573 11.3811 2.71174 12.4991L11.0386 20.9931L11.9789 21.9981L12.0013 21.9752L12.0257 22L12.9067 21.0518L21.291 12.4989C22.3854 11.38 23 9.864 23 8.28343C23 6.70286 22.3854 5.18682 21.291 4.06791L20.9755 3.74612ZM20.2577 11.4451L12.0013 19.8675L3.7448 11.4451C2.9228 10.6066 2.46101 9.46929 2.46101 8.28345C2.46101 7.09761 2.9228 5.96034 3.7448 5.12182L4.06035 4.79998C4.88196 3.96188 5.99616 3.49084 7.15808 3.4904C8.32 3.48995 9.43456 3.96014 10.2568 4.79761L11.996 6.60413L13.7436 4.79998C14.1506 4.38479 14.6338 4.05543 15.1656 3.83073C15.6974 3.60603 16.2674 3.49038 16.843 3.49038C17.4186 3.49038 17.9886 3.60603 18.5204 3.83073C19.0522 4.05543 19.5354 4.38479 19.9424 4.79998L20.2579 5.12177C21.0786 5.96098 21.5396 7.09803 21.5395 8.28347C21.5395 9.4689 21.0785 10.6059 20.2577 11.4451Z" fill="black" />
                                </svg>
                            </Link>
                            <Link href="#" className="p-2 transform hover:scale-110">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8 5.33261V6.66499H20.6667V9.30247L19.1875 13.9931H7.5805L5.91383 2.00004H2V3.33242H4.75283L6.4195 15.3254H20.1653L22 9.50741V5.33261H8Z" fill="black" />
                                    <path d="M8.70747 16.6704C8.00047 16.6713 7.32266 16.9523 6.82274 17.4518C6.32281 17.9514 6.0416 18.6287 6.0408 19.3352C6.0408 20.0419 6.32175 20.7197 6.82185 21.2195C7.32194 21.7192 8.00022 22 8.70747 22C9.41471 22 10.093 21.7192 10.5931 21.2195C11.0932 20.7197 11.3741 20.0419 11.3741 19.3352C11.3733 18.6287 11.0921 17.9514 10.5922 17.4518C10.0923 16.9522 9.41447 16.6712 8.70747 16.6704ZM8.70747 20.6676C8.44376 20.6676 8.18597 20.5894 7.96671 20.443C7.74744 20.2966 7.57654 20.0885 7.47563 19.8451C7.37471 19.6016 7.34831 19.3337 7.39975 19.0753C7.4512 18.8168 7.57819 18.5794 7.76466 18.3931C7.95113 18.2067 8.1887 18.0798 8.44734 18.0284C8.70599 17.977 8.97408 18.0034 9.21771 18.1042C9.46135 18.2051 9.66958 18.3759 9.81609 18.595C9.9626 18.8141 10.0408 19.0717 10.0408 19.3352C10.0404 19.6884 9.89977 20.0271 9.64981 20.2769C9.39985 20.5267 9.06096 20.6672 8.70747 20.6676Z" fill="black" />
                                    <path d="M18.0412 16.6704C17.3342 16.6713 16.6564 16.9523 16.1565 17.4518C15.6566 17.9514 15.3754 18.6287 15.3746 19.3352C15.3746 20.0419 15.6555 20.7197 16.1556 21.2195C16.6557 21.7192 17.334 22 18.0412 22C18.7485 22 19.4268 21.7192 19.9269 21.2195C20.4269 20.7197 20.7079 20.0419 20.7079 19.3352C20.7071 18.6287 20.4259 17.9514 19.926 17.4518C19.426 16.9522 18.7482 16.6712 18.0412 16.6704ZM18.0412 20.6676C17.7775 20.6676 17.5197 20.5894 17.3005 20.443C17.0812 20.2966 16.9103 20.0885 16.8094 19.8451C16.7085 19.6016 16.6821 19.3337 16.7335 19.0753C16.785 18.8168 16.912 18.5794 17.0984 18.3931C17.2849 18.2067 17.5225 18.0798 17.7811 18.0284C18.0398 17.977 18.3078 18.0034 18.5515 18.1042C18.7951 18.2051 19.0033 18.3759 19.1499 18.595C19.2964 18.8141 19.3746 19.0717 19.3746 19.3352C19.3741 19.6884 19.2335 20.0271 18.9836 20.2769C18.7336 20.5267 18.3947 20.6672 18.0412 20.6676Z" fill="black" />
                                </svg>
                            </Link>
                            <Link href="#" className="p-2 transform hover:scale-110 hidden md:block">
                                <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M19 21C19 17.13 15.1903 14 10.5 14C5.80966 14 2 17.13 2 21M10.5 11C11.8122 11 13.0706 10.4732 13.9985 9.53553C14.9263 8.59785 15.4476 7.32608 15.4476 6C15.4476 4.67392 14.9263 3.40215 13.9985 2.46447C13.0706 1.52678 11.8122 1 10.5 1C9.18781 1 7.92937 1.52678 7.00151 2.46447C6.07365 3.40215 5.55239 4.67392 5.55239 6C5.55239 7.32608 6.07365 8.59785 7.00151 9.53553C7.92937 10.4732 9.18781 11 10.5 11Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
                <MegaMenu />
            </div>
            <Burger
                isActive={isBurgerOpened}
                onClose={onBurgerToggle}
            />
        </div>
    )
}
