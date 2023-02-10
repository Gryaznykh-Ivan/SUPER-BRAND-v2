import Link from 'next/link'
import { IErrorResponse, IOption, IProductOption, ProductUpdateOptionRequest } from '../../../types/api'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { useCreateOptionMutation, useRemoveOptionMutation, useUpdateOptionMutation } from '../../../services/productService';
import Input from '../../inputs/Input'
import Option from '../cards/Option';

interface IProps {
    productId: string;
    options: IProductOption[];
}

export default function OptionList({ productId, options }: IProps) {
    const [selected, setSelected] = useState<IProductOption | null>(null)
    const [items, setItems] = useState<IProductOption[]>(options)
    const [state, setState] = useState({
        newOption: ""
    })
    
    const [createOption, { isSuccess: isCreateOptionSuccess, isError: isCreateOptionError, error: createOptionError }] = useCreateOptionMutation()
    const [updateOption, { isSuccess: isUpdateOptionSuccess, isError: isUpdateOptionError, error: updateOptionError }] = useUpdateOptionMutation()
    const [removeOption, { isSuccess: isRemoveOptionSuccess, isError: isRemoveOptionError, error: removeOptionError }] = useRemoveOptionMutation()
    
    
    useEffect(() => {
        setItems(options)
    }, [options])

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

    const onDragOver = (e: React.DragEvent, item: IProductOption, index: number) => {
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

    const onOptionUpdate = async (item: IProductOption) => {
        if (item.title === options.find(c => c.id === item.id)?.title) {
            return
        }

        if (item.title.length === 0) {
            return toast.error("Опция не может быть пустой")
        }

        await updateOption({ productId, optionId: item.id, title: item.title })
    }

    const onOptionValuesUpdate = async (id: string, data: Pick<ProductUpdateOptionRequest, "createOptionValues" | "deleteOptionValues" | "updateOptionValues">): Promise<boolean> => {
        try {
            await updateOption({ productId, optionId: id, ...data }).unwrap()

            return true
        } catch (e) {
            return false
        }
    }

    const onOptionRemove = async (id: string) => {
        await removeOption({ productId, optionId: id }).unwrap()
    }

    return (
        <div className="rounded-md bg-white shadow-sm">
            <h2 className="font-semibold p-5 border-b-[1px]">Опции</h2>
            <div className="border-b-[1px] divide-y-[1px]" >
                {items.map((item, index) => (
                    <Option
                        key={item.id}
                        className={selected?.id === item.id ? "opacity-30" : ""}
                        item={item}
                        index={index}
                        onOptionValuesUpdate={onOptionValuesUpdate}
                        onItemsInputChange={onItemsInputChange}
                        onOptionUpdate={onOptionUpdate}
                        onOptionRemove={onOptionRemove}
                        onDragStart={onDragStart}
                        onDragEnd={onDragEnd}
                        onDragOver={onDragOver}
                        setSelected={setSelected}
                    />
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
