import Link from 'next/link'
import { IErrorResponse } from '../../../types/api'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { useCreateOptionMutation, useRemoveOptionMutation, useUpdateOptionMutation } from '../../../services/productService';
import Input from '../../inputs/Input'

interface IItem {
    id: string;
    title: string;
    position: number;
}

interface IProps {
    productId: string;
    options: IItem[];
}

export default function OptionList({ productId, options }: IProps) {
    const [selected, setSelected] = useState<IItem | null>(null)
    const [items, setItems] = useState<IItem[]>(options)
    const [state, setState] = useState({
        newOption: ""
    })

    const [createOption, { isSuccess: isCreateOptionSuccess, isError: isCreateOptionError, error: createOptionError }] = useCreateOptionMutation()
    const [updateOption, { isSuccess: isUpdateOptionSuccess, isError: isUpdateOptionError, error: updateOptionError }] = useUpdateOptionMutation()
    const [removeOption, { isSuccess: isRemoveOptionSuccess, isError: isRemoveOptionError, error: removeOptionError }] = useRemoveOptionMutation()

    useEffect(() => {
        if (isCreateOptionSuccess) {
            toast.success("Опция создана")
        }

        if (isCreateOptionError) {
            if (createOptionError && "status" in createOptionError) {
                toast.error((createOptionError.data as IErrorResponse).message)
            } else {
                toast.error("Произошла неизвесная ошибка")
            }
        }
    }, [isCreateOptionSuccess, isCreateOptionError])

    useEffect(() => {
        if (isUpdateOptionSuccess) {
            toast.success("Опция обновлена")
        }

        if (isUpdateOptionError) {
            if (updateOptionError && "status" in updateOptionError) {
                toast.error((updateOptionError.data as IErrorResponse).message)
            } else {
                toast.error("Произошла неизвесная ошибка")
            }
        }
    }, [isUpdateOptionSuccess, isUpdateOptionError])

    useEffect(() => {
        if (isRemoveOptionSuccess) {
            setTimeout(() => toast.success("Опция удалена"), 100)
        }

        if (isRemoveOptionError) {
            if (removeOptionError && "status" in removeOptionError) {
                toast.error((removeOptionError.data as IErrorResponse).message)
            } else {
                toast.error("Произошла неизвесная ошибка")
            }
        }
    }, [isRemoveOptionSuccess, isRemoveOptionError])

    useEffect(() => {
        setItems(options)
    }, [options])

    const onDragStart = (e: React.DragEvent) => {
        if (selected === null) return e.preventDefault()
    }

    const onDragEnd = async (e: React.DragEvent) => {
        if (selected === null) return

        const currentPosition = items.findIndex(c => c.id === selected.id);
        if (selected.position !== currentPosition) {
            await updateOption({ productId, optionId: selected.id, position: currentPosition })
        }

        setSelected(null)
    }

    const onDragOver = (e: React.DragEvent, item: IItem, index: number) => {
        e.preventDefault();

        if (selected === null) return
        if (item.id === selected.id) return

        if (index !== selected.position) {
            const sortedItems = [...items].sort((a, b) => a.position - b.position)
            const mappedItems = sortedItems.map((current) => {
                if (current.id === item.id) {
                    return selected
                }

                if (current.id === selected.id) {
                    return item
                }

                return current
            })

            setItems(mappedItems)
        } else {
            setItems(options)
        }
    }

    const onStateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const onItemsInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setItems(prev => prev.map(c => c.id === e.target.name ? { ...c, title: e.target.value } : c))
    }

    const onOptionCreate = async (e: React.MouseEvent<HTMLButtonElement>) => {
        if (state.newOption.length === 0) {
            return toast.error("Опция не может быть пустой")
        }

        const result = await createOption({ productId, title: state.newOption }).unwrap()
        if (result.success === true) {
            setState(prev => ({ ...prev, newOption: "" }))
        }
    }

    const onOptionUpdate = async (item: IItem) => {
        if (item.title === options.find(c => c.id === item.id)?.title) {
            return
        }

        if (item.title.length === 0) {
            return toast.error("Опция не может быть пустой")
        }

        await updateOption({ productId, optionId: item.id, title: item.title })
    }

    const onOptionRemove = async (id: string) => {
        await removeOption({ productId, optionId: id }).unwrap()
    }

    return (
        <div className="rounded-md bg-white shadow-sm">
            <h2 className="font-semibold p-5 border-b-[1px]">Названия вариантов</h2>
            <div className="border-b-[1px] divide-y-[1px]" >
                {items.map((item, i) => (
                    <div
                        key={item.id}
                        className={selected?.id === item.id ? "opacity-30" : ""}
                        draggable="true"
                        onDragStart={onDragStart}
                        onDragEnd={onDragEnd}
                        onDragOver={(e) => onDragOver(e, item, i)}
                    >
                        <div className="flex-1 flex items-center justify-between pr-2 py-2 bg-white">
                            <div className="p-3 cursor-pointer" onMouseDown={() => setSelected(item)} onMouseUp={() => setSelected(null)}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 5V5.01M12 12V12.01M12 19V19.01M12 6C11.7348 6 11.4804 5.89464 11.2929 5.70711C11.1054 5.51957 11 5.26522 11 5C11 4.73478 11.1054 4.48043 11.2929 4.29289C11.4804 4.10536 11.7348 4 12 4C12.2652 4 12.5196 4.10536 12.7071 4.29289C12.8946 4.48043 13 4.73478 13 5C13 5.26522 12.8946 5.51957 12.7071 5.70711C12.5196 5.89464 12.2652 6 12 6ZM12 13C11.7348 13 11.4804 12.8946 11.2929 12.7071C11.1054 12.5196 11 12.2652 11 12C11 11.7348 11.1054 11.4804 11.2929 11.2929C11.4804 11.1054 11.7348 11 12 11C12.2652 11 12.5196 11.1054 12.7071 11.2929C12.8946 11.4804 13 11.7348 13 12C13 12.2652 12.8946 12.5196 12.7071 12.7071C12.5196 12.8946 12.2652 13 12 13ZM12 20C11.7348 20 11.4804 19.8946 11.2929 19.7071C11.1054 19.5196 11 19.2652 11 19C11 18.7348 11.1054 18.4804 11.2929 18.2929C11.4804 18.1054 11.7348 18 12 18C12.2652 18 12.5196 18.1054 12.7071 18.2929C12.8946 18.4804 13 18.7348 13 19C13 19.2652 12.8946 19.5196 12.7071 19.7071C12.5196 19.8946 12.2652 20 12 20Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <Input type="text" placeholder="option1" name={item.id} value={item.title} onChange={onItemsInputChange} onBlur={() => onOptionUpdate(item)} />
                            <button className="m-1 p-2 rounded-md hover:bg-gray-100" onClick={() => onOptionRemove(item.id)}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10 11V17M14 11V17M4 7H20M19 7L18.133 19.142C18.0971 19.6466 17.8713 20.1188 17.5011 20.4636C17.1309 20.8083 16.6439 21 16.138 21H7.862C7.35614 21 6.86907 20.8083 6.49889 20.4636C6.1287 20.1188 5.90292 19.6466 5.867 19.142L5 7H19ZM15 7V4C15 3.73478 14.8946 3.48043 14.7071 3.29289C14.5196 3.10536 14.2652 3 14 3H10C9.73478 3 9.48043 3.10536 9.29289 3.29289C9.10536 3.48043 9 3.73478 9 4V7H15Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                    </div>
                ))}
                {items.length < 3 &&
                    <div className="flex items-center pl-4 pr-2 py-2">
                        <Input type="text" className="" name="newOption" value={state.newOption} onChange={onStateInputChange} placeholder="Добавить опцию" />
                        <button className="m-1 p-2 rounded-md hover:bg-gray-100" onClick={onOptionCreate}>
                            <svg className="stroke-blue-800" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 9V12M12 12V15M12 12H15M12 12H9M21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4442 20.3149C14.3522 20.7672 13.1819 21 12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 9.61305 3.94821 7.32387 5.63604 5.63604C7.32387 3.94821 9.61305 3 12 3C14.3869 3 16.6761 3.94821 18.364 5.63604C20.0518 7.32387 21 9.61305 21 12Z" stroke="inherit" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                }
            </div>
        </div>
    )
}
