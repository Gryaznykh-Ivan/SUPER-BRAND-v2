
interface IProps {
    src: string;
    width: number;
}

export default function ImageLoader({ src, width }: IProps) {
    return `https://static.adminsb.space${src}/${width}.jpg`
}