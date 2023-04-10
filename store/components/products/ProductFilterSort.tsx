import React, { useEffect, useState } from 'react'
import useSetBodyScroll from '../../hooks/useSetBodyScroll'
import Filterbar from '../sidebars/Filter'
import Sortbar from '../sidebars/Sort'

export default function ProductFilterSort() {
    const [isSortbarOpen, setIsSortbarOpen] = useState(false)
    const [isFilterbarOpen, setIsFilterbarOpen] = useState(false)

    const setBodyScroll = useSetBodyScroll()

    useEffect(() => {
        setBodyScroll(isSortbarOpen === false && isFilterbarOpen === false)
    }, [isSortbarOpen, isFilterbarOpen])

    const onToggleSortbar = () => {
        setIsSortbarOpen(prev => !prev)
    }

    const onToggleFilterbar = () => {
        setIsFilterbarOpen(prev => !prev)
    }

    return (
        <>
            <div className="sticky bottom-0 bg-white border-b-[1px] border-t-[1px] border-line-divider">
                <div className="flex h-14">
                    <div className="flex-1 items-center pl-5 hidden md:flex">
                        <svg width="121" height="15" viewBox="0 0 121 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.31445 8.25366H3.64258L3.98438 6.24194L6.81641 6.25171C7.24609 6.25171 7.65625 6.19312 8.04688 6.07593C8.44401 5.95223 8.77604 5.75366 9.04297 5.48022C9.31641 5.20028 9.48893 4.82593 9.56055 4.35718C9.61914 3.91447 9.58008 3.56616 9.44336 3.31226C9.30664 3.05835 9.08854 2.87606 8.78906 2.76538C8.49609 2.64819 8.14779 2.58634 7.74414 2.57983L5.63477 2.57007L3.56445 14.4939H0.703125L3.16406 0.275146L7.83203 0.284912C8.44401 0.291423 9.03646 0.363037 9.60938 0.499756C10.1823 0.636475 10.6901 0.851318 11.1328 1.14429C11.5755 1.43726 11.9173 1.82463 12.1582 2.3064C12.4056 2.78817 12.5065 3.38062 12.4609 4.08374C12.4154 4.85197 12.194 5.48348 11.7969 5.97827C11.3997 6.46655 10.8919 6.83439 10.2734 7.08179C9.66146 7.32918 9.00391 7.47241 8.30078 7.51147L7.31445 8.25366ZM6.15234 14.4939H1.71875L3.22266 12.2087L6.24023 12.2185C6.66992 12.2185 7.07031 12.1469 7.44141 12.0037C7.81901 11.8539 8.13477 11.6326 8.38867 11.3396C8.64258 11.0466 8.80208 10.6723 8.86719 10.2166C8.92578 9.83244 8.90951 9.49715 8.81836 9.21069C8.72721 8.91772 8.55794 8.69312 8.31055 8.53687C8.06966 8.3741 7.7474 8.28296 7.34375 8.26343L4.45312 8.25366L4.81445 6.24194L8.13477 6.25171L8.62305 7.03296C9.26107 7.06551 9.81445 7.212 10.2832 7.47241C10.7585 7.72632 11.1198 8.08765 11.3672 8.5564C11.6146 9.02515 11.7155 9.5883 11.6699 10.2458C11.6048 11.2615 11.3086 12.0818 10.7812 12.7068C10.2539 13.3318 9.58008 13.7875 8.75977 14.074C7.94596 14.3604 7.07682 14.5004 6.15234 14.4939ZM15.5469 0.275146L20.5566 0.284912C21.4225 0.297933 22.207 0.457438 22.9102 0.763428C23.6198 1.06942 24.1699 1.5284 24.5605 2.14038C24.9577 2.75236 25.1237 3.53035 25.0586 4.47437C24.9935 5.2491 24.8047 5.9034 24.4922 6.43726C24.1862 6.97111 23.7728 7.42358 23.252 7.79468C22.7376 8.16577 22.1452 8.48478 21.4746 8.75171L20.4785 9.23022H15.8496L16.2402 6.94507L19.4238 6.9646C19.8991 6.95809 20.332 6.86694 20.7227 6.69116C21.1133 6.51538 21.4355 6.26147 21.6895 5.92944C21.9499 5.5909 22.1126 5.18075 22.1777 4.69897C22.2363 4.2758 22.207 3.90796 22.0898 3.59546C21.9792 3.28296 21.7871 3.03882 21.5137 2.86304C21.2402 2.68726 20.8919 2.59285 20.4688 2.57983L18.0176 2.57007L15.9473 14.4939H13.0859L15.5469 0.275146ZM20.8691 14.4939L18.8184 8.15601L21.6992 8.13647L23.916 14.3376V14.4939H20.8691ZM33.1738 2.85327L27.4512 14.4939H24.3066L31.9043 0.275146H33.916L33.1738 2.85327ZM34.3066 14.4939L32.5684 2.55054L32.6758 0.275146H34.5605L37.2461 14.4939H34.3066ZM35.0293 9.20093L34.6289 11.4958H27.3145L27.7148 9.20093H35.0293ZM52.2852 0.275146L49.8145 14.4939H47.041L43.1055 4.85522L41.4355 14.4939H38.5742L41.0352 0.275146H43.8184L47.7637 9.92358L49.4336 0.275146H52.2852ZM56.6699 14.4939H53.5059L53.916 12.2087L56.7578 12.2283C57.6432 12.2283 58.3887 12.0199 58.9941 11.6033C59.5996 11.1801 60.0749 10.6267 60.4199 9.94312C60.7715 9.25301 61.0091 8.50757 61.1328 7.70679L61.2207 7.01343C61.2793 6.51864 61.2988 6.01733 61.2793 5.50952C61.2598 4.9952 61.1654 4.51994 60.9961 4.08374C60.8333 3.64754 60.5729 3.29272 60.2148 3.01929C59.8568 2.74585 59.3717 2.59937 58.7598 2.57983L55.5176 2.57007L55.918 0.275146L58.8477 0.284912C59.7982 0.304443 60.625 0.499756 61.3281 0.87085C62.0312 1.23543 62.6074 1.73022 63.0566 2.35522C63.5059 2.98022 63.8184 3.69637 63.9941 4.50366C64.1699 5.30444 64.2057 6.14754 64.1016 7.03296L64.0234 7.72632C63.8932 8.67684 63.623 9.56551 63.2129 10.3923C62.8092 11.2192 62.2852 11.9418 61.6406 12.5603C61.0026 13.1723 60.2637 13.6508 59.4238 13.9958C58.584 14.3344 57.666 14.5004 56.6699 14.4939ZM57.5977 0.275146L55.127 14.4939H52.2656L54.7266 0.275146H57.5977ZM78.5938 0.275146L76.123 14.4939H73.3496L69.4141 4.85522L67.7441 14.4939H64.8828L67.3438 0.275146H70.127L74.0723 9.92358L75.7422 0.275146H78.5938ZM86.3965 2.85327L80.6738 14.4939H77.5293L85.127 0.275146H87.1387L86.3965 2.85327ZM87.5293 14.4939L85.791 2.55054L85.8984 0.275146H87.7832L90.4688 14.4939H87.5293ZM88.252 9.20093L87.8516 11.4958H80.5371L80.9375 9.20093H88.252ZM95.6152 0.275146H97.9395L99.668 10.6853L105.01 0.275146H107.529L100.088 14.4939H98.1348L95.6152 0.275146ZM94.2578 0.275146H96.6797L95.3418 10.5779L94.6484 14.4939H91.7969L94.2578 0.275146ZM106.357 0.275146H108.789L106.328 14.4939H103.457L104.189 10.3337L106.357 0.275146ZM118.467 12.2087L118.066 14.4939H110.713L111.104 12.2087H118.467ZM114.121 0.275146L111.65 14.4939H108.789L111.25 0.275146H114.121ZM118.574 6.06616L118.184 8.29272H111.787L112.178 6.06616H118.574ZM120.518 0.275146L120.117 2.57007H112.773L113.184 0.275146H120.518Z" fill="black" />
                        </svg>
                    </div>
                    <button className="flex justify-center items-center w-full md:w-auto md:px-10 border-l-[1px] border-line-divider" onClick={onToggleFilterbar}>
                        <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M3.01786 5.1367H2.21401C1.89842 5.1367 1.64258 4.88086 1.64258 4.56527C1.64258 4.24968 1.89842 3.99384 2.21401 3.99384H3.01786C3.25888 3.24777 3.95914 2.70813 4.78544 2.70813C5.61173 2.70813 6.31201 3.24777 6.55304 3.99384H14.7854C15.101 3.99384 15.3569 4.24968 15.3569 4.56527C15.3569 4.88086 15.101 5.1367 14.7854 5.1367H6.55304C6.31201 5.88278 5.61173 6.42242 4.78544 6.42242C3.95914 6.42242 3.25888 5.88278 3.01786 5.1367ZM3.78544 4.56527C3.78544 4.01299 4.23315 3.56527 4.78544 3.56527C5.33772 3.56527 5.78544 4.01299 5.78544 4.56527C5.78544 5.11756 5.33772 5.56527 4.78544 5.56527C4.23315 5.56527 3.78544 5.11756 3.78544 4.56527Z" fill="black" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M2.21401 9.70823H10.4688C10.7098 10.4543 11.41 10.9939 12.2364 10.9939C13.0626 10.9939 13.7629 10.4543 14.0039 9.70823H14.7854C15.101 9.70823 15.3569 9.45241 15.3569 9.13681C15.3569 8.82121 15.101 8.56538 14.7854 8.56538H14.0039C13.7629 7.81932 13.0626 7.27966 12.2364 7.27966C11.41 7.27966 10.7098 7.81932 10.4688 8.56538H2.21401C1.89842 8.56538 1.64258 8.82121 1.64258 9.13681C1.64258 9.45241 1.89842 9.70823 2.21401 9.70823ZM12.2364 8.13681C11.6841 8.13681 11.2364 8.58452 11.2364 9.13681C11.2364 9.68909 11.6841 10.1368 12.2364 10.1368C12.7886 10.1368 13.2364 9.68909 13.2364 9.13681C13.2364 8.58452 12.7886 8.13681 12.2364 8.13681Z" fill="black" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M6.44641 14.2796H2.21401C1.89842 14.2796 1.64258 14.0238 1.64258 13.7082C1.64258 13.3926 1.89842 13.1368 2.21401 13.1368H6.44641C6.68744 12.3907 7.38772 11.8511 8.21401 11.8511C9.04029 11.8511 9.74058 12.3907 9.98161 13.1368H14.7854C15.101 13.1368 15.3569 13.3926 15.3569 13.7082C15.3569 14.0238 15.101 14.2796 14.7854 14.2796H9.98161C9.74058 15.0257 9.04029 15.5654 8.21401 15.5654C7.38772 15.5654 6.68744 15.0257 6.44641 14.2796ZM7.21401 13.7082C7.21401 13.1559 7.66172 12.7082 8.21401 12.7082C8.76629 12.7082 9.21401 13.1559 9.21401 13.7082C9.21401 14.2605 8.76629 14.7082 8.21401 14.7082C7.66172 14.7082 7.21401 14.2605 7.21401 13.7082Z" fill="black" />
                        </svg>
                        <div className="ml-4 text-md font-normal tracking-widest">Фильтры</div>
                    </button>
                    <button className="flex justify-center items-center w-full md:w-auto md:px-10 border-l-[1px] border-line-divider" onClick={onToggleSortbar}>
                        <svg width="17" height="11" viewBox="0 0 17 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.83333 9.66056C5.83333 9.48375 5.90357 9.31418 6.0286 9.18916C6.15362 9.06413 6.32319 8.9939 6.5 8.9939H10.5C10.6768 8.9939 10.8464 9.06413 10.9714 9.18916C11.0964 9.31418 11.1667 9.48375 11.1667 9.66056C11.1667 9.83737 11.0964 10.0069 10.9714 10.132C10.8464 10.257 10.6768 10.3272 10.5 10.3272H6.5C6.32319 10.3272 6.15362 10.257 6.0286 10.132C5.90357 10.0069 5.83333 9.83737 5.83333 9.66056ZM3.16667 5.66056C3.16667 5.48375 3.2369 5.31418 3.36193 5.18916C3.48695 5.06413 3.65652 4.9939 3.83333 4.9939H13.1667C13.3435 4.9939 13.513 5.06413 13.6381 5.18916C13.7631 5.31418 13.8333 5.48375 13.8333 5.66056C13.8333 5.83737 13.7631 6.00694 13.6381 6.13197C13.513 6.25699 13.3435 6.32723 13.1667 6.32723H3.83333C3.65652 6.32723 3.48695 6.25699 3.36193 6.13197C3.2369 6.00694 3.16667 5.83737 3.16667 5.66056ZM0.5 1.66056C0.5 1.48375 0.570238 1.31418 0.695262 1.18916C0.820287 1.06413 0.989856 0.993896 1.16667 0.993896H15.8333C16.0101 0.993896 16.1797 1.06413 16.3047 1.18916C16.4298 1.31418 16.5 1.48375 16.5 1.66056C16.5 1.83737 16.4298 2.00694 16.3047 2.13197C16.1797 2.25699 16.0101 2.32723 15.8333 2.32723H1.16667C0.989856 2.32723 0.820287 2.25699 0.695262 2.13197C0.570238 2.00694 0.5 1.83737 0.5 1.66056Z" fill="black" />
                        </svg>
                        <div className="ml-4 text-md font-normal tracking-widest">Сортировка</div>
                    </button>
                </div>
            </div>
            <Sortbar
                isActive={isSortbarOpen}
                onClose={onToggleSortbar}
            />
            <Filterbar
                isActive={isFilterbarOpen}
                onClose={onToggleFilterbar}
            />
        </>
    )
}