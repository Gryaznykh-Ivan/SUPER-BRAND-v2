
const convertToCurrencyFormat = (format: (s: string) => string, price: string, locale="ru-RU") => {
    const num = parseInt(price);
    const formattedNum = num.toLocaleString(locale);

    return format(formattedNum);
}

export { convertToCurrencyFormat }