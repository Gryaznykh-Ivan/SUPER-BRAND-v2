import React, { useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify';
import { productService } from '../../../services/productService';
import { useGetSettingsBySearchQuery, useUpdateSettingMutation } from '../../../services/settingService';
import { IErrorResponse, ProductCreateRequest, ProductUpdateRequest } from '../../../types/api';
import Input from '../../inputs/Input'
import TextArea from '../../inputs/TextArea'


export default function SEOSnippetProduct() {
    const { data, isLoading } = useGetSettingsBySearchQuery({ setting: "SEO-SNIPPET" })
    const [updateSetting, { isSuccess, isError, error }] = useUpdateSettingMutation()

    const [state, setState] = useState({
        title: "",
        description: ""
    })

    useEffect(() => {
        if (data?.data !== undefined) {
            const title = data.data.find(c => c.title === "title")?.value
            const description = data.data.find(c => c.title === "description")?.value

            setState(prev => ({
                ...prev,
                title: title || "",
                description: description || "",
            }))
        }
    }, [data])

    useEffect(() => {
        if (isSuccess) {
            toast.success("Шаблон снипета продукта обновлен")
        }

        if (isError) {
            if (error && "status" in error) {
                toast.error((error.data as IErrorResponse)?.message)
            } else {
                toast.error("Произошла неизвесная ошибка")
            }
        }
    }, [isSuccess, isError])

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const onSave = async () => {
        const updateSettings = Object.entries(state).filter(a => data?.data.find(c => c.title === a[0])?.value !== a[1]).map(setting => ({
            setting: "SEO-SNIPPET",
            title: setting[0],
            value: setting[1]
        }))

        await updateSetting({ updateSettings }).unwrap()
    }

    const mustBeSaved = useMemo(() => {
        return Object.entries(state).some(a => data?.data.find(c => c.title === a[0])?.value !== a[1])
    }, [state])

    return (
        <div className="rounded-md bg-white shadow-sm">
            <h2 className="font-semibold p-5 border-b-[1px]">Шаблон снипета продукта</h2>
            <div className="space-y-4 p-5">
                <div className="flex flex-col">
                    <div className="flex justify-between mb-1">
                        <label htmlFor="title" className="text-sm text-gray-600">Мета название</label>
                        <div className="text-gray-500 text-sm">{state.title.length} символов</div>
                    </div>
                    <Input type="text" id="title" placeholder="Мета название" name="title" value={state.title} onChange={onInputChange} />
                    <div className="text-gray-400 text-sm mt-1">Пример: [vendor] [title] [SKU] | SB</div>
                </div>
                <div className="flex flex-col">
                    <div className="flex justify-between mb-1">
                        <label htmlFor="description" className="text-sm text-gray-600">Мета описание</label>
                        <div className="text-gray-500 text-sm">{state.description.length} символов</div>
                    </div>
                    <TextArea id="description" placeholder="Mета описание" name="description" value={state.description} onChange={onInputChange} />
                    <div className="text-gray-400 text-sm mt-1">Пример: Покупай кроссовки [title] [SKU] в магазине SB</div>
                </div>
            </div>
            {isLoading === false && mustBeSaved === true &&
                <div className="flex">
                    <button className="flex-1 border-t-[1px] font-medium hover:bg-gray-50 py-3" onClick={onSave}>Сохранить</button>
                </div>
            }
        </div>
    )
}
