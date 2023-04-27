import { useState, useEffect, useRef } from 'react';

interface IProps {
    onClose: () => void;
    triggerDelta: number;
}

function useDraggableYAndClose({ onClose, triggerDelta }: IProps) {
    const [dragging, setDragging] = useState(false);
    const [startY, setStartY] = useState(0);
    const [currentY, setCurrentY] = useState(0);

    const draggableRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        function onTouchStart(this: HTMLDivElement, e: TouchEvent) {
            e.preventDefault();
            setDragging(true);
            setStartY(e.touches[0].clientY);
            setCurrentY(e.touches[0].clientY);
        }

        function onTouchMove(this: HTMLDivElement, e: TouchEvent) {
            e.preventDefault();
            if (dragging) {
                setCurrentY(e.touches[0].clientY);
            }
        }

        function onTouchEnd() {
            setDragging(false);

            const shouldBeClosed = currentY - startY >= triggerDelta

            if (onClose && shouldBeClosed === true) {
                onClose()
            }

            setTimeout(() => {
                setStartY(0);
                setCurrentY(0);
            }, shouldBeClosed === true ? 300 : 0)
        }

        const draggableEl = draggableRef.current;

        if (draggableEl !== null) {
            draggableEl.addEventListener('touchstart', onTouchStart, { passive: false });
            draggableEl.addEventListener('touchmove', onTouchMove, { passive: false });
            draggableEl.addEventListener('touchend', onTouchEnd, { passive: false });
        }

        return () => {
            if (draggableEl !== null) {
                draggableEl.removeEventListener('touchstart', onTouchStart);
                draggableEl.removeEventListener('touchmove', onTouchMove);
                draggableEl.removeEventListener('touchend', onTouchEnd);
            }
        };
    }, [dragging, startY, currentY, onClose]);

    return { handle: draggableRef, deltaY: currentY - startY };
}

export default useDraggableYAndClose;