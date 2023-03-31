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
        newOption: "",
        newOptionValues: [""]
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
                toast.error((createOptionError.data as IErrorResponse)?.message)
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
                toast.error((updateOptionError.data as IErrorResponse)?.message)
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
                toast.error((removeOptionError.data as IErrorResponse)?.message)
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
                if (current.id === item.id) return selected
                if (current.id === selected.id) return item

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

        const createOptionValues = [...state.newOptionValues];
        createOptionValues.pop()

        if (createOptionValues.length === 0) {
            return toast.error("Опция должна иметь хотя бы одно значение")
        }

        const result = await createOption({ productId, title: state.newOption, createOptionValues }).unwrap()
        if (result.success === true) {
            setState(prev => ({ ...prev, newOption: "", newOptionValues: [""] }))
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

    const onNewOptionValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let newOptionValues = state.newOptionValues

        const splitValues = e.target.value.split(",")
        const filteredSplitValues = splitValues.filter(a => a.length !== 0)

        if (filteredSplitValues.length > 1) {
            newOptionValues.splice(Number(e.target.name), 1, ...filteredSplitValues.map(value => value.trim()))
        } else {
            newOptionValues[Number(e.target.name)] = e.target.value.replaceAll(",", "")
        }

        newOptionValues = newOptionValues.filter(value => value.length !== 0)

        if (newOptionValues.at(-1)?.length !== 0) {
            newOptionValues.push("")
        }

        setState(prev => ({ ...prev, newOptionValues }))
    }

    const onRemoveNewOptionValue = (i: number) => {
        const newOptionValues = state.newOptionValues

        newOptionValues.splice(i, 1)

        setState(prev => ({ ...prev, newOptionValues }))
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
                    <div className="">
                        <div className="px-5 py-4">
                            {state.newOption.length > 0 &&
                                <div className="text-sm text-gray-500">Название опций</div>
                            }
                            <div className="flex items-center">
                                <Input type="text" className="" name="newOption" value={state.newOption} onChange={onStateInputChange} placeholder="Добавить опцию" />
                            </div>
                        </div>
                        {state.newOption.length > 0 &&
                            <div className="px-5 py-2">
                                <div className="text-sm text-gray-500">Значения опций</div>
                                <div className="pb-2 space-y-2">
                                    {state.newOptionValues.map((value, i) =>
                                        <div key={i} className="flex items-center justify-between bg-white">
                                            <Input type="text" placeholder="Значение опции" name={i.toString()} value={value} onChange={onNewOptionValueChange} />
                                            {state.newOptionValues.length - 1 !== i &&
                                                <button className={`ml-2 p-2 rounded-md hover:bg-gray-100`} onClick={() => onRemoveNewOptionValue(i)}>
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M10 11V17M14 11V17M4 7H20M19 7L18.133 19.142C18.0971 19.6466 17.8713 20.1188 17.5011 20.4636C17.1309 20.8083 16.6439 21 16.138 21H7.862C7.35614 21 6.86907 20.8083 6.49889 20.4636C6.1287 20.1188 5.90292 19.6466 5.867 19.142L5 7H19ZM15 7V4C15 3.73478 14.8946 3.48043 14.7071 3.29289C14.5196 3.10536 14.2652 3 14 3H10C9.73478 3 9.48043 3.10536 9.29289 3.29289C9.10536 3.48043 9 3.73478 9 4V7H15Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </button>
                                            }
                                        </div>
                                    )}
                                    {state.newOptionValues.length > 1 &&
                                        <div className="flex ">
                                            <button className="flex-1 text-sm py-2 px-3 border-[1px] border-gray-300 hover:bg-gray-100 rounded-md font-medium" onClick={onOptionCreate}>Создать опцию</button>
                                        </div>
                                    }
                                </div>
                            </div>
                        }
                    </div>
                }
            </div>
        </div >
    )
}
