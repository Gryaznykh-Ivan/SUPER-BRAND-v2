import React, { MutableRefObject, useEffect, useRef, useState } from "react"

let listenerCallbacks = new WeakMap();
let observer: IntersectionObserver;

function handleIntersections(entries: IntersectionObserverEntry[]) {
    entries.forEach(entry => {
        if (listenerCallbacks.has(entry.target)) {
            let cb = listenerCallbacks.get(entry.target);

            if (entry.isIntersecting || entry.intersectionRatio > 0) {
                observer.unobserve(entry.target);
                listenerCallbacks.delete(entry.target);
                cb();
            }
        }
    });
}

function getIntersectionObserver() {
    if (observer === undefined) {
        observer = new IntersectionObserver(handleIntersections, {
            rootMargin: '100px',
            threshold: 0.15,
        });
    }
    return observer;
}

export const useIntersection = (elem: MutableRefObject<HTMLElement | null>, cd: () => void) => {
    useEffect(() => {
        if (elem.current === null) return;

        let target = elem.current;
        let observer = getIntersectionObserver();

        listenerCallbacks.set(target, cd);
        observer.observe(target);

        return () => {
            listenerCallbacks.delete(target);
            observer.unobserve(target);
        };
    }, []);
}