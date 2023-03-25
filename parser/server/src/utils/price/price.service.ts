import { Injectable } from '@nestjs/common';
import { Settings } from '@prisma-parser';

@Injectable()
export class PriceService {

    getShopPrice(price: number, { rate, upTo135, upTo200, upTo266, upTo333, upTo400, upTo466, upTo533, upTo600, upTo666, over666 }: Settings) {
        let result = price

        if (result <= 135) {
            result = eval(upTo135.replaceAll("x", result.toString())) * Number(rate)
        } else if (result <= 200) {
            result = eval(upTo200.replaceAll("x", result.toString())) * Number(rate)
        } else if (result <= 266) {
            result = eval(upTo266.replaceAll("x", result.toString())) * Number(rate)
        } else if (result <= 333) {
            result = eval(upTo333.replaceAll("x", result.toString())) * Number(rate)
        } else if (result <= 400) {
            result = eval(upTo400.replaceAll("x", result.toString())) * Number(rate)
        } else if (result <= 466) {
            result = eval(upTo466.replaceAll("x", result.toString())) * Number(rate)
        } else if (result <= 533) {
            result = eval(upTo533.replaceAll("x", result.toString())) * Number(rate)
        } else if (result <= 600) {
            result = eval(upTo600.replaceAll("x", result.toString())) * Number(rate)
        } else if (result <= 666) {
            result = eval(upTo666.replaceAll("x", result.toString())) * Number(rate)
        } else {
            result = eval(over666.replaceAll("x", result.toString())) * Number(rate)
        }

        result = Math.ceil(result / 1000) * 1000

        return result.toString()
    }

    getPrice(price: number, { rate }: Settings) {
        return (price * Number(rate)).toString()
    }
}