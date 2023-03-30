import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SearchDto } from './dto/search.dto';

@Injectable()
export class SuggestionService {

    constructor(
        private readonly prisma: PrismaService,
    ) { }

    async deliveryProfiles() {
        const deliveryProfiles = await this.prisma.deliveryProfile.findMany({
            where: {},
            select: {
                id: true,
                title: true,
            },
            orderBy: {
                createdAt: 'asc'
            }
        })

        return {
            success: true,
            data: deliveryProfiles.map(profile => ({ id: profile.id, title: profile.title }))
        }
    }

    async vendors(q: string) {
        const fulltextSearch = q ? q.replace(/[+\-<>()~*\"@]+/g, " ").replace(/\s+/g, " ").trim().split(" ").filter(word => word.length > 2).map(word => `+${word}*`).join(" ") : undefined
        const vendors = await this.prisma.product.findMany({
            distinct: ["vendor"],
            where: {
                vendor: {
                    search: fulltextSearch ? fulltextSearch : undefined,
                    not: null
                },
            },
            select: {
                vendor: true
            },
            take: 5
        })

        return {
            success: true,
            data: vendors.map(({ vendor }) => vendor).filter(c => c !== null)
        }
    }

    async productTypes(q: string) {
        const fulltextSearch = q ? q.replace(/[+\-<>()~*\"@]+/g, " ").replace(/\s+/g, " ").trim().split(" ").filter(word => word.length > 2).map(word => `+${word}*`).join(" ") : undefined
        const vendors = await this.prisma.product.findMany({
            distinct: ["type"],
            where: {
                type: {
                    search: fulltextSearch ? fulltextSearch : undefined,
                    not: null
                },
            },
            select: {
                type: true
            },
            take: 5
        })

        return {
            success: true,
            data: vendors.map(({ type }) => type).filter(c => c !== null)
        }
    }

    async deliveryZones(profileId: string, data: SearchDto) {
        const fulltextSearch = data.q ? data.q.replace(/[+\-<>()~*\"@]+/g, " ").replace(/\s+/g, " ").trim().split(" ").filter(word => word.length > 2).map(word => `+${word}*`).join(" ") : undefined

        const profile = await this.prisma.deliveryProfile.findUnique({
            where: {
                id: profileId
            },
            select: {
                zones: {
                    select: {
                        region: true
                    }
                }
            }
        })

        if (profile === null) {
            throw new HttpException("Профиль доставки не найден", HttpStatus.BAD_REQUEST)
        }

        const regions = await this.prisma.region.findMany({
            where: {
                title: {
                    search: fulltextSearch ? fulltextSearch : undefined,
                    notIn: profile.zones.map(zone => zone.region)
                }
            },
            select: {
                title: true,
                country: {
                    select: {
                        title: true
                    }
                }
            },
            take: data.limit,
            skip: data.skip
        })

        return {
            success: true,
            data: regions.map(region => ({ country: region.country.title, region: region.title }))
        }
    }

    async deliveryOptions(deliveryProfileId: string, region: string) {
        const zone = await this.prisma.deliveryZone.findFirst({
            where: {
                region: region,
                deliveryProfileId: deliveryProfileId
            },
            select: {
                options: {
                    select: {
                        id: true,
                        title: true,
                        duration: true,
                        price: true
                    }
                }
            }
        })

        if (zone === null) {
            throw new HttpException("Доставка в указанную зону недоступна", HttpStatus.BAD_REQUEST)
        }

        return {
            success: true,
            data: zone.options
        }
    }



    async collections(q: string, ids: string[]) {
        const fulltextSearch = q ? q.replace(/[+\-<>()~*\"@]+/g, " ").replace(/\s+/g, " ").trim().split(" ").filter(word => word.length > 2).map(word => `+${word}*`).join(" ") : undefined
        const collections = await this.prisma.collection.findMany({
            where: {
                title: {
                    search: fulltextSearch ? fulltextSearch : undefined,
                },
                id: {
                    notIn: ids
                }
            },
            select: {
                id: true,
                title: true
            },
            take: 5
        })

        return {
            success: true,
            data: collections
        }
    }

    async countries(q: string) {
        const fulltextSearch = q ? q.replace(/[+\-<>()~*\"@]+/g, " ").replace(/\s+/g, " ").trim().split(" ").filter(word => word.length > 2).map(word => `+${word}*`).join(" ") : undefined
        const countries = await this.prisma.country.findMany({
            where: {
                title: {
                    search: fulltextSearch ? fulltextSearch : undefined,
                }
            },
            take: 5
        })

        return {
            success: true,
            data: countries.map(country => country.title)
        }
    }

    async regions(q: string, country?: string) {
        const fulltextSearch = q ? q.replace(/[+\-<>()~*\"@]+/g, " ").replace(/\s+/g, " ").trim().split(" ").filter(word => word.length > 2).map(word => `+${word}*`).join(" ") : undefined
        const regions = await this.prisma.region.findMany({
            where: {
                country: {
                    title: country
                },
                title: {
                    search: fulltextSearch ? fulltextSearch : undefined,
                }
            },
            take: 5
        })
        
        return {
            success: true,
            data: regions.map(region => region.title)
        }
    }

    async cities(q: string, region?: string) {
        const fulltextSearch = q ? q.replace(/[+\-<>()~*\"@]+/g, " ").replace(/\s+/g, " ").trim().split(" ").filter(word => word.length > 2).map(word => `+${word}*`).join(" ") : undefined
        const cities = await this.prisma.city.findMany({
            where: {
                region: {
                    title: region
                },
                title: {
                    search: fulltextSearch ? fulltextSearch : undefined,
                }
            },
            take: 5
        })

        return {
            success: true,
            data: cities.map(city => city.title)
        }
    }
}