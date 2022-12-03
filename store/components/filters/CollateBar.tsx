import React, { useEffect, useState } from 'react'
import useSetBodyScroll from '../../hooks/useSetBodyScroll'
import { IProductGridCols } from '../../types'
import FilterIcon from '../icons/Filter'
import SortIcon from '../icons/Sort'

import Wall1x1Icon from '../icons/Wall1x1'
import Wall2x2Icon from '../icons/Wall2x2'
import Wall3x3Icon from '../icons/Wall3x3'
import Wall4x4Icon from '../icons/Wall4x4'
import FilterBar from './Filter'
import SortBar from './Sort'

interface IProps {
    productGridCols: IProductGridCols;
    onProductGridColsChange: (name: string, count: number) => void
}

export default function CollateBar({ productGridCols, onProductGridColsChange }: IProps) {
    const [barStatus, setBarStatus] = useState({
        isSortOpened: false,
        isFilterOpened: false,
    })

    const setBodyScroll = useSetBodyScroll()

    useEffect(() => {
        setBodyScroll(!barStatus.isFilterOpened && !barStatus.isSortOpened)
    }, [barStatus])

    const onBarOpen = (name: string) => {
        setBarStatus({ isSortOpened: false, isFilterOpened: false, [name]: true })
    }

    const onSortClose = () => {
        setBarStatus(prev => ({ ...prev, isSortOpened: false }))
    }

    const onFilterClose = () => {
        setBarStatus(prev => ({ ...prev, isFilterOpened: false }))
    }

    return (
        <>
            <div className="sticky bottom-0 h-14 bg-white border-b-[1px] border-t-[1px] flex justify-between">
                <div className="flex">
                    <button className="flex justify-center items-center h-full w-16 border-r-[1px] md:border-l-[1px]" onClick={ () => onBarOpen('isFilterOpened') }>
                        <FilterIcon />
                    </button>
                    <button className="flex justify-center items-center h-full w-16 border-r-[1px] md:border-l-[1px]" onClick={ () => onBarOpen('isSortOpened') }>
                        <SortIcon />
                    </button>
                </div>
                <div className="border-l-[1px] md:border-r-[1px] px-2 hidden md:flex">
                    <button className="group/4x4 flex justify-center items-center h-full w-12 noselect" onClick={ () => onProductGridColsChange("laptop", 4) }>
                        <Wall4x4Icon className={`${ productGridCols.laptop !== 4 ? "stroke-gray-500" : "stroke-black" } group-hover/4x4:stroke-black`} />
                    </button>
                    <button className="group/3x3 flex justify-center items-center h-full w-12" onClick={ () => onProductGridColsChange("laptop", 3) }>
                        <Wall3x3Icon className={`${ productGridCols.laptop !== 3 ? "stroke-gray-500" : "stroke-black" } group-hover/3x3:stroke-black`} />
                    </button>
                </div>
                <div className="flex border-l-[1px] md:border-r-[1px] px-2 md:hidden">
                    <button className="group/2x2 flex justify-center items-center h-full w-12 noselect" onClick={ () => onProductGridColsChange("mobile", 2) }>
                        <Wall2x2Icon className={`${ productGridCols.mobile !== 2 ? "stroke-gray-500" : "stroke-black" } group-hover/2x2:stroke-black`} />
                    </button>
                    <button className="group/1x1 flex justify-center items-center h-full w-12" onClick={ () => onProductGridColsChange("mobile", 1) }>
                        <Wall1x1Icon className={`${ productGridCols.mobile !== 1 ? "stroke-gray-500" : "stroke-black" } group-hover/1x1:stroke-black`} />
                    </button>
                </div>
            </div>
            <FilterBar
                isActive={barStatus.isFilterOpened}
                onFilter={() => { }}
                onClose={onFilterClose}
            />
            <SortBar
                isActive={barStatus.isSortOpened}
                onSort={() => { }}
                onClose={onSortClose}
            />
        </>
    )
}
