import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

interface IProps {
    redirectTo: string;
}

export default function Redirect({ redirectTo }: IProps) {
    const router = useRouter()

    useEffect(() => {
        router.push(redirectTo)
    })

    return <></>
}
