
interface IProps {
    src: string;
    width: number;
}

export default function ImageLoader({ src, width }: IProps) {
    return `http://static.sb.com${src}?w=${width}`
}