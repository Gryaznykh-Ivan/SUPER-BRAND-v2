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
        const vendors = await this.prisma.product.findMany({
            distinct: ["vendor"],
            where: {
                vendor: {
                    search: q ? `${q}*` : undefined,
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

    async deliveryZones(data: SearchDto) {
        const regions = await this.prisma.region.findMany({
            where: {
                title: {
                    search: data.q ? `${data.q}*` : undefined,
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
        const collections = await this.prisma.collection.findMany({
            where: {
                title: {
                    search: q ? `${q}*` : undefined,
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
        const countries = await this.prisma.country.findMany({
            where: {
                title: {
                    search: q ? `${q}*` : undefined,
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
        const regions = await this.prisma.region.findMany({
            where: {
                country: {
                    title: country
                },
                title: {
                    search: q ? `${q}*` : undefined,
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
        const cities = await this.prisma.city.findMany({
            where: {
                region: {
                    title: region
                },
                title: {
                    search: q ? `${q}*` : undefined,
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