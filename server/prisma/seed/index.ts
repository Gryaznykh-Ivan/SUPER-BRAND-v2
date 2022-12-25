import { readFileSync } from 'fs'
import { resolve } from 'path'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


const seed = async () => {
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

seed()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })