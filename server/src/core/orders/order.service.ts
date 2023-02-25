import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FulfillmentStatus, InvoiceStatus, OfferStatus, OrderStatus, PaymentStatus, Prisma } from '@prisma/client';
import { IUser } from 'src/interfaces/user.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderDto } from './dto/createOrder.dto';
import { CreateFulfillmentDto, UpdateFulfillmentDto } from './dto/fulfillment.dto';
import { SearchOrderDto } from './dto/searchOrder.dto';
import { SearchTimelineDto } from './dto/searchTimeline.dto';
import { UpdateOrderDto } from './dto/updateOrder.dto';

@Injectable()
export class OrderService {
    constructor(
        private prisma: PrismaService
    ) { }

    async getOrdersBySearch(data: SearchOrderDto) {
        const whereQuery = {
            OR: [
                {
                    user: {
                        phone: {
                            search: data.q ? `${data.q}*` : undefined,
                        },
                        fullName: {
                            search: data.q ? `${data.q}*` : undefined,
                        },
                        email: {
                            search: data.q ? `${data.q}*` : undefined,
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
                createdAt: true,
                totalPrice: true,
                paymentStatus: true,
                orderStatus: true,
                _count: {
                    select: {
                        products: true,
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
            orderStatus: order.orderStatus,
            productsCount: order._count.products,
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
                products: {
                    where: {
                        fulfillmentId: null
                    },
                    select: {
                        id: true,
                        offer: {
                            select: {
                                id: true,
                                price: true,
                                deliveryProfile: {
                                    select: {
                                        id: true,
                                        title: true
                                    }
                                },
                                variant: {
                                    select: {
                                        id: true,
                                        option0: true,
                                        option1: true,
                                        option2: true,
                                        product: {
                                            select: {
                                                title: true,
                                                options: {
                                                    select: {
                                                        title: true,
                                                        option: true,
                                                    },
                                                    orderBy: [{ position: 'asc' }]
                                                },
                                                images: {
                                                    select: {
                                                        id: true,
                                                        alt: true,
                                                        src: true,
                                                        position: true
                                                    },
                                                    orderBy: {
                                                        position: 'asc'
                                                    },
                                                    take: 1
                                                }
                                            }
                                        },
                                        images: {
                                            select: {
                                                id: true,
                                                alt: true,
                                                src: true,
                                                position: true
                                            },
                                            orderBy: {
                                                position: 'asc'
                                            },
                                            take: 1
                                        }
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
                        products: {
                            select: {
                                id: true,
                                offer: {
                                    select: {
                                        id: true,
                                        price: true,
                                        deliveryProfile: {
                                            select: {
                                                id: true,
                                                title: true
                                            }
                                        },
                                        variant: {
                                            select: {
                                                id: true,
                                                option0: true,
                                                option1: true,
                                                option2: true,
                                                product: {
                                                    select: {
                                                        title: true,
                                                        options: {
                                                            select: {
                                                                title: true,
                                                                option: true,
                                                            },
                                                            orderBy: [{ position: 'asc' }]
                                                        },
                                                        images: {
                                                            select: {
                                                                id: true,
                                                                alt: true,
                                                                src: true,
                                                                position: true
                                                            },
                                                            orderBy: {
                                                                position: 'asc'
                                                            },
                                                            take: 1
                                                        }
                                                    }
                                                },
                                                images: {
                                                    select: {
                                                        id: true,
                                                        alt: true,
                                                        src: true,
                                                        position: true
                                                    },
                                                    orderBy: {
                                                        position: 'asc'
                                                    },
                                                    take: 1
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                services: {
                    select: {
                        id: true,
                        type: true,
                        description: true,
                        price: true
                    }
                },
                invoices: {
                    where: {
                        status: InvoiceStatus.SUCCEEDED
                    },
                    select: {
                        id: true,
                        amount: true,
                        currency: true
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
            products: order.products.map(product => ({
                id: product.id,
                product: product.offer.variant.product.title,
                variant: product.offer.variant.product.options.map((option) => product.offer.variant[`option${option.option}`]).join(' | '),
                image: product.offer.variant.images[0] ?? product.offer.variant.product.images[0] ?? null,
                deliveryProfile: product.offer.deliveryProfile,
                price: product.offer.price,
                offerId: product.offer.id
            })),
            fulfillments: order.fulfillments.map(fulfillment => ({
                id: fulfillment.id,
                products: fulfillment.products.map(product => ({
                    id: product.id,
                    product: product.offer.variant.product.title,
                    variant: product.offer.variant.product.options.map((option) => product.offer.variant[`option${option.option}`]).join(' | '),
                    image: product.offer.variant.images[0] ?? product.offer.variant.product.images[0] ?? null,
                    deliveryProfile: product.offer.deliveryProfile,
                    price: product.offer.price,
                    offerId: product.offer.id
                })),
                status: fulfillment.status
            })),
            services: order.services,
            paid: order.invoices.map(invoice => invoice.amount).reduce((a, c) => a + Number(c), 0)
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

                const subtotalProducts = offers.reduce((a, c) => a + Number(c.price), 0)
                const subtotalService = data.services.reduce((a, c) => a + Number(c.price), 0)
                const totalPrice = subtotalProducts + subtotalService > 0 ? subtotalProducts + subtotalService : 0

                return await tx.order.create({
                    data: {
                        ...createOrderQuery,
                        totalPrice: totalPrice,
                        products: {
                            createMany: {
                                data: offers.map(offer => ({
                                    offerId: offer.id,
                                    variantId: offer.variantId
                                }))
                            }
                        }
                    }
                })
            })

            return {
                success: true,
                data: order.id
            }
        } catch (e) {
            console.log(e)

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
                products: {
                    deleteMany: data.deleteOffers ?? [],
                    createMany: {
                        data: offers.map(offer => ({
                            offerId: offer.id,
                            variantId: offer.variantId
                        }))
                    }
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

                await tx.offer.updateMany({
                    where: {
                        order: {
                            id: {
                                in: data.deleteOffers?.map(offer => offer.id) ?? []
                            }
                        }
                    },
                    data: {
                        status: OfferStatus.ACTIVE
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
                        products: {
                            select: {
                                id: true,
                                fulfillmentId: true,
                                offer: {
                                    select: {
                                        id: true,
                                        price: true,
                                    }
                                }
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
                                price: true
                            }
                        },
                        invoices: {
                            select: {
                                id: true,
                                amount: true
                            }
                        }
                    }
                })

                const subtotalProducts = order.products.map(product => product.offer).reduce((a, c) => a + Number(c.price), 0)
                const subtotalService = order.services.reduce((a, c) => a + Number(c.price), 0)
                const totalPrice = subtotalProducts + subtotalService > 0 ? subtotalProducts + subtotalService : 0
                const totalPaid = order.invoices.reduce((a, c) => a + Number(c.amount), 0)

                await tx.order.update({
                    where: {
                        id: orderId
                    },
                    data: {
                        totalPrice: totalPrice,
                        paymentStatus: totalPrice === totalPaid && totalPaid !== 0
                            ? PaymentStatus.PAID
                            : totalPrice < totalPaid
                                ? PaymentStatus.NEED_TO_RETURN
                                : totalPaid !== 0
                                    ? PaymentStatus.PARTIALLY_PAID
                                    : PaymentStatus.UNPAID,
                        orderStatus: order.products.filter(product => product.fulfillmentId === null).length === 0 && order.fulfillments.every(fulfillment => fulfillment.status === FulfillmentStatus.DELIVERED) && order.products.length !== 0
                            ? OrderStatus.FULFILLED
                            : order.fulfillments.some(fulfillment => fulfillment.status === FulfillmentStatus.DELIVERED)
                                ? OrderStatus.PARTIALLY_FULFILLED
                                : order.products.length !== 0
                                    ? OrderStatus.UNFULFILLED
                                    : OrderStatus.CANCELED
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
                products: {
                    select: {
                        id: true,
                        offer: {
                            select: {
                                id: true,
                                price: true,
                                deliveryProfile: {
                                    select: {
                                        id: true,
                                        title: true
                                    }
                                },
                                variant: {
                                    select: {
                                        id: true,
                                        option0: true,
                                        option1: true,
                                        option2: true,
                                        product: {
                                            select: {
                                                title: true,
                                                options: {
                                                    select: {
                                                        title: true,
                                                        option: true,
                                                    },
                                                    orderBy: [{ position: 'asc' }]
                                                },
                                                images: {
                                                    select: {
                                                        id: true,
                                                        alt: true,
                                                        src: true,
                                                        position: true
                                                    },
                                                    orderBy: {
                                                        position: 'asc'
                                                    },
                                                    take: 1
                                                }
                                            }
                                        },
                                        images: {
                                            select: {
                                                id: true,
                                                alt: true,
                                                src: true,
                                                position: true
                                            },
                                            orderBy: {
                                                position: 'asc'
                                            },
                                            take: 1
                                        }
                                    }
                                }
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
            products: fulfillment.products.map(product => ({
                id: product.id,
                product: product.offer.variant.product.title,
                variant: product.offer.variant.product.options.map((option) => product.offer.variant[`option${option.option}`]).join(' | '),
                image: product.offer.variant.images[0] ?? product.offer.variant.product.images[0] ?? null,
                deliveryProfile: product.offer.deliveryProfile,
                price: product.offer.price,
                offerId: product.offer.id
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

    async createFulfillment(orderId: number, data: CreateFulfillmentDto, self: IUser) {
        const order = await this.prisma.order.findUnique({
            where: { id: orderId },
            select: {
                id: true,
                products: {
                    where: {
                        fulfillmentId: null
                    },
                    select: {
                        id: true,
                        offerId: true
                    }
                }
            }
        })

        if (order === null) {
            throw new HttpException("Заказ не найден", HttpStatus.BAD_REQUEST)
        }

        if (data.offers.every(product => order.products.some(offer => offer.offerId === product.id)) === false) {
            throw new HttpException("Часть товаров которые вы ходите отправить не добавлены в заказ либо уже отправлены", HttpStatus.BAD_REQUEST)
        }

        try {
            const fulfillment = await this.prisma.$transaction(async tx => {
                const fulfillment = await tx.fulfillment.create({
                    data: {
                        orderId: order.id,
                        products: {
                            connect: order.products.filter(product => data.offers.some(offer => offer.id === product.offerId)).map(product => ({ id: product.id }))
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
                        products: {
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
                                message: `Отправка товаров №${fulfillment.id}`,
                                userId: self.id,
                            }
                        },
                        orderStatus: updatedOrder.products.filter(product => product.fulfillmentId === null).length === 0 && updatedOrder.fulfillments.every(fulfillment => fulfillment.status === FulfillmentStatus.DELIVERED) && updatedOrder.products.length !== 0
                            ? OrderStatus.FULFILLED
                            : updatedOrder.fulfillments.some(fulfillment => fulfillment.status === FulfillmentStatus.DELIVERED)
                                ? OrderStatus.PARTIALLY_FULFILLED
                                : order.products.length !== 0
                                    ? OrderStatus.UNFULFILLED
                                    : OrderStatus.CANCELED
                    }
                })

                return fulfillment
            })

            return {
                success: true,
                data: fulfillment.id
            }
        } catch (e) {
            console.log(e)

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
                        products: {
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
                        orderStatus: updatedOrder.products.filter(product => product.fulfillmentId === null).length === 0 && updatedOrder.fulfillments.every(fulfillment => fulfillment.status === FulfillmentStatus.DELIVERED) && updatedOrder.products.length !== 0
                            ? OrderStatus.FULFILLED
                            : updatedOrder.fulfillments.some(fulfillment => fulfillment.status === FulfillmentStatus.DELIVERED)
                                ? OrderStatus.PARTIALLY_FULFILLED
                                : updatedOrder.products.length !== 0
                                    ? OrderStatus.UNFULFILLED
                                    : OrderStatus.CANCELED
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


    async removeFulfillment(orderId: number, fulfillmentId: string, self: IUser) {
        const fulfillment = await this.prisma.fulfillment.findFirst({
            where: {
                id: fulfillmentId
            },
            select: {
                id: true,
                orderId: true
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
                        products: {
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
                                message: ``,
                                userId: self.id,
                            }
                        },
                        orderStatus: updatedOrder.products.filter(product => product.fulfillmentId === null).length === 0 && updatedOrder.fulfillments.every(fulfillment => fulfillment.status === FulfillmentStatus.DELIVERED) && updatedOrder.products.length !== 0
                            ? OrderStatus.FULFILLED
                            : updatedOrder.fulfillments.some(fulfillment => fulfillment.status === FulfillmentStatus.DELIVERED)
                                ? OrderStatus.PARTIALLY_FULFILLED
                                : updatedOrder.products.length !== 0
                                    ? OrderStatus.UNFULFILLED
                                    : OrderStatus.CANCELED
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
                        products: {
                            select: {
                                id: true,
                                fulfillmentId: true,
                                offer: {
                                    select: {
                                        id: true,
                                        price: true,
                                    }
                                }
                            }
                        },
                        services: {
                            select: {
                                id: true,
                                price: true
                            }
                        },
                        invoices: {
                            select: {
                                id: true,
                                amount: true
                            }
                        }
                    }
                })

                const totalPrice = Number(order.totalPrice)
                const totalPaid = order.invoices.reduce((a, c) => a + Number(c.amount), 0)
                const priceDifference = totalPrice - totalPaid;

                if (priceDifference === 0) {
                    throw new HttpException("Невозможно закрыть разницу в счете, так как нет разрыва", HttpStatus.BAD_REQUEST)
                }
                
                await tx.invoice.create({
                    data: {
                        orderId: orderId,
                        status: InvoiceStatus.SUCCEEDED,
                        amount: priceDifference,
                        method: priceDifference > 0 ? "Наличные" : "Возврат"
                    }
                })

                await tx.order.update({
                    where: {
                        id: orderId
                    },
                    data: {
                        paymentStatus: PaymentStatus.PAID,
                        timeline: {
                            create: {
                                title: priceDifference > 0 ? `Заказ оплачен` : `Возврат разрыва`,
                                message: priceDifference > 0 ? `Заказ отмечен как оплаченный наличными: ${ Math.abs(priceDifference) } руб.` : `Разница была возвращена клиенту: ${ Math.abs(priceDifference) } руб.`,
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
            console.log(e)

            throw new HttpException("Произошла ошибка на стороне сервера", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}