import { readFileSync } from 'fs'
import { resolve } from 'path'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const seed = async () => {
    console.log("1) Managers data filling")
    await managers()

    console.log("2) Countries data filling")
    await countries()
}

const managers = async () => {
    await prisma.user.create({
        data: {
            email: "gryaznykh.ivan@gmail.com",
            role: "ADMIN",
            firstName: "Иван",
            lastName: "Грязных",
            fullName: "Иван Грязных",
            permissions: {
                createMany: {
                    data: [
                        { right: "ORDER_CREATE" },
                        { right: "ORDER_READ" },
                        { right: "ORDER_UPDATE" },
                        { right: "ORDER_DELETE" },
                        { right: "PRODUCT_CREATE" },
                        { right: "PRODUCT_READ" },
                        { right: "PRODUCT_UPDATE" },
                        { right: "PRODUCT_DELETE" },
                        { right: "COLLECTION_CREATE" },
                        { right: "COLLECTION_READ" },
                        { right: "COLLECTION_UPDATE" },
                        { right: "COLLECTION_DELETE" },
                        { right: "OFFER_CREATE" },
                        { right: "OFFER_READ" },
                        { right: "OFFER_UPDATE" },
                        { right: "OFFER_DELETE" },
                        { right: "USER_CREATE" },
                        { right: "USER_READ" },
                        { right: "USER_UPDATE" },
                        { right: "USER_DELETE" },
                        { right: "SHIPPING_CREATE" },
                        { right: "SHIPPING_READ" },
                        { right: "SHIPPING_UPDATE" },
                        { right: "SHIPPING_DELETE" },
                        { right: "MEDIA_UPLOAD" },
                        { right: "MEDIA_DELETE" },
                    ]
                }
            }
        }
    })
}

const countries = async () => {
    const data = JSON.parse(readFileSync(resolve(__dirname, "russia.json"), "utf-8"))

    const { id: russiaId } = await prisma.country.create({
        data: {
            title: "Россия"
        }
    })

    for (const region of Object.keys(data)) {
        await prisma.region.create({
            data: {
                title: region,
                countryId: russiaId,
                cities: {
                    createMany: {
                        data: data[region].map(city => ({ title: city }))
                    }
                }
            }
        })
    }
}

seed().then(async () => {
    await prisma.$disconnect()
}).catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
})