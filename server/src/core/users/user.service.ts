import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddAddressDto } from './dto/addAddress.dto';
import { AddPermissionDto } from './dto/addPermission.dto';
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


    async createUser(data: CreateUserDto) {
        const createUserQuery = {
            firstName: data.firstName,
            lastName: data.lastName,
            fullName: `${data.firstName} ${data.lastName}`,
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

        if (data.addresses !== undefined) {
            Object.assign(createUserQuery, {
                addresses: {
                    createMany: {
                        data: data.addresses
                    }
                }
            })
        }

        if (data.permissions !== undefined) {
            Object.assign(createUserQuery, {
                permissions: {
                    createMany: {
                        data: data.permissions?.map(permission => ({ right: permission }))
                    }
                }
            })
        }

        try {
            await this.prisma.user.create({ data: createUserQuery })

            return {
                success: true
            }
        } catch (e) {
            throw new HttpException("Произошла ошибка на стороне сервера", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async updateUser(data: UpdateUserDto) {
        try {
            await this.prisma.user.update({
                where: { id: data.id },
                data: {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    fullName: `${data.firstName} ${data.lastName}`,
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
            })

            return {
                success: true
            }
        } catch (e) {
            throw new HttpException("Произошла ошибка на стороне сервера", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async addAddress(userId: string, data: AddAddressDto) {
        try {
            await this.prisma.user.update({
                where: { id: userId },
                data: {
                    addresses: {
                        create: {
                            address: data.address,
                            city: data.city,
                            country: data.country,
                            region: data.region
                        }
                    }
                }
            })

            return {
                success: true
            }
        } catch (e) {
            throw new HttpException("Произошла ошибка на стороне сервера", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async removeAddress(userId: string, addressId: string) {
        try {
            await this.prisma.address.delete({
                where: { id: addressId },
            })

            return {
                success: true
            }
        } catch (e) {
            throw new HttpException("Произошла ошибка на стороне сервера", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async addPermission(userId: string, data: AddPermissionDto) {
        try {
            await this.prisma.user.update({
                where: { id: userId },
                data: {
                    permissions: {
                        create: {
                            right: data.right
                        }
                    }
                }
            })

            return {
                success: true
            }
        } catch (e) {
            throw new HttpException("Произошла ошибка на стороне сервера", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async removePermission(userId: string, permissionId: string) {
        try {
            await this.prisma.permission.delete({
                where: { id: permissionId },
            })

            return {
                success: true
            }
        } catch (e) {
            throw new HttpException("Произошла ошибка на стороне сервера", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async deleteUser(id: string) {
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