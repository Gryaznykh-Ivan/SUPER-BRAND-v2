import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProfileDto } from './dto/createProfile.dto';
import { CreateDeliveryOptionDto, CreateDeliveryZoneDto, UpdateDeliveryOptionDto, UpdateDeliveryZoneDto } from './dto/delivery.dto';
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
                handle: true,
                _count: {
                    select: {
                        offers: true,
                        zones: true
                    }
                }
            },
            orderBy: [{
                createdAt: 'desc'
            }]
        })

        const result = profiles.map(profile => ({
            id: true,
            title: true,
            handle: true,
            offersCount: profile._count.offers,
            zonesCount: profile._count.zones,
        }))

        return {
            success: true,
            data: result
        }
    }

    async getProfileById(profileId: string) {
        throw new Error('Method not implemented.');
    }

    async createProfile(data: CreateProfileDto) {
        try {
            const profile = await this.prisma.deliveryProfile.create({
                data: {
                    title: data.title
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
                    deleteMany: data.deleteDeliveryOptions ?? [],
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
            title: data.title
        }

        if (data.connectOffers !== undefined || data.disconnectOffers !== undefined) {
            Object.assign(updateDeliveryProfileQuery, {
                offers: {
                    disconnect: data.disconnectOffers ?? [],
                    connect: data.connectOffers ?? [],
                }
            })
        }

        try {
            await this.prisma.deliveryProfile.update({
                where: {
                    id: profileId
                },
                data: updateDeliveryProfileQuery
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
        try {
            await this.prisma.deliveryProfile.delete({
                where: { id: profileId }
            })

            return {
                success: true
            }
        } catch (e) {
            throw new HttpException("Произошла ошибка на стороне сервера", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}