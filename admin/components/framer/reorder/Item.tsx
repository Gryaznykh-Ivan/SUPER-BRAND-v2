import { Reorder, useDragControls } from "framer-motion"

interface IProps {
    children: React.ReactNode,
    value: unknown;
}

export default function Item({ children, value }: IProps) {
    const controls = useDragControls()

    return (
        <Reorder.Item
            className="flex items-center select-none"
            value={value}
            dragListener={false}
            dragControls={controls}
        >
            <div
                className="p-3 cursor-grab"
                onPointerDown={(e) => controls.start(e)}
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 5V5.01M12 12V12.01M12 19V19.01M12 6C11.7348 6 11.4804 5.89464 11.2929 5.70711C11.1054 5.51957 11 5.26522 11 5C11 4.73478 11.1054 4.48043 11.2929 4.29289C11.4804 4.10536 11.7348 4 12 4C12.2652 4 12.5196 4.10536 12.7071 4.29289C12.8946 4.48043 13 4.73478 13 5C13 5.26522 12.8946 5.51957 12.7071 5.70711C12.5196 5.89464 12.2652 6 12 6ZM12 13C11.7348 13 11.4804 12.8946 11.2929 12.7071C11.1054 12.5196 11 12.2652 11 12C11 11.7348 11.1054 11.4804 11.2929 11.2929C11.4804 11.1054 11.7348 11 12 11C12.2652 11 12.5196 11.1054 12.7071 11.2929C12.8946 11.4804 13 11.7348 13 12C13 12.2652 12.8946 12.5196 12.7071 12.7071C12.5196 12.8946 12.2652 13 12 13ZM12 20C11.7348 20 11.4804 19.8946 11.2929 19.7071C11.1054 19.5196 11 19.2652 11 19C11 18.7348 11.1054 18.4804 11.2929 18.2929C11.4804 18.1054 11.7348 18 12 18C12.2652 18 12.5196 18.1054 12.7071 18.2929C12.8946 18.4804 13 18.7348 13 19C13 19.2652 12.8946 19.5196 12.7071 19.7071C12.5196 19.8946 12.2652 20 12 20Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
            {children}
        </Reorder.Item>
    )
}