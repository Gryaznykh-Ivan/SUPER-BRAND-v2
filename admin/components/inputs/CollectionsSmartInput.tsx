/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react'
import useDebounce from '../../hooks/useDebounce';
import { useLazyCitiesQuery, useLazyCountriesQuery, useLazyRegionsQuery } from '../../services/suggestionService';
import Input from './Input';

interface IProps {
    className?: string;
    id?: string;
    value?: string;
    name?: string;
    placeholder: string;
    onChange: (e: React.ChangeEvent<any>) => void;
}

export default function CollectionsSmartInput({ onChange, value, placeholder, className, id, name }: IProps) {
    const ref = useRef<HTMLInputElement>(null)
    const [focus, setFocus] = useState(false)
    const [state, setState] = useState(value ?? "")
    const debounced = useDebounce(state)

    const [suggest, { isFetching, isSuccess, data }] = useLazyCitiesQuery()

    useEffect(() => {
        if (focus) {
            
        }
    }, [debounced, focus])


    const onFocus = () => setFocus(true)
    const onBlur = () => setFocus(false)

    const onSelect = (value: string) => {
        const inputNativeSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")?.set;
        inputNativeSetter?.call(ref.current, value)

        const event = new Event('input', { bubbles: true })
        ref.current?.dispatchEvent(event)
    }

    return (
        <div className="relative">
            <input className={`w-full text-sm border-[1px] border-gray-300 rounded-md ${className}`} type="text" autoComplete="off" name={name} value={value} id={id} placeholder={placeholder} ref={ref} onChange={onChange} />
            <div className="flex flex-wrap gap-2 mt-2">
                <div className="flex items-center text-sm pl-2 py-1 pr-1 bg-blue-500 text-white rounded">
                    <span>New Balance</span>
                    <span className="cursor-pointer ml-1 rounded hover:bg-blue-600">
                        <svg width={20} height={20} className="fill-white" viewBox="0 0 20 20">
                            <path d="M6.707 5.293a1 1 0 0 0-1.414 1.414l3.293 3.293-3.293 3.293a1 1 0 1 0 1.414 1.414l3.293-3.293 3.293 3.293a1 1 0 0 0 1.414-1.414l-3.293-3.293 3.293-3.293a1 1 0 0 0-1.414-1.414l-3.293 3.293-3.293-3.293Z"></path>
                        </svg>
                    </span>
                </div>
                

            </div>
        </div >
    )
}
