import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
    return (
        <div className="flex flex-col items-center mt-20">
            <div className="text-3xl font-bold">404 - Not Found</div>
            <Link to="/" className="text-blue-700 underline">Вернутся на главную</Link>
        </div>
    )
}
