import React, { useRef } from 'react'
import { hideConfirm, showConfirm } from '../store/slices/confirm.slice'
import { useAppDispatch } from './store'

let resolver: Function 
export default function useConfirm() {
    const dispatch = useAppDispatch()

    const onConfirm = () => {
        resolver && resolver(true);
        dispatch(hideConfirm())
    }

    const onClose = () => {
        resolver && resolver(false);
        dispatch(hideConfirm())
    }

    const show = (title: string, message: string) => {
        dispatch(showConfirm({
            title, message
        }))

        return new Promise((resolve) => {
            resolver = resolve
        })
    }


    return { show, onConfirm, onClose }
}
