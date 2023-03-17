import React, { useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify';
import { IOption, IProductOption, IProductOptionValue, ProductUpdateOptionRequest } from '../../../types/api';
import Input from '../../inputs/Input'

interface IProps {
    className: string;
    item: IProductOption;
    index: number;
    onOptionValuesUpdate: (id: string, data: Pick<ProductUpdateOptionRequest, "createOptionValues" | "deleteOptionValues" | "updateOptionValues" | "reorderOptionValue">) => Promise<boolean>;
    onItemsInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onOptionUpdate: (item: IProductOption) => void;
    onOptionRemove: (id: string) => void;
    onDragStart: (e: React.DragEvent) => void;
    onDragEnd: (e: React.DragEvent) => void;
    onDragOver: (e: React.DragEvent, item: IProductOption, index: number) => void;
    setSelected: (item: IProductOption | null) => void;
}

export default function Option({ className, item, index, onItemsInputChange, onDragStart: onDragOptionStart, onDragOver: onDragOptionOver, onDragEnd: onDragOptionEnd, setSelected: setOptionSelected, onOptionUpdate, onOptionRemove, onOptionValuesUpdate }: IProps) {
    const [selected, setSelected] = useState<IProductOptionValue | null>(null)
    const [state, setState] = useState({
        edit: false,
        newOptionValue: "",
        values: item.values
    })

    useEffect(() => {
        setState(prev => ({
            ...prev,
            newOptionValue: "",
            values: item.values
        }))
    }, [item])

    const onDragStart = (e: React.DragEvent) => {
        if (selected === null) return e.preventDefault()
    }

    const onDragEnd = async (e: React.DragEvent) => {
        if (selected === null) return

        const currentPosition = state.values.findIndex(c => c.id === selected.id);
        if (selected.position !== currentPosition) {
            await onOptionValuesUpdate(item.id, { reorderOptionValue: { id: selected.id, position: currentPosition } })
        }


        setSelected(null)
    }

    const onDragOver = (e: React.DragEvent, itemValue: IProductOptionValue, i: number) => {
        e.preventDefault();

        if (selected === null) return
        if (itemValue.id === selected.id) return

        if (i !== selected.position) {
            const sortedItems = [...state.values].sort((a, b) => a.position - b.position)
            const mappedItems = sortedItems.map((current) => {
                if (current.id === itemValue.id) return selected
                if (current.id === selected.id) return itemValue

                return current
            })

            setState(prev => ({ ...prev, values: mappedItems }))
        } else {
            setState(prev => ({ ...prev, values: item.values }))
        }
    }

    const onActionButtonClick = () => {
        if (state.edit) {
            onOptionRemove(item.id)
            return
        }

        setState(prev => ({ ...prev, edit: true }))
    }

    const onOptionValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState(prev => ({ ...prev, values: state.values.map(c => c.id === e.target.name ? { ...c, title: e.target.value } : c) }))
    }

    const onRemoveOptionValue = (id: string) => {
        setState(prev => ({ ...prev, values: state.values.filter(c => c.id !== id) }))
    }

    const onAddOptionValue = () => {
        if (state.newOptionValue === "") return
        if (state.values.find(c => c.title === state.newOptionValue)) {
            return toast.error("Такое значение уже создано")
        }

        setState(prev => ({ ...prev, newOptionValue: "", values: [...state.values, { id: `new${Math.random()}`, title: prev.newOptionValue, position: state.values.length }] }))
    }

    const mustBeSaved = useMemo(() => state.values.length !== item.values.length || state.values.some(c => item.values.find(a => a.id === c.id)?.title !== c.title), [state])

    const onSave = async () => {
        if (mustBeSaved === false) {
            return setState(prev => ({ ...prev, edit: false }))
        }

        if (state.values.some(c => c.title === "")) {
            return toast.error("Значение опции не может быть пустым")
        }

        setState(prev => ({ ...prev, edit: false }))

        const createOptionValues = state.values.filter(c => c.id.startsWith('new')).map(c => ({ title: c.title }))
        const deleteOptionValues = item.values.filter(c => state.values.find(a => a.id === c.id) === undefined).map(c => c.id)
        const updateOptionValues = state.values.filter(c => item.values.find(a => a.id === c.id && a.title !== c.title))

        const result = await onOptionValuesUpdate(item.id, {
            createOptionValues: createOptionValues.length !== 0 ? createOptionValues : undefined,
            deleteOptionValues: deleteOptionValues.length !== 0 ? deleteOptionValues : undefined,
            updateOptionValues: updateOptionValues.length !== 0 ? updateOptionValues : undefined,
        })

        if (result === false) {
            setState(prev => ({
                ...prev,
                edit: false,
                newOptionValue: "",
                values: item.values
            }))
        }
    }

    return (
        <div
            key={item.id}
            className={className}
            draggable="true"
            onDragStart={(e) => { if (selected === null) onDragOptionStart(e) }}
            onDragEnd={onDragOptionEnd}
            onDragOver={(e) => onDragOptionOver(e, item, index)}
        >
            <div className="flex-1  py-2">
                <div className="flex items-center justify-between pr-2 bg-white">
                    <div className="p-3 cursor-pointer" onMouseDown={() => setOptionSelected(item)} onMouseUp={() => setOptionSelected(null)}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 5V5.01M12 12V12.01M12 19V19.01M12 6C11.7348 6 11.4804 5.89464 11.2929 5.70711C11.1054 5.51957 11 5.26522 11 5C11 4.73478 11.1054 4.48043 11.2929 4.29289C11.4804 4.10536 11.7348 4 12 4C12.2652 4 12.5196 4.10536 12.7071 4.29289C12.8946 4.48043 13 4.73478 13 5C13 5.26522 12.8946 5.51957 12.7071 5.70711C12.5196 5.89464 12.2652 6 12 6ZM12 13C11.7348 13 11.4804 12.8946 11.2929 12.7071C11.1054 12.5196 11 12.2652 11 12C11 11.7348 11.1054 11.4804 11.2929 11.2929C11.4804 11.1054 11.7348 11 12 11C12.2652 11 12.5196 11.1054 12.7071 11.2929C12.8946 11.4804 13 11.7348 13 12C13 12.2652 12.8946 12.5196 12.7071 12.7071C12.5196 12.8946 12.2652 13 12 13ZM12 20C11.7348 20 11.4804 19.8946 11.2929 19.7071C11.1054 19.5196 11 19.2652 11 19C11 18.7348 11.1054 18.4804 11.2929 18.2929C11.4804 18.1054 11.7348 18 12 18C12.2652 18 12.5196 18.1054 12.7071 18.2929C12.8946 18.4804 13 18.7348 13 19C13 19.2652 12.8946 19.5196 12.7071 19.7071C12.5196 19.8946 12.2652 20 12 20Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>

                    <Input type="text" placeholder="option1" name={item.id} value={item.title} onChange={onItemsInputChange} onBlur={() => onOptionUpdate(item)} />
                    <button className="m-1 p-2 rounded-md hover:bg-gray-100" onClick={onActionButtonClick}>
                        {state.edit ? (
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 11V17M14 11V17M4 7H20M19 7L18.133 19.142C18.0971 19.6466 17.8713 20.1188 17.5011 20.4636C17.1309 20.8083 16.6439 21 16.138 21H7.862C7.35614 21 6.86907 20.8083 6.49889 20.4636C6.1287 20.1188 5.90292 19.6466 5.867 19.142L5 7H19ZM15 7V4C15 3.73478 14.8946 3.48043 14.7071 3.29289C14.5196 3.10536 14.2652 3 14 3H10C9.73478 3 9.48043 3.10536 9.29289 3.29289C9.10536 3.48043 9 3.73478 9 4V7H15Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        ) : (
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.675 4.317C13.249 2.561 10.751 2.561 10.325 4.317C10.049 5.452 8.749 5.99 7.753 5.382C6.209 4.442 4.443 6.209 5.383 7.752C5.5243 7.98375 5.60889 8.24559 5.62987 8.51621C5.65085 8.78683 5.60764 9.05859 5.50375 9.30935C5.39985 9.56011 5.23822 9.7828 5.032 9.95929C4.82578 10.1358 4.5808 10.2611 4.317 10.325C2.561 10.751 2.561 13.249 4.317 13.675C4.58056 13.7391 4.82529 13.8645 5.03127 14.0409C5.23726 14.2174 5.3987 14.44 5.50247 14.6906C5.60624 14.9412 5.64942 15.2128 5.62848 15.4832C5.60755 15.7537 5.5231 16.0153 5.382 16.247C4.442 17.791 6.209 19.557 7.752 18.617C7.98375 18.4757 8.24559 18.3911 8.51621 18.3701C8.78683 18.3491 9.05859 18.3924 9.30935 18.4963C9.56011 18.6001 9.7828 18.7618 9.95929 18.968C10.1358 19.1742 10.2611 19.4192 10.325 19.683C10.751 21.439 13.249 21.439 13.675 19.683C13.7391 19.4194 13.8645 19.1747 14.0409 18.9687C14.2174 18.7627 14.44 18.6013 14.6906 18.4975C14.9412 18.3938 15.2128 18.3506 15.4832 18.3715C15.7537 18.3924 16.0153 18.4769 16.247 18.618C17.791 19.558 19.557 17.791 18.617 16.248C18.4757 16.0162 18.3911 15.7544 18.3701 15.4838C18.3491 15.2132 18.3924 14.9414 18.4963 14.6907C18.6001 14.4399 18.7618 14.2172 18.968 14.0407C19.1742 13.8642 19.4192 13.7389 19.683 13.675C21.439 13.249 21.439 10.751 19.683 10.325C19.4194 10.2609 19.1747 10.1355 18.9687 9.95905C18.7627 9.78258 18.6013 9.55999 18.4975 9.30938C18.3938 9.05877 18.3506 8.78721 18.3715 8.51677C18.3924 8.24634 18.4769 7.98466 18.618 7.753C19.558 6.209 17.791 4.443 16.248 5.383C16.0162 5.5243 15.7544 5.60889 15.4838 5.62987C15.2132 5.65085 14.9414 5.60764 14.6907 5.50375C14.4399 5.39985 14.2172 5.23822 14.0407 5.032C13.8642 4.82578 13.7389 4.5808 13.675 4.317Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M14.1213 14.1213C14.6839 13.5587 15 12.7956 15 12C15 11.2044 14.6839 10.4413 14.1213 9.87868C13.5587 9.31607 12.7956 9 12 9C11.2044 9 10.4413 9.31607 9.87868 9.87868C9.31607 10.4413 9 11.2044 9 12C9 12.7956 9.31607 13.5587 9.87868 14.1213C10.4413 14.6839 11.2044 15 12 15C12.7956 15 13.5587 14.6839 14.1213 14.1213Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        )}
                    </button>
                </div>
                {state.edit === false &&
                    <div className={`px-5 flex flex-wrap gap-2 ${item.values.length !== 0 && "pt-1"}`}>
                        {item.values.map(value =>
                            <div key={value.id} className="px-2 rounded-md bg-blue-600 text-white font-medium text-sm">{value.title}</div>
                        )}
                    </div>
                }
            </div>
            {state.edit &&
                <div className="">
                    <div className="text-sm text-gray-500 pl-12">Значения опций</div>
                    <div className="pb-2">
                        {state.values.map((value, i) =>
                            <div
                                key={value.id}
                                className={`flex items-center justify-between pr-2 bg-white ${selected?.id === value.id ? "opacity-30" : ""}`}
                                draggable="true"
                                onDragStart={onDragStart}
                                onDragEnd={onDragEnd}
                                onDragOver={(e) => onDragOver(e, value, i)}
                            >
                                {mustBeSaved === false ?
                                    <div className="p-3 cursor-pointer" onMouseDown={() => setSelected(value)} onMouseUp={() => setSelected(null)}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 5V5.01M12 12V12.01M12 19V19.01M12 6C11.7348 6 11.4804 5.89464 11.2929 5.70711C11.1054 5.51957 11 5.26522 11 5C11 4.73478 11.1054 4.48043 11.2929 4.29289C11.4804 4.10536 11.7348 4 12 4C12.2652 4 12.5196 4.10536 12.7071 4.29289C12.8946 4.48043 13 4.73478 13 5C13 5.26522 12.8946 5.51957 12.7071 5.70711C12.5196 5.89464 12.2652 6 12 6ZM12 13C11.7348 13 11.4804 12.8946 11.2929 12.7071C11.1054 12.5196 11 12.2652 11 12C11 11.7348 11.1054 11.4804 11.2929 11.2929C11.4804 11.1054 11.7348 11 12 11C12.2652 11 12.5196 11.1054 12.7071 11.2929C12.8946 11.4804 13 11.7348 13 12C13 12.2652 12.8946 12.5196 12.7071 12.7071C12.5196 12.8946 12.2652 13 12 13ZM12 20C11.7348 20 11.4804 19.8946 11.2929 19.7071C11.1054 19.5196 11 19.2652 11 19C11 18.7348 11.1054 18.4804 11.2929 18.2929C11.4804 18.1054 11.7348 18 12 18C12.2652 18 12.5196 18.1054 12.7071 18.2929C12.8946 18.4804 13 18.7348 13 19C13 19.2652 12.8946 19.5196 12.7071 19.7071C12.5196 19.8946 12.2652 20 12 20Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                    :
                                    <div className="p-3 cursor-pointer" onMouseDown={() => setSelected(value)} onMouseUp={() => setSelected(null)}>
                                        <div className="w-6 h-6"></div>
                                    </div>
                                }
                                <Input type="text" placeholder="Значение опции" name={value.id} value={value.title} onChange={onOptionValueChange} />
                                <button className={`m-1 p-2 rounded-md hover:bg-gray-100 ${state.values.length < 2 && "invisible"}`} onClick={() => onRemoveOptionValue(value.id)}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10 11V17M14 11V17M4 7H20M19 7L18.133 19.142C18.0971 19.6466 17.8713 20.1188 17.5011 20.4636C17.1309 20.8083 16.6439 21 16.138 21H7.862C7.35614 21 6.86907 20.8083 6.49889 20.4636C6.1287 20.1188 5.90292 19.6466 5.867 19.142L5 7H19ZM15 7V4C15 3.73478 14.8946 3.48043 14.7071 3.29289C14.5196 3.10536 14.2652 3 14 3H10C9.73478 3 9.48043 3.10536 9.29289 3.29289C9.10536 3.48043 9 3.73478 9 4V7H15Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                            </div>
                        )}
                        <div className="flex items-center pr-2 pl-12">
                            <Input type="text" className="" name="newOptionValue" value={state.newOptionValue} onChange={(e) => setState(prev => ({ ...prev, [e.target.name]: e.target.value }))} placeholder="Добавить значение" />
                            <button className="m-1 p-2 rounded-md hover:bg-gray-100" onClick={onAddOptionValue}>
                                <svg className="stroke-blue-800" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 9V12M12 12V15M12 12H15M12 12H9M21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4442 20.3149C14.3522 20.7672 13.1819 21 12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 9.61305 3.94821 7.32387 5.63604 5.63604C7.32387 3.94821 9.61305 3 12 3C14.3869 3 16.6761 3.94821 18.364 5.63604C20.0518 7.32387 21 9.61305 21 12Z" stroke="inherit" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                        <div className="pl-12 pr-14">
                            <button className="w-full text-sm mt-2 py-2 px-3 border-[1px] border-gray-300 hover:bg-gray-100 rounded-md font-medium" onClick={onSave}>Готово</button>
                        </div>
                    </div>
                </div>
            }
        </div >
    )
}
