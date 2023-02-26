
interface IProps {
    src: string;
    width: number;
}

export default function ImageLoader({ src, width }: IProps) {
    return `${ process.env.NEXT_PUBLIC_STATIC_URL }${src}/${width}.jpg`
}