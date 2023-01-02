import React from 'react'
import Select from '../../inputs/Select'

export default function Roles() {
    return (
        <div className="rounded-md bg-white shadow-sm">
            <h2 className="font-semibold p-5 border-b-[1px]">Роль</h2>
            <div className="space-y-4 p-5">
                <Select options={{ CUSTOMER: "CUSTOMER", GUSTE: "GUEST", MANAGER : "MANAGER", ADMIN: "ADMIN" }} onChange={() => { }} />
            </div>
        </div>
    )
}
