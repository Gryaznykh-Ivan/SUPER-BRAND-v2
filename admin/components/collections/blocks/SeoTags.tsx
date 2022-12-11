import React from 'react'
import Input from '../../inputs/Input'
import TextArea from '../../inputs/TextArea'

export default function SeoTags() {
    return (
        <div className="rounded-md bg-white shadow-sm">
            <h2 className="font-semibold p-5 border-b-[1px]">SEO теги</h2>
            <div className="space-y-4 p-5">
                <div className="flex flex-col">
                    <label htmlFor="metaTitle" className="text-sm text-gray-600 mb-1">Мета название</label>
                    <Input type="text" id="metaTitle" placeholder="Мета название" onChange={() => { }} />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="metaDescription" className="text-sm text-gray-600 mb-1">Мета описание</label>
                    <TextArea id="metaDescription" placeholder="мета описание" onChange={() => { }} />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="handle" className="text-sm text-gray-600 mb-1">URL ручка</label>
                    <Input type="text" id="handle" placeholder="URL ручка" onChange={() => { }} />
                </div>
            </div>
        </div>
    )
}
