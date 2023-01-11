/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react'
import useDebounce from '../../hooks/useDebounce';
import { useLazyCitiesQuery, useLazyCollectionsQuery, useLazyCountriesQuery, useLazyRegionsQuery } from '../../services/suggestionService';
import { ICollection } from '../../types/api';
import Input from './Input';

interface IProps {
    className?: string;
    id?: string;
    name?: string;
    collections: ICollection[];
    placeholder: string;
    onChange: (e: ICollection[]) => void;
}

export default function CollectionsSmartInput({ onChange, placeholder, className, collections, id, name }: IProps) {
    const ref = useRef<HTMLInputElement>(null)
    const [focus, setFocus] = useState(false)
    const [state, setState] = useState("")
    const debounced = useDebounce(state)

    const [suggest, { isFetching, isSuccess, data }] = useLazyCollectionsQuery()

    useEffect(() => {
        if (focus) {
            suggest({
                q: debounced,
                ids: collections.length > 0 ? collections.map(collection => collection.id) : undefined
            })
        }
    }, [debounced, focus])

    const onFocus = () => setFocus(true)
    const onBlur = () => setFocus(false)

    const onSelect = (collection: ICollection) => {
        setState("")

        if (collections.some(c => c.id === collection.id) === false) {
            onChange([...collections, collection])
        }
    }

    const onDelete = (id: string) => {
        onChange(collections.filter(c => c.id !== id))
    }

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState(prev => e.target.value)
    }

    return (
        <div className="relative">
            <input className={`w-full text-sm border-[1px] border-gray-300 rounded-md ${className}`} type="text" autoComplete="off" name={name} id={id} placeholder={placeholder} ref={ref} value={state} onChange={onInputChange} onFocus={onFocus} onBlur={onBlur} />
            {focus &&
                <div className={`absolute inset-x-0 flex flex-col bg-white mt-2 rounded-md z-40 ${data?.data.length !== 0 && "border-[1px] shadow-md"}`}>
                    {isFetching &&
                        <div className="flex justify-center">
                            <div className="animate-spin p-3">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4 3.99999V8.99999H4.582M4.582 8.99999C5.24585 7.35812 6.43568 5.9829 7.96503 5.08985C9.49438 4.1968 11.2768 3.8364 13.033 4.06513C14.7891 4.29386 16.4198 5.09878 17.6694 6.35377C18.919 7.60875 19.7168 9.24285 19.938 11M4.582 8.99999H9M20 20V15H19.419M19.419 15C18.7542 16.6409 17.564 18.015 16.0348 18.9073C14.5056 19.7995 12.7237 20.1595 10.9681 19.9309C9.21246 19.7022 7.5822 18.8979 6.33253 17.6437C5.08287 16.3896 4.28435 14.7564 4.062 13M19.419 15H15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </div>
                    }
                    {!isFetching && isSuccess &&
                        data?.data.map(collection =>
                            <div key={collection.id} className="px-3 py-2 hover:bg-gray-100 cursor-pointer" onMouseDown={() => onSelect(collection)}>{collection.title}</div>
                        )
                    }
                </div>
            }
            <div className="flex flex-wrap gap-2 mt-2">
                {collections.map(collection => (
                    <div key={collection.id} className="flex items-center text-sm pl-2 py-1 pr-1 bg-blue-500 text-white rounded">
                        <span>{collection.title}</span>
                        <button className="ml-1 rounded hover:bg-blue-600" onClick={() => onDelete(collection.id)}>
                            <svg width={20} height={20} className="fill-white" viewBox="0 0 20 20">
                                <path d="M6.707 5.293a1 1 0 0 0-1.414 1.414l3.293 3.293-3.293 3.293a1 1 0 1 0 1.414 1.414l3.293-3.293 3.293 3.293a1 1 0 0 0 1.414-1.414l-3.293-3.293 3.293-3.293a1 1 0 0 0-1.414-1.414l-3.293 3.293-3.293-3.293Z"></path>
                            </svg>
                        </button>
                    </div>
                ))}
            </div>
        </div >
    )
}
