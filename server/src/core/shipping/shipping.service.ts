import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { OfferStatus, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProfileDto } from './dto/createProfile.dto';
import { CreateDeliveryZoneDto, UpdateDeliveryZoneDto } from './dto/delivery.dto';
import { SearchZoneDto } from './dto/searchZone.dto';
import { UpdateProfileDto } from './dto/updateProfile.dto';

@Injectable()
export class ShippingService {
    constructor(
        private prisma: PrismaService,
    ) { }

    async getAllProfile() {
        const profiles = await this.prisma.deliveryProfile.findMany({
            select: {
                id: true,
                title: true,
                _count: {
                    select: {
                        offers: true,
                        zones: true
                    }
                }
            },
            orderBy: [{
                createdAt: 'asc'
            }]
        })

        const result = profiles.map(profile => ({
            id: profile.id,
            title: profile.title,
            offersCount: profile._count.offers,
            zonesCount: profile._count.zones,
        }))

        return {
            success: true,
            data: result
        }
    }

    async getDeliveryZones(profileId: string, data: SearchZoneDto) {
        const fulltextSearch = data.q ? data.q.replace(/[+\-<>()~*\"@]+/g, " ").replace(/\s+/g, " ").trim().split(" ").filter(word => word.length > 3).map(word => `+${word}*`).join(" ") : undefined
        const zones = await this.prisma.deliveryZone.findMany({
            where: {
                deliveryProfileId: profileId,
                country: {
                    search: fulltextSearch ? fulltextSearch : undefined,
                },
                region: {
                    search: fulltextSearch ? fulltextSearch : undefined,
                },
            },
            select: {
                id: true,
                country: true,
                region: true,
                options: {
                    select: {
                        id: true,
                        title: true,
                        duration: true,
                        price: true,
                    }
                }
            },
            skip: data.skip,
            take: data.limit,
            orderBy: [{
                createdAt: 'desc'
            }]
        })

        return {
            success: true,
            data: zones
        }
    }

    async getProfileById(profileId: string) {
        const profile = await this.prisma.deliveryProfile.findUnique({
            where: { id: profileId },
            select: {
                id: true,
                title: true,
                location: true
            }
        })

        return {
            success: true,
            data: profile
        }
    }

    async createProfile(data: CreateProfileDto) {
        try {
            const profile = await this.prisma.deliveryProfile.create({
                data: {
                    title: data.title,
                    location: data.location
                }
            })

            return {
                success: true,
                data: profile.id
            }
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code === 'P2002') {
                    throw new HttpException("Профиль с таким title уже существует", HttpStatus.BAD_REQUEST)
                }
            }

            throw new HttpException("Произошла ошибка на стороне сервера", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async createDeliveryZone(profileId: string, data: CreateDeliveryZoneDto) {
        try {
            await this.prisma.deliveryProfile.update({
                where: { id: profileId },
                data: {
                    zones: {
                        create: {
                            country: data.country,
                            region: data.region,
                        }
                    }
                }
            })

            return {
                success: true
            }
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code === 'P2002') {
                    throw new HttpException("Такая зона доставки уже есть в этом профиле", HttpStatus.BAD_REQUEST)
                }
            }

            throw new HttpException("Произошла ошибка на стороне сервера", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async updateDeliveryZone(profileId: string, zoneId: string, data: UpdateDeliveryZoneDto) {
        const updateDeliveryZoneQuery = {}

        if (data.createDeliveryOptions !== undefined || data.deleteDeliveryOptions !== undefined) {
            Object.assign(updateDeliveryZoneQuery, {
                options: {
                    deleteMany: data.deleteDeliveryOptions?.map(id => ({ id })) ?? [],
                    createMany: {
                        data: data.createDeliveryOptions ?? [],
                    }
                }
            })
        }

        try {
            await this.prisma.$transaction(async tx => {
                await tx.deliveryZone.update({
                    where: { id: zoneId },
                    data: updateDeliveryZoneQuery
                })

                if (data.updateDeliveryOptions !== undefined) {
                    for (const option of data.updateDeliveryOptions) {
                        await tx.deliveryOption.update({
                            where: { id: option.id },
                            data: {
                                title: option.title,
                                duration: option.duration,
                                price: option.price,
                            }
                        })
                    }
                }
            })

            return {
                success: true
            }
        } catch (e) {

            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code === 'P2002') {
                    throw new HttpException("Профиль с таким title уже существует", HttpStatus.BAD_REQUEST)
                }
            }

            throw new HttpException("Произошла ошибка на стороне сервера", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }


    async updateProfile(profileId: string, data: UpdateProfileDto) {
        const updateDeliveryProfileQuery = {
            title: data.title,
            location: data.location,
        }

        if (data.connectOffers !== undefined) {
            Object.assign(updateDeliveryProfileQuery, {
                offers: {
                    connect: data.connectOffers ?? [],
                }
            })
        }

        try {
            await this.prisma.$transaction(async tx => {
                await tx.deliveryProfile.update({
                    where: {
                        id: profileId
                    },
                    data: updateDeliveryProfileQuery
                })

                await tx.deliveryProfile.update({
                    where: {
                        id: "default"
                    },
                    data: {
                        offers: {
                            connect: data.disconnectOffers ?? []
                        }
                    }
                })
            })

            return {
                success: true
            }
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code === 'P2002') {
                    throw new HttpException("Профиль с таким title уже существует", HttpStatus.BAD_REQUEST)
                }
            }

            throw new HttpException("Произошла ошибка на стороне сервера", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async removeDeliveryZone(zoneId: string) {
        try {
            await this.prisma.deliveryZone.delete({
                where: { id: zoneId }
            })

            return {
                success: true
            }
        } catch (e) {
            throw new HttpException("Произошла ошибка на стороне сервера", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async removeProfile(profileId: string) {
        if (profileId === "default") {
            throw new HttpException(`Удалить дефолтный профиль невозможно`, HttpStatus.BAD_REQUEST)
        }

        try {
            await this.prisma.$transaction(async tx => {
                await tx.deliveryProfile.delete({
                    where: {
                        id: profileId,
                    }
                })

                await tx.offer.updateMany({
                    where: {
                        deliveryProfileId: null
                    },
                    data: {
                        deliveryProfileId: "default"
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
}