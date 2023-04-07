import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Fulfillment, FulfillmentStatus, InvoiceStatus, Offer, OfferStatus, OrderStatus, PaymentStatus, Return, ReturnStatus, OrderService as Service, Invoice, InvoiceType, Service as ServiceEnum, InvoiceMethod, Prisma } from '@prisma/client';
import { IUser } from 'src/interfaces/user.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderDto } from './dto/createOrder.dto';
import { CreateFulfillmentDto, UpdateFulfillmentDto } from './dto/fulfillment.dto';
import { CreateReturnDto, UpdateReturnDto } from './dto/return.dto';
import { SearchOrderDto } from './dto/searchOrder.dto';
import { SearchTimelineDto } from './dto/searchTimeline.dto';
import { UpdateOrderDto } from './dto/updateOrder.dto';

@Injectable()
export class OrderService {
    constructor(
        private prisma: PrismaService
    ) { }

    async getOrdersBySearch(data: SearchOrderDto) {
        const fulltextSearch = data.q ? data.q.replace(/[+\-<>()~*\"@]+/g, " ").replace(/\s+/g, " ").trim().split(" ").filter(word => word.length > 2).map(word => `+${word}*`).join(" ") : undefined
        const whereQuery = {
            OR: [
                {
                    user: {
                        phone: {
                            search: fulltextSearch ? fulltextSearch : undefined,
                        },
                        fullName: {
                            search: fulltextSearch ? fulltextSearch : undefined,
                        },
                        email: {
                            search: fulltextSearch ? fulltextSearch : undefined,
                        }
                    }
                },
                {
                    id: isNaN(Number(data.q)) === false ? Number(data.q) : undefined,
                }
            ],
            orderStatus: data.orderStatus ? data.orderStatus : undefined,
            paymentStatus: data.paymentStatus ? data.paymentStatus : undefined,
        }

        const orders = await this.prisma.order.findMany({
            where: whereQuery,
            select: {
                id: true,
                user: {
                    select: {
                        id: true,
                        fullName: true
                    }
                },
                returnStatus: true,
                createdAt: true,
                totalPrice: true,
                paymentStatus: true,
                orderStatus: true,
                _count: {
                    select: {
                        offers: true,
                        services: true,
                    }
                }
            },
            skip: data.skip,
            take: data.limit,
            orderBy: [{
                createdAt: 'desc'
            }]
        })

        const result = orders.map(order => ({
            id: order.id,
            user: order.user.fullName,
            createdAt: order.createdAt,
            totalPrice: order.totalPrice,
            paymentStatus: order.paymentStatus,
            returnStatus: order.returnStatus,
            orderStatus: order.orderStatus,
            offersCount: order._count.offers,
            servicesCount: order._count.services,
        }))

        return {
            success: true,
            data: result
        }
    }

    async getTimelinesBySearch(orderId: number, data: SearchTimelineDto) {
        const timelines = await this.prisma.timeline.findMany({
            where: {
                orderId: orderId
            },
            select: {
                id: true,
                title: true,
                message: true,
                user: {
                    select: {
                        id: true,
                        fullName: true
                    }
                },
                createdAt: true
            },
            skip: data.skip,
            take: data.limit,
            orderBy: [{
                createdAt: 'desc'
            }]
        })

        const result = timelines.map(timeline => ({
            id: timeline.id,
            user: timeline.user?.fullName ?? null,
            title: timeline.title,
            message: timeline.message,
            createdAt: timeline.createdAt
        }))

        return {
            success: true,
            data: result
        }
    }

    async getOrderById(orderId: number) {
        const order = await this.prisma.order.findUnique({
            where: { id: orderId },
            select: {
                id: true,
                note: true,
                userId: true,
                mailingAddress: true,
                mailingCity: true,
                mailingCountry: true,
                mailingRegion: true,
                totalPrice: true,
                paymentStatus: true,
                orderStatus: true,
                returnStatus: true,
                offers: {
                    where: {
                        fulfillmentId: null,
                        status: OfferStatus.SOLD
                    },
                    select: {
                        id: true,
                        productTitle: true,
                        variantTitle: true,
                        image: {
                            select: {
                                id: true,
                                alt: true,
                                src: true
                            }
                        },
                        price: true,
                        deliveryProfile: {
                            select: {
                                id: true,
                                title: true
                            }
                        }
                    }
                },
                returns: {
                    select: {
                        id: true,
                        status: true,
                        offers: {
                            select: {
                                reason: true,
                                offer: {
                                    select: {
                                        id: true,
                                        productTitle: true,
                                        variantTitle: true,
                                        image: {
                                            select: {
                                                id: true,
                                                alt: true,
                                                src: true
                                            }
                                        },
                                        price: true
                                    }
                                }
                            }
                        }
                    }
                },
                fulfillments: {
                    select: {
                        id: true,
                        status: true,
                        offers: {
                            select: {
                                id: true,
                                productTitle: true,
                                variantTitle: true,
                                image: {
                                    select: {
                                        id: true,
                                        alt: true,
                                        src: true
                                    }
                                },
                                price: true,
                                deliveryProfile: {
                                    select: {
                                        id: true,
                                        title: true
                                    }
                                }
                            }
                        }
                    },
                    orderBy: {
                        createdAt: 'desc'
                    }
                },
                services: {
                    select: {
                        id: true,
                        type: true,
                        description: true,
                        amount: true
                    }
                },
                invoices: {
                    where: {
                        status: InvoiceStatus.SUCCEEDED
                    },
                    select: {
                        id: true,
                        type: true,
                        amount: true,
                    }
                },
                removedOffers: {
                    select: {
                        id: true,
                        productTitle: true,
                        variantTitle: true,
                        image: {
                            select: {
                                id: true,
                                alt: true,
                                src: true
                            }
                        },
                        price: true,
                        deliveryProfile: {
                            select: {
                                id: true,
                                title: true
                            }
                        }
                    }
                }
            }
        })

        if (order === null) {
            throw new HttpException("Заказ не найден", HttpStatus.BAD_REQUEST)
        }

        const result = {
            id: order.id,
            note: order.note,
            userId: order.userId,
            mailingAddress: order.mailingAddress,
            mailingCity: order.mailingCity,
            mailingCountry: order.mailingCountry,
            mailingRegion: order.mailingRegion,
            totalPrice: Number(order.totalPrice),
            paymentStatus: order.paymentStatus,
            orderStatus: order.orderStatus,
            returnStatus: order.returnStatus,
            offers: order.offers.map(offer => ({
                id: offer.id,
                product: offer.productTitle,
                variant: offer.variantTitle,
                image: offer.image,
                deliveryProfile: offer.deliveryProfile,
                price: offer.price
            })),
            fulfillments: order.fulfillments.map(fulfillment => ({
                id: fulfillment.id,
                offers: fulfillment.offers.map(offer => ({
                    id: offer.id,
                    product: offer.productTitle,
                    variant: offer.variantTitle,
                    image: offer.image,
                    deliveryProfile: offer.deliveryProfile,
                    price: offer.price
                })),
                status: fulfillment.status
            })),
            returns: order.returns.map(orderReturn => ({
                id: orderReturn.id,
                offers: orderReturn.offers.map(({ offer, reason }) => ({
                    id: offer.id,
                    product: offer.productTitle,
                    variant: offer.variantTitle,
                    image: offer.image,
                    price: offer.price,
                    reason: reason,
                })),
                status: orderReturn.status,
            })),
            removedOffers: order.removedOffers.map(offer => ({
                id: offer.id,
                product: offer.productTitle,
                variant: offer.variantTitle,
                image: offer.image,
                deliveryProfile: offer.deliveryProfile,
                price: offer.price
            })),
            services: order.services,
            paid: this.getPaymentSummary(order.invoices)
        }

        return {
            success: true,
            data: result
        }
    }

    async createOrder(data: CreateOrderDto, self: IUser) {
        const createOrderQuery = {
            mailingCountry: data.mailingCountry,
            mailingCity: data.mailingCity,
            mailingRegion: data.mailingRegion,
            mailingAddress: data.mailingAddress,
            note: data.note,
            userId: data.userId,
            services: {
                createMany: {
                    data: data.services
                }
            },
            timeline: {
                createMany: {
                    data: [{
                        title: "Заказ создан",
                        userId: self.id
                    }]
                }
            }
        }

        if (data.services && data.services.some(service => service.type === ServiceEnum.DISCOUNT_PERCENT && (service.amount > 100 || service.amount <= 0))) {
            throw new HttpException("Процентная скидка должна быть больше 0 и меньше либо равно 100", HttpStatus.BAD_REQUEST)
        }

        try {
            const order = await this.prisma.$transaction(async tx => {
                const offers = await tx.offer.findMany({
                    where: {
                        id: {
                            in: data.offers.map(offer => offer.id)
                        },
                        status: OfferStatus.ACTIVE
                    },
                    select: {
                        id: true,
                        price: true,
                        variantId: true,
                    }
                })

                if (offers.length !== data.offers.length) {
                    throw new HttpException("Часть товаров не доступна к покупке", HttpStatus.BAD_REQUEST)
                }

                await tx.offer.updateMany({
                    where: {
                        id: {
                            in: offers.map(offer => offer.id)
                        }
                    },
                    data: {
                        status: OfferStatus.SOLD
                    }
                })

                const { total } = this.getOrderSummary(offers, data.services.map(service => ({ type: service.type, amount: new Prisma.Decimal(service.amount) })));

                return await tx.order.create({
                    data: {
                        ...createOrderQuery,
                        totalPrice: total,
                        offers: {
                            connect: offers.map(offer => ({ id: offer.id }))
                        }
                    }
                })
            })

            return {
                success: true,
                data: order.id
            }
        } catch (e) {
            throw new HttpException("Произошла ошибка на стороне сервера", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async updateOrder(orderId: number, data: UpdateOrderDto, self: IUser) {
        const updateOrderQuery = {
            mailingCountry: data.mailingCountry,
            mailingCity: data.mailingCity,
            mailingRegion: data.mailingRegion,
            mailingAddress: data.mailingAddress,
            note: data.note,
            userId: data.userId,
            timeline: {
                create: {
                    title: "Заказ обновлен",
                    message: `Обновленные поля:\n${Object.keys(data).join("\n")}`,
                    userId: self.id,
                }
            }
        }

        if (data.createServices && data.createServices.some(service => service.type === ServiceEnum.DISCOUNT_PERCENT && (service.amount > 100 || service.amount <= 0))) {
            throw new HttpException("Процентная скидка должна быть больше 0 и меньше либо равно 100", HttpStatus.BAD_REQUEST)
        }

        if (data.deleteServices !== undefined || data.createServices !== undefined) {
            Object.assign(updateOrderQuery, {
                services: {
                    deleteMany: data.deleteServices ?? [],
                    createMany: {
                        data: data.createServices ?? []
                    }
                }
            })
        }

        if (data.deleteOffers !== undefined || data.createOffers !== undefined) {
            const offers = await this.prisma.offer.findMany({
                where: {
                    id: {
                        in: data.createOffers?.map(offer => offer.id) ?? []
                    },
                    status: OfferStatus.ACTIVE
                },
                select: {
                    id: true,
                    price: true,
                    variantId: true,
                }
            })

            if (data.createOffers !== undefined && offers.length !== data.createOffers.length) {
                throw new HttpException("Часть товаров не доступна к покупке", HttpStatus.BAD_REQUEST)
            }

            Object.assign(updateOrderQuery, {
                offers: {
                    disconnect: data.deleteOffers ?? [],
                    connect: data.createOffers ?? []
                },
                removedOffers: {
                    connect: data.deleteOffers ?? []
                }
            })
        }

        try {
            await this.prisma.$transaction(async tx => {
                await tx.offer.updateMany({
                    where: {
                        id: {
                            in: data.createOffers?.map(offer => offer.id) ?? []
                        }
                    },
                    data: {
                        status: OfferStatus.SOLD
                    }
                })

                // Удаленным товарам имеющим соответствие ставим активный статус
                await tx.offer.updateMany({
                    where: {
                        id: {
                            in: data.deleteOffers?.map(offer => offer.id) ?? []
                        },
                        variantId: {
                            not: null
                        }
                    },
                    data: {
                        status: OfferStatus.RETURN_APPROVAL
                    }
                })

                // Удаленным товарам не имеющим соответствия ставим статус NO_MATCH
                await tx.offer.updateMany({
                    where: {
                        id: {
                            in: data.deleteOffers?.map(offer => offer.id) ?? []
                        },
                        variantId: null
                    },
                    data: {
                        status: OfferStatus.NO_MATCH
                    }
                })

                const order = await tx.order.update({
                    where: {
                        id: orderId
                    },
                    data: updateOrderQuery,
                    select: {
                        id: true,
                        totalPrice: true,
                        offers: {
                            where: {
                                status: OfferStatus.SOLD
                            },
                            select: {
                                id: true,
                                price: true,
                                fulfillmentId: true,
                            }
                        },
                        fulfillments: {
                            select: {
                                id: true,
                                status: true
                            }
                        },
                        services: {
                            select: {
                                id: true,
                                type: true,
                                amount: true
                            }
                        },
                        invoices: {
                            where: {
                                status: InvoiceStatus.SUCCEEDED
                            },
                            select: {
                                id: true,
                                type: true,
                                amount: true
                            }
                        }
                    }
                })

                const { total } = this.getOrderSummary(order.offers, order.services)
                const paid = this.getPaymentSummary(order.invoices)

                await tx.order.update({
                    where: {
                        id: orderId
                    },
                    data: {
                        totalPrice: total,
                        paymentStatus: this.getPaymentStatus(total, paid),
                        orderStatus: this.getOrderStatus(order.offers, order.fulfillments)
                    }
                })
            })

            return {
                success: true
            }
        } catch (e) {
            console.log(e)

            throw new HttpException("Произошла ошибка на стороне сервера", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async getFulfillmentById(fulfillmentId: string) {
        const fulfillment = await this.prisma.fulfillment.findUnique({
            where: { id: fulfillmentId },
            select: {
                id: true,
                status: true,
                carrier: true,
                tracking: true,
                offers: {
                    select: {
                        id: true,
                        productTitle: true,
                        variantTitle: true,
                        image: {
                            select: {
                                id: true,
                                alt: true,
                                src: true
                            }
                        },
                        price: true,
                        deliveryProfile: {
                            select: {
                                id: true,
                                title: true
                            }
                        }
                    }
                }
            }
        })

        if (fulfillment === null) {
            throw new HttpException("Отправка не найдена", HttpStatus.BAD_REQUEST)
        }

        const result = {
            id: fulfillment.id,
            offers: fulfillment.offers.map(offer => ({
                id: offer.id,
                product: offer.productTitle,
                variant: offer.variantTitle,
                image: offer.image,
                deliveryProfile: offer.deliveryProfile,
                price: offer.price
            })),
            status: fulfillment.status,
            carrier: fulfillment.carrier,
            tracking: fulfillment.tracking
        }

        return {
            success: true,
            data: result
        }
    }

    async getReturnById(returnId: string) {
        const orderReturn = await this.prisma.return.findUnique({
            where: { id: returnId },
            select: {
                id: true,
                status: true,
                carrier: true,
                tracking: true,
                offers: {
                    select: {
                        reason: true,
                        offer: {
                            select: {
                                id: true,
                                productTitle: true,
                                variantTitle: true,
                                image: {
                                    select: {
                                        id: true,
                                        alt: true,
                                        src: true
                                    }
                                },
                                price: true
                            }
                        }
                    }
                }
            }
        })

        if (orderReturn === null) {
            throw new HttpException("Возврат не найдена", HttpStatus.BAD_REQUEST)
        }

        const result = {
            id: orderReturn.id,
            offers: orderReturn.offers.map(({ offer, reason }) => ({
                id: offer.id,
                product: offer.productTitle,
                variant: offer.variantTitle,
                image: offer.image,
                price: offer.price,
                reason: reason,
            })),
            status: orderReturn.status,
            carrier: orderReturn.carrier,
            tracking: orderReturn.tracking
        }

        return {
            success: true,
            data: result
        }
    }

    async createFulfillment(orderId: number, data: CreateFulfillmentDto, self: IUser) {
        const order = await this.prisma.order.findUnique({
            where: { id: orderId },
            select: {
                id: true,
                offers: {
                    where: {
                        fulfillmentId: null,
                        status: OfferStatus.SOLD
                    },
                    select: {
                        id: true,
                        productTitle: true,
                        variantTitle: true,
                    }
                }
            }
        })

        if (order === null) {
            throw new HttpException("Заказ не найден", HttpStatus.BAD_REQUEST)
        }

        if (data.offers.every(c => order.offers.some(offer => offer.id === c.id)) === false) {
            throw new HttpException("Часть товаров которые вы хотите отправить не добавлены в заказ либо уже отправлены", HttpStatus.BAD_REQUEST)
        }

        try {
            const fulfillment = await this.prisma.$transaction(async tx => {
                const offersToFulfill = order.offers.filter(c => data.offers.some(offer => offer.id === c.id))

                const fulfillment = await tx.fulfillment.create({
                    data: {
                        orderId: order.id,
                        offers: {
                            connect: offersToFulfill.map(c => ({ id: c.id }))
                        }
                    },
                    select: {
                        id: true
                    }
                })

                const updatedOrder = await tx.order.findUnique({
                    where: { id: order.id },
                    select: {
                        fulfillments: {
                            select: {
                                id: true,
                                status: true
                            }
                        },
                        offers: {
                            where: {
                                status: OfferStatus.SOLD
                            },
                            select: {
                                id: true,
                                fulfillmentId: true
                            }
                        }
                    }
                })

                await tx.order.update({
                    where: { id: order.id },
                    data: {
                        timeline: {
                            create: {
                                title: "Отправка товаров",
                                message: `${offersToFulfill.map(offer => `${offer.productTitle} ${offer.variantTitle}`).join("\n")}`,
                                userId: self.id,
                            }
                        },
                        orderStatus: this.getOrderStatus(updatedOrder.offers, updatedOrder.fulfillments)
                    }
                })

                return fulfillment
            })

            return {
                success: true,
                data: fulfillment.id
            }
        } catch (e) {
            throw new HttpException("Произошла ошибка на стороне сервера", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }


    async updateFulfillment(orderId: number, fulfillmentId: string, data: UpdateFulfillmentDto, self: IUser) {
        const updateFulfillmentQuery = {
            tracking: data.tracking,
            status: data.status,
            carrier: data.carrier
        }

        try {
            await this.prisma.$transaction(async tx => {
                const fulfillment = await tx.fulfillment.update({
                    where: { id: fulfillmentId },
                    data: updateFulfillmentQuery,
                    select: {
                        orderId: true
                    }
                })

                const updatedOrder = await tx.order.findUnique({
                    where: { id: fulfillment.orderId },
                    select: {
                        fulfillments: {
                            select: {
                                id: true,
                                status: true
                            }
                        },
                        offers: {
                            where: {
                                status: OfferStatus.SOLD
                            },
                            select: {
                                id: true,
                                fulfillmentId: true
                            }
                        }
                    }
                })

                await tx.order.update({
                    where: { id: fulfillment.orderId },
                    data: {
                        timeline: {
                            create: {
                                title: "Изменение отправки",
                                message: `Обновленные поля:\n${Object.keys(data).join("\n")}`,
                                userId: self.id,
                            }
                        },
                        orderStatus: this.getOrderStatus(updatedOrder.offers, updatedOrder.fulfillments)
                    }
                })
            })

            return {
                success: true
            }
        } catch (e) {
            throw new HttpException("Произошла ошибка на стороне сервера", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }


    async removeFulfillment(orderId: number, fulfillmentId: string, self: IUser) {
        const fulfillment = await this.prisma.fulfillment.findFirst({
            where: {
                id: fulfillmentId
            },
            select: {
                id: true,
                orderId: true,
                offers: {
                    select: {
                        id: true,
                        productTitle: true,
                        variantTitle: true,
                    }
                }
            }
        })

        if (fulfillment === null) {
            throw new HttpException("Отправка не найдена", HttpStatus.BAD_REQUEST)
        }

        try {
            await this.prisma.$transaction(async tx => {
                await tx.fulfillment.delete({
                    where: { id: fulfillment.id }
                })

                const updatedOrder = await tx.order.findUnique({
                    where: { id: fulfillment.orderId },
                    select: {
                        fulfillments: {
                            select: {
                                id: true,
                                status: true
                            }
                        },
                        offers: {
                            where: {
                                status: OfferStatus.SOLD
                            },
                            select: {
                                id: true,
                                fulfillmentId: true
                            }
                        }
                    }
                })

                await tx.order.update({
                    where: { id: fulfillment.orderId },
                    data: {
                        timeline: {
                            create: {
                                title: "Удаление отправки",
                                message: `${fulfillment.offers.map(offer => `${offer.productTitle} ${offer.variantTitle}`).join("\n")}`,
                                userId: self.id,
                            }
                        },
                        orderStatus: this.getOrderStatus(updatedOrder.offers, updatedOrder.fulfillments)
                    }
                })
            })

            return {
                success: true
            }
        } catch (e) {
            throw new HttpException("Произошла ошибка на стороне сервера", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async confirmPayment(orderId: number, self: IUser) {
        try {
            await this.prisma.$transaction(async tx => {
                const order = await tx.order.findUnique({
                    where: {
                        id: orderId
                    },
                    select: {
                        id: true,
                        totalPrice: true,
                        services: {
                            select: {
                                id: true,
                                amount: true
                            }
                        },
                        invoices: {
                            where: {
                                status: InvoiceStatus.SUCCEEDED
                            },
                            select: {
                                id: true,
                                type: true,
                                amount: true
                            }
                        }
                    }
                })

                const totalPrice = Number(order.totalPrice)
                const totalPaid = this.getPaymentSummary(order.invoices)
                const priceDifference = totalPrice - totalPaid;

                if (priceDifference === 0) {
                    throw new HttpException("Невозможно закрыть разницу в счете, так как нет разрыва", HttpStatus.BAD_REQUEST)
                }

                await tx.invoice.create({
                    data: {
                        orderId: orderId,
                        status: InvoiceStatus.SUCCEEDED,
                        amount: Math.abs(priceDifference),
                        type: priceDifference > 0 ? InvoiceType.PAYMENT : InvoiceType.REFUND,
                        method: priceDifference > 0 ? InvoiceMethod.CASH : InvoiceMethod.CASHLESS
                    }
                })

                await tx.order.update({
                    where: {
                        id: orderId
                    },
                    data: {
                        paymentStatus: totalPrice !== 0 ? PaymentStatus.PAID : PaymentStatus.REFUNDED,
                        timeline: {
                            create: {
                                title: priceDifference > 0 ? `Заказ оплачен` : `Возврат разрыва`,
                                message: priceDifference > 0 ? `Заказ отмечен как оплаченный: ${Math.abs(priceDifference)} руб.` : `Разница была возвращена клиенту: ${Math.abs(priceDifference)} руб.`,
                                userId: self.id,
                            }
                        },
                    }
                })
            })

            return {
                success: true
            }
        } catch (e) {

            throw new HttpException("Произошла ошибка на стороне сервера", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async createReturn(orderId: number, data: CreateReturnDto, self: IUser) {
        const order = await this.prisma.order.findUnique({
            where: { id: orderId },
            select: {
                id: true,
                offers: {
                    where: {
                        fulfillmentId: {
                            not: null
                        }
                    },
                    select: {
                        id: true,
                        productTitle: true,
                        variantTitle: true,
                    }
                }
            }
        })

        if (order === null) {
            throw new HttpException("Заказ не найден", HttpStatus.BAD_REQUEST)
        }

        if (data.offers.every(c => order.offers.some(offer => offer.id === c.id)) === false) {
            throw new HttpException("Часть товаров которые вы хотите оформить на возврат недоступны к возврату", HttpStatus.BAD_REQUEST)
        }

        try {
            const orderReturn = await this.prisma.$transaction(async tx => {
                const offersToReturn = order.offers.filter(c => data.offers.some(offer => offer.id === c.id))

                const orderReturn = await tx.return.create({
                    data: {
                        orderId: order.id,
                        offers: {
                            createMany: {
                                data: data.offers.map(c => ({
                                    offerId: c.id,
                                    reason: c.reason
                                }))
                            }
                        },
                        status: ReturnStatus.RETURN_IN_PROGRESS
                    },
                    select: {
                        id: true
                    }
                })

                await tx.offer.updateMany({
                    where: {
                        id: {
                            in: data.offers.map(c => c.id)
                        }
                    },
                    data: {
                        status: OfferStatus.RETURNING,
                        fulfillmentId: null
                    }
                })

                // удаляем фулфилменты без офферов
                await tx.fulfillment.deleteMany({
                    where: {
                        offers: {
                            none: {}
                        }
                    }
                })

                const updatedOrder = await tx.order.findUnique({
                    where: { id: order.id },
                    select: {
                        returns: {
                            select: {
                                status: true
                            }
                        },
                        id: true,
                        totalPrice: true,
                        offers: {
                            where: {
                                status: OfferStatus.SOLD
                            },
                            select: {
                                id: true,
                                price: true,
                                fulfillmentId: true,
                            }
                        },
                        fulfillments: {
                            select: {
                                id: true,
                                status: true
                            }
                        },
                        services: {
                            select: {
                                id: true,
                                type: true,
                                amount: true
                            }
                        },
                        invoices: {
                            where: {
                                status: InvoiceStatus.SUCCEEDED
                            },
                            select: {
                                id: true,
                                type: true,
                                amount: true
                            }
                        }
                    }
                })

                const { total } = this.getOrderSummary(updatedOrder.offers, updatedOrder.services)
                const paid = this.getPaymentSummary(updatedOrder.invoices)

                await tx.order.update({
                    where: { id: order.id },
                    data: {
                        timeline: {
                            create: {
                                title: "Оформлен возврат товаров",
                                message: `${offersToReturn.map(offer => `${offer.productTitle} ${offer.variantTitle}`).join("\n")}`,
                                userId: self.id,
                            }
                        },
                        totalPrice: total,
                        paymentStatus: this.getPaymentStatus(total, paid),
                        orderStatus: this.getOrderStatus(updatedOrder.offers, updatedOrder.fulfillments),
                        returnStatus: this.getReturnStatus(updatedOrder.returns)
                    }
                })

                return orderReturn
            })

            return {
                success: true,
                data: orderReturn.id
            }
        } catch (e) {
            throw new HttpException("Произошла ошибка на стороне сервера", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async updateReturn(orderId: number, returnId: string, data: UpdateReturnDto, self: IUser) {
        const orderReturn = await this.prisma.return.findUnique({
            where: {
                id: returnId
            },
            select: {
                status: true
            }
        })

        if (orderReturn.status === ReturnStatus.RETURNED) {
            throw new HttpException("Изменение возврата невозможно после restock`a", HttpStatus.BAD_REQUEST)
        }

        const updateReturnQuery = {
            status: data.status,
            tracking: data.tracking,
            carrier: data.carrier
        }

        try {
            await this.prisma.$transaction(async tx => {
                if (data.status === ReturnStatus.RETURNED) {
                    // Удаляем соответствие с заказом
                    await tx.offer.updateMany({
                        where: {
                            returned: {
                                some: {
                                    returnId
                                }
                            }
                        },
                        data: {
                            orderId: null,
                            status: OfferStatus.NO_MATCH
                        }
                    })

                    // Проставляем статус если есть соотстветствие с вариантом
                    await tx.offer.updateMany({
                        where: {
                            returned: {
                                some: {
                                    returnId
                                }
                            },
                            variantId: {
                                not: null
                            }
                        },
                        data: {
                            status: OfferStatus.RETURN_APPROVAL
                        }
                    })
                }

                const orderReturn = await tx.return.update({
                    where: { id: returnId },
                    data: updateReturnQuery,
                    select: {
                        status: true,
                        orderId: true
                    }
                })


                const updatedOrder = await tx.order.findUnique({
                    where: { id: orderReturn.orderId },
                    select: {
                        returns: {
                            select: {
                                status: true
                            }
                        },
                    }
                })

                await tx.order.update({
                    where: { id: orderReturn.orderId },
                    data: {
                        timeline: {
                            create: {
                                title: "Изменение возврата",
                                message: `Обновленные поля:\n${Object.keys(data).join("\n")}`,
                                userId: self.id,
                            }
                        },
                        returnStatus: this.getReturnStatus(updatedOrder.returns)
                    }
                })
            })

            return {
                success: true
            }
        } catch (e) {
            if (e.name === HttpException.name) {
                console.log(e.status)
                throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
            }

            throw new HttpException("Произошла ошибка на стороне сервера", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async removeReturn(orderId: number, returnId: string, self: IUser) {
        const orderReturn = await this.prisma.return.findUnique({
            where: {
                id: returnId
            },
            select: {
                status: true,
                offers: {
                    select: {
                        offerId: true
                    }
                }
            }
        })

        if (orderReturn.status === ReturnStatus.RETURNED) {
            throw new HttpException("Отмена возврата невозможна после restock`a", HttpStatus.BAD_REQUEST)
        }

        try {
            await this.prisma.$transaction(async tx => {
                await tx.fulfillment.create({
                    data: {
                        orderId,
                        status: FulfillmentStatus.DELIVERED,
                        offers: {
                            connect: orderReturn.offers.map(c => ({ id: c.offerId }))
                        }
                    },
                    select: {
                        id: true
                    }
                })

                await tx.offer.updateMany({
                    where: {
                        id: {
                            in: orderReturn.offers.map(c => c.offerId)
                        }
                    },
                    data: {
                        status: OfferStatus.SOLD
                    }
                })

                await tx.return.delete({
                    where: {
                        id: returnId
                    }
                })

                const updatedOrder = await tx.order.findUnique({
                    where: { id: orderId },
                    select: {
                        returns: {
                            select: {
                                status: true
                            }
                        },
                        id: true,
                        totalPrice: true,
                        offers: {
                            where: {
                                status: OfferStatus.SOLD
                            },
                            select: {
                                id: true,
                                price: true,
                                fulfillmentId: true,
                            }
                        },
                        fulfillments: {
                            select: {
                                id: true,
                                status: true
                            }
                        },
                        services: {
                            select: {
                                id: true,
                                type: true,
                                amount: true,
                            }
                        },
                        invoices: {
                            where: {
                                status: InvoiceStatus.SUCCEEDED
                            },
                            select: {
                                id: true,
                                type: true,
                                amount: true
                            }
                        }
                    }
                })

                const { total } = this.getOrderSummary(updatedOrder.offers, updatedOrder.services)
                const paid = this.getPaymentSummary(updatedOrder.invoices)

                await tx.order.update({
                    where: { id: orderId },
                    data: {
                        timeline: {
                            create: {
                                title: "Отмена возврата",
                                message: ``,
                                userId: self.id,
                            }
                        },
                        totalPrice: total,
                        paymentStatus: this.getPaymentStatus(total, paid),
                        orderStatus: this.getOrderStatus(updatedOrder.offers, updatedOrder.fulfillments),
                        returnStatus: this.getReturnStatus(updatedOrder.returns)
                    }
                })
            })

            return {
                success: true
            }
        } catch (e) {
            throw new HttpException("Произошла ошибка на стороне сервера", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }


    private getOrderSummary(offers: Pick<Offer, "price">[], services: Pick<Service, "type" | "amount">[]) {
        const subtotalProducts = offers.reduce((total, product) => total + Number(product.price), 0)
        const subtotalService = services.reduce((total, service) => {
            switch (service.type) {
                case ServiceEnum.DISCOUNT_AMOUNT:
                    total = total - Number(service.amount)
                    break;
                case ServiceEnum.DISCOUNT_PERCENT:
                    total = total - (subtotalProducts * (Number(service.amount) / 100))
                    break;
                case ServiceEnum.SHIPPING:
                    total = total + Number(service.amount)
                    break;
            }

            return total
        }, 0)

        return {
            subtotalProducts,
            subtotalService,
            total: subtotalProducts + subtotalService > 0 ? subtotalProducts + subtotalService : 0
        }
    }

    private getPaymentSummary(invoices: Pick<Invoice, "amount" | "type">[]) {
        return invoices.reduce((total, invoice) => {
            switch (invoice.type) {
                case InvoiceType.PAYMENT:
                    total = total + Number(invoice.amount)
                    break;
                case InvoiceType.REFUND:
                    total = total - Number(invoice.amount)
                    break;
            }

            return total
        }, 0)
    }

    private getReturnStatus(returns: Pick<Return, "status">[]) {
        return returns.some(c => c.status === ReturnStatus.RETURN_REQUESTED)
            ? ReturnStatus.RETURN_REQUESTED
            : returns.some(c => c.status === ReturnStatus.RETURN_IN_PROGRESS)
                ? ReturnStatus.RETURN_IN_PROGRESS
                : returns.every(c => c.status === ReturnStatus.RETURNED)
                    ? ReturnStatus.RETURNED
                    : null
    }

    private getOrderStatus(offers: Pick<Offer, "id" | "fulfillmentId">[], fulfillments: Pick<Fulfillment, "id" | "status">[]) {
        return offers.filter(offer => offer.fulfillmentId === null).length === 0 && fulfillments.every(fulfillment => fulfillment.status === FulfillmentStatus.DELIVERED) && offers.length !== 0
            ? OrderStatus.FULFILLED
            : fulfillments.some(fulfillment => fulfillment.status === FulfillmentStatus.DELIVERED)
                ? OrderStatus.PARTIALLY_FULFILLED
                : offers.length !== 0
                    ? OrderStatus.UNFULFILLED
                    : OrderStatus.CANCELED
    }

    private getPaymentStatus(total: number, paid: number) {
        return total === paid && paid !== 0
            ? PaymentStatus.PAID
            : total < paid
                ? PaymentStatus.NEED_TO_RETURN
                : paid !== 0
                    ? PaymentStatus.PARTIALLY_PAID
                    : PaymentStatus.UNPAID
    }
}