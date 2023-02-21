import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InvoiceStatus, OfferStatus, OrderStatus, PaymentStatus, Prisma } from '@prisma/client';
import { IUser } from 'src/interfaces/user.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderDto } from './dto/createOrder.dto';
import { SearchOrderDto } from './dto/searchOrder.dto';
import { UpdateOrderDto } from './dto/updateOrder.dto';

@Injectable()
export class OrderService {
    constructor(
        private prisma: PrismaService
    ) { }

    async getOrdersBySearch(data: SearchOrderDto) {
        const whereQuery = {
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
            },
            id: isNaN(Number(data.q)) === false ? Number(data.q) : undefined,
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
            customer: order.user.fullName,
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
                subtotalPrice: true,
                paymentStatus: true,
                orderStatus: true,
                products: {
                    where: {
                        fulfillmentId: null
                    },
                    select: {
                        id: true,
                        price: true,
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
                                price: true,
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
            totalPrice: order.totalPrice,
            subtotalPrice: order.subtotalPrice,
            paymentStatus: order.paymentStatus,
            orderStatus: order.orderStatus,
            products: order.products.map(product => ({
                id: product.id,
                product: product.offer.variant.product.title,
                variant: product.offer.variant.product.options.map((option) => product.offer.variant[`option${option.option}`]).join(' | '),
                image: product.offer.variant.images[0] ?? product.offer.variant.product.images[0] ?? null,
                deliveryProfile: product.offer.deliveryProfile,
                price: product.price
            })),
            fulfillments: order.fulfillments.map(fulfillment => ({
                id: fulfillment.id,
                products: fulfillment.products.map(product => ({
                    id: product.id,
                    product: product.offer.variant.product.title,
                    variant: product.offer.variant.product.options.map((option) => product.offer.variant[`option${option.option}`]).join(' | '),
                    image: product.offer.variant.images[0] ?? product.offer.variant.product.images[0] ?? null,
                    deliveryProfile: product.offer.deliveryProfile,
                    price: product.price
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

                return await tx.order.create({
                    data: {
                        ...createOrderQuery,
                        subtotalPrice: subtotalProducts,
                        totalPrice: subtotalProducts + subtotalService,
                        products: {
                            createMany: {
                                data: offers.map(offer => ({
                                    offerId: offer.id,
                                    price: offer.price,
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
                        in: data.createOffers.map(offer => offer.id)
                    },
                    status: OfferStatus.ACTIVE
                },
                select: {
                    id: true,
                    price: true,
                    variantId: true,
                }
            })

            if (offers.length !== data.createOffers.length) {
                throw new HttpException("Часть товаров не доступна к покупке", HttpStatus.BAD_REQUEST)
            }

            Object.assign(updateOrderQuery, {
                products: {
                    deleteMany: data.deleteOffers ?? [],
                    createMany: {
                        data: offers.map(offer => ({
                            offerId: offer.id,
                            price: offer.price,
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
                            in: data.createOffers.map(offer => offer.id)
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
                                in: data.deleteOffers.map(offer => offer.id)
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
                                price: true,
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

                const subtotalProducts = order.products.reduce((a, c) => a + Number(c.price), 0)
                const subtotalService = order.services.reduce((a, c) => a + Number(c.price), 0)
                const totalPaid = order.invoices.reduce((a, c) => a + Number(c.amount), 0)

                await tx.order.update({
                    where: {
                        id: orderId
                    },
                    data: {
                        subtotalPrice: subtotalProducts,
                        totalPrice: subtotalProducts + subtotalService,
                        paymentStatus: subtotalProducts + subtotalService === totalPaid
                            ? PaymentStatus.PAID
                            : subtotalProducts + subtotalService > totalPaid
                                ? PaymentStatus.PARTIALLY_PAID
                                : PaymentStatus.NEED_TO_RETURN
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