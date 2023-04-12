import React from 'react'
import dynamic from 'next/dynamic'

const QuillNoSSRWrapper = dynamic(() => import('react-quill'), {
    ssr: false,
    loading: () => <div className="w-full h-10 bg-gray-100 animate-pulse rounded-lg"></div>
})

const modules = {
    toolbar: [
        [{ header: [1, 2] }, { size: ['small', false, 'large', 'huge'] }],
        [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }],
        ['bold', 'italic', 'underline', 'strike'],
        [
            { list: 'ordered' },
            { list: 'bullet' },
        ],
        ['link'],
        ['clean'],
    ],
    clipboard: {
        matchVisual: false,
    },
}

const formats = [
    'header',
    'font',
    'align',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'list',
    'bullet',
    'link',
]

interface IProps {
    value: string;
    onChange: (value: string) => void;
}

export default function ReactQuill({ value, onChange }: IProps) {
    return <QuillNoSSRWrapper modules={modules} formats={formats} theme="snow" value={value} onChange={onChange} />
}