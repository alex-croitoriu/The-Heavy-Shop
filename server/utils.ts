import { PrismaClient, Review } from '@prisma/client'
const prisma = new PrismaClient()
export default prisma

async function getUserByEmail(email: string | null | undefined) {
    try {
        return await prisma.user.findUniqueOrThrow({
            where: {
                email: email as string
            }
        })
    }
    catch(e) { 
        throw createError({
            statusCode: 400,
            statusMessage: 'We couldn\'t find that account.'
        })
    }
}

function getItemRating(reviews: Array<Review>) {
    return reviews.map(r => r.rating).reduce((x, y) => x + y) / reviews.length
}

export { getUserByEmail, getItemRating }