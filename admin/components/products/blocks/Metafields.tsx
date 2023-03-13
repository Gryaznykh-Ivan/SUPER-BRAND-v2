import React, { useEffect, useMemo, useState } from 'react'
import { IMetafield, ProductUpdateRequest } from '../../../types/api';
import Input from '../../inputs/Input'

interface IProps {
    metafields: IMetafield[];
    onChange: (obj: ProductUpdateRequest) => void;
}

export default function Metafields({ onChange, ...data }: IProps) {
    const initialState = useMemo(() => [...data.metafields, { id: Math.random().toString(), key: "", value: "" }], [data.metafields])
    const [state, setState] = useState<IMetafield[]>(initialState)

    useEffect(() => {
        const metafields = [...state];
        metafields.pop();

        const createMetafields = metafields.filter(metafield => !data.metafields.some(c => c.id === metafield.id)).map(c => ({ key: c.key, value: c.value }))
        const deleteMetafields = data.metafields.filter(metafield => !metafields.some(c => c.id === metafield.id)).map(c => ({ id: c.id }))
        const updateMetafields = metafields.filter(metafield => data.metafields.some(c => c.id === metafield.id && (c.key !== metafield.key || c.value !== metafield.value)))

        onChange({
            createMetafields: createMetafields.length !== 0 ? createMetafields : undefined,
            updateMetafields: updateMetafields.length !== 0 ? updateMetafields : undefined,
            deleteMetafields: deleteMetafields.length !== 0 ? deleteMetafields : undefined
        })
    }, [state])

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(state)

        if (state.at(-1)?.id === e.target.id && e.target.name === "key" && e.target.value !== "") {
            setState(prev => ([...prev, { id: Math.random().toString(), key: "", value: "" }]))
        }

        if (e.target.name === "key" && e.target.value === "") {
            onDelete(e.target.id)
        }

        setState(prev => prev.map(item => item.id === e.target.id ? { ...item, [e.target.name]: e.target.value } : item))
    };

    const onDelete = (id: string) => {
        setState(prev => prev.filter(item => item.id !== id));
    };

    return (
        <div className="rounded-md bg-white overflow-hidden">
            <div className="p-3 border-b-[1px]">
                <div className="font-semibold ml-2">Мета поля</div>
            </div>
            <div className="p-3 space-y-3">
                {state.map((metafield, index) =>
                    <div key={metafield.id} className="flex">
                        <div className="flex-1 flex gap-3">
                            <Input type="text" className="bg-gray-100 hover:bg-gray-200 focus:bg-gray-200 focus:ring-0 border-0 w-40" placeholder="Ключ" id={metafield.id} name="key" value={metafield.key} onChange={onInputChange} />
                            <Input type="text" className="bg-gray-100 hover:bg-gray-200 focus:bg-gray-200 focus:ring-0 border-0 flex-1" placeholder="Значение" id={metafield.id} name="value" value={metafield.value} onChange={onInputChange} />
                        </div>
                        {state.length !== index + 1 &&
                            <button className="ml-2 p-2 rounded-md hover:bg-gray-100" onClick={() => onDelete(metafield.id)}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10 11V17M14 11V17M4 7H20M19 7L18.133 19.142C18.0971 19.6466 17.8713 20.1188 17.5011 20.4636C17.1309 20.8083 16.6439 21 16.138 21H7.862C7.35614 21 6.86907 20.8083 6.49889 20.4636C6.1287 20.1188 5.90292 19.6466 5.867 19.142L5 7H19ZM15 7V4C15 3.73478 14.8946 3.48043 14.7071 3.29289C14.5196 3.10536 14.2652 3 14 3H10C9.73478 3 9.48043 3.10536 9.29289 3.29289C9.10536 3.48043 9 3.73478 9 4V7H15Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        }
                    </div>
                )}
            </div>
        </div>
    )
}
