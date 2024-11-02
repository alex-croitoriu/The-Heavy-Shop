export default async function getUserByEmail(email: string | null | undefined) {
    try {
        const { createdAt, ...user } = await prisma.user.findUniqueOrThrow({
            where: {
                email: email as string
            },
            select: {
                id: true,
                name: true,
                email: true,
                photoUrl: true,
                createdAt: true
            }
        })
        return { ...user, registeredOn: dateFormatter(createdAt) }
    }
    catch(e) { 
        if (email)
            throw createError({
                statusCode: 500,
                statusMessage: 'We couldn\'t find that account.'
            })
    }
}
