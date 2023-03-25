import { PrismaClient } from '@prisma-parser'

const prisma = new PrismaClient()

const seed = async () => {
    await prisma.settings.upsert({
        where: {
            id: "super-brand-parser"
        },
        create: {
            id: "super-brand-parser",
            proxy: ""
        },
        update: {}
    })

    await prisma.bot.upsert({
        where: {
            id: "super-brand-parser"
        },
        create: {
            id: "super-brand-parser"
        },
        update: {}
    })
}

seed().then(async () => {
    await prisma.$disconnect()
}).catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
})