import React from 'react'
import CollectionsSmartInput from '../../inputs/CollectionsSmartInput'
import Input from '../../inputs/Input'

export default function OrganizationInfo() {
    return (
        <div className="rounded-md bg-white shadow-sm">
            <h2 className="font-semibold p-5 border-b-[1px]">Организация</h2>
            <div className="space-y-4 p-5">
                <div className="flex flex-col">
                    <label htmlFor="vendor" className="text-sm text-gray-600 mb-1">Производитель</label>
                    <Input type="text" id="vendor" placeholder="Производитель" onChange={() => { }} />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="collection" className="text-sm text-gray-600 mb-1">Коллекция</label>
                    <CollectionsSmartInput id="collection" placeholder="Коллекция" onChange={() => { }} />
                </div>
            </div>
        </div>
    )
}
