import React, { RefObject, useCallback, useRef } from 'react'

export default function useScrollToTop() {
    const scrollToTop = (behavior: ScrollBehavior) => {
        window.scrollTo({
            top: 0,
            behavior
        })
    }

    return { scrollToTop }
}
