import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
import { IUser } from 'src/interfaces/user.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UserService {
    constructor(
        private readonly prisma: PrismaService
    ) { }

    async getUserById(userId: string) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            include: {
                addresses: {
                    select: {
                        id: true,
                        country: true,
                        region: true,
                        city: true,
                        address: true
                    }
                },
                permissions: {
                    select: {
                        id: true,
                        right: true
                    }
                }
            }
        })

        if (user === null) {
            throw new HttpException("Пользователь не найден", HttpStatus.BAD_REQUEST)
        }

        return {
            success: true,
            data: user
        }
    }

    async getUsersBySearch(q: string, limit: number, skip: number) {
        const users = await this.prisma.user.findMany({
            where: {
                phone: {
                    search: q ? `${q}*` : undefined,
                },
                fullName: {
                    search: q ? `${q}*` : undefined,
                },
                email: {
                    search: q ? `${q}*` : undefined,
                }
            },
            select: {
                id: true,
                fullName: true,
                phone: true,
                email: true,
                comment: true,
                createdAt: true,
                addresses: {
                    select: {
                        city: true
                    },
                    take: 1,
                },
                _count: {
                    select: {
                        offers: true,
                        orders: true,
                    }
                }
            },
            skip: skip,
            take: limit,
            orderBy: [{
                createdAt: 'desc'
            }]
        })

        const result = users.map(user => ({
            id: user.id,
            fullName: user.fullName,
            phone: user.phone,
            email: user.email,
            comment: user.comment,
            location: user.addresses[0]?.city || null,
            offersCount: user._count.offers,
            ordersCount: user._count.orders,
            createdAt: user.createdAt,
        }))

        return {
            success: true,
            data: result
        }
    }


    async createUser(data: CreateUserDto, self: IUser) {
        if (self.role === Role.MANAGER && (data.role === Role.ADMIN || data.role === Role.MANAGER)) {
            throw new HttpException("Вы не можете создавать менеджеров/администраторов", HttpStatus.FORBIDDEN)
        }

        const createUserQuery = {
            firstName: data.firstName,
            lastName: data.lastName,
            fullName: `${data.firstName ?? ""} ${data.lastName ?? ""}`,
            account: data.account,
            bic: data.bic,
            comment: data.comment,
            correspondentAccount: data.correspondentAccount,
            email: data.email,
            inn: data.inn,
            isSubscribed: data.isSubscribed,
            isVerified: data.isVerified,
            passport: data.passport,
            phone: data.phone,
            role: data.role,
        }

        if (data.createAddresses !== undefined) {
            Object.assign(createUserQuery, {
                addresses: {
                    createMany: {
                        data: data.createAddresses
                    }
                }
            })
        }

        if (data.createPermissions !== undefined) {
            if (self.role !== Role.ADMIN) {
                throw new HttpException("Вы не можете выдавать права", HttpStatus.FORBIDDEN)
            }

            Object.assign(createUserQuery, {
                permissions: {
                    createMany: {
                        data: data.createPermissions?.map(permission => ({ right: permission }))
                    }
                }
            })
        }

        try {
            const user = await this.prisma.user.create({ data: createUserQuery })

            return {
                success: true,
                data: user.id
            }
        } catch (e) {
            throw new HttpException("Произошла ошибка на стороне сервера", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async updateUser(userId: string, data: UpdateUserDto, self: IUser) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: {
                firstName: true,
                lastName: true,
                role: true,
                permissions: {
                    select: {
                        id: true,
                        right: true
                    }
                }
            }
        })

        if (user === null) {
            throw new HttpException("Пользователя не существует", HttpStatus.BAD_REQUEST)
        }

        if (self.role === Role.MANAGER && (user.role === Role.ADMIN || user.role === Role.MANAGER)) {
            throw new HttpException("Вы не можете редактировать менеджеров/администраторов", HttpStatus.FORBIDDEN)
        }

        if (self.role === Role.MANAGER && data.role === Role.ADMIN) {
            throw new HttpException("Вы не можете выдать роль администратора", HttpStatus.FORBIDDEN)
        }

        const updateUserQuery = {
            firstName: data.firstName,
            lastName: data.lastName,
            account: data.account,
            bic: data.bic,
            comment: data.comment,
            correspondentAccount: data.correspondentAccount,
            email: data.email,
            inn: data.inn,
            isSubscribed: data.isSubscribed,
            isVerified: data.isVerified,
            passport: data.passport,
            phone: data.phone,
            role: data.role,
        }

        if (data.firstName || data.lastName) {
            Object.assign(updateUserQuery, {
                fullName: `${data.firstName ?? user.firstName ?? ""} ${data.lastName ?? user.lastName ?? ""}`
            })
        }

        if (data.createPermissions || data.deletePermissions) {
            if (self.role !== Role.ADMIN) {
                throw new HttpException("Вы не можете выдавать права", HttpStatus.FORBIDDEN)
            }

            Object.assign(updateUserQuery, {
                permissions: {
                    deleteMany: data.deletePermissions?.map(id => ({ id })) ?? [],
                    createMany: {
                        data: data.createPermissions?.map(right => ({ right })) ?? []
                    }
                }
            })
        }

        if (data.createAddresses || data.deleteAddresses) {
            Object.assign(updateUserQuery, {
                addresses: {
                    deleteMany: data.deleteAddresses?.map(id => ({ id })) ?? [],
                    createMany: {
                        data: data.createAddresses?.map(address => ({
                            country: address.country,
                            region: address.region,
                            city: address.city,
                            address: address.address,
                        })) ?? []
                    }
                }
            })
        }

        if (data.updateAddresses) {
            for (const { id, country, region, city, address } of data.updateAddresses) {
                await this.prisma.address.update({
                    where: { id },
                    data: {
                        country,
                        region,
                        city,
                        address
                    }
                })
            }
        }

        try {
            await this.prisma.user.update({
                where: { id: userId },
                data: updateUserQuery
            })

            return {
                success: true
            }
        } catch (e) {

            console.log(e)
            throw new HttpException("Произошла ошибка на стороне сервера", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async deleteUser(id: string, self: IUser) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            select: {
                firstName: true,
                lastName: true,
                role: true,
                permissions: {
                    select: {
                        id: true,
                        right: true
                    }
                }
            }
        })

        if (user === null) {
            throw new HttpException("Пользователя не существует", HttpStatus.BAD_REQUEST)
        }

        if (self.role === Role.MANAGER && (user.role === Role.ADMIN || user.role === Role.MANAGER)) {
            throw new HttpException("Вы не можете удалять менеджеров/администраторов", HttpStatus.FORBIDDEN)
        }

        try {
            await this.prisma.user.delete({
                where: { id }
            })

            return {
                success: true
            }
        } catch (e) {
            throw new HttpException("Произошла ошибка на стороне сервера", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}