import { useState, useEffect } from "react";

export default function useSetBodyScroll(resize = false) {
    const [bodyScroll, setBodyScroll] = useState(true);

    useEffect(() => {
        const resetOnResize = () => {
            if (window.innerWidth <= 767) document.body.style.overflow = "hidden";
            if (window.innerWidth >= 768) document.body.style.overflow = "auto";
        };

        if (!bodyScroll) {
            document.body.style.overflow = "hidden";
            if (resize === true) {
                window.addEventListener("resize", resetOnResize);
            }
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            if (resize === true) {
                window.removeEventListener("resize", resetOnResize);
            }
        };
    }, [bodyScroll, resize]);

    return setBodyScroll;
}