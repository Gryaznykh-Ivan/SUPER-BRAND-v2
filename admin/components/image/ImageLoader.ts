
interface IProps {
    src: string;
    width: number;
}

export default function ImageLoader({ src, width }: IProps) {
    return `${process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_STATIC_URL_PRODUCTION : process.env.NEXT_PUBLIC_STATIC_URL_DEVELOPMENT}${src}/${width}.jpg`
}