export default defineEventHandler(async (event) => {
    const { page, sortBy, direction, ...query } = getQuery(event)
    
    const search = (query?.search as string ?? '').trim().replace(/[^0-9a-z\-\ ]/gi, '')

    const runtimeConfig = useRuntimeConfig()

    const orderByOptions = {
        'price': {
            price: direction
        },
        'review-count': {
            reviews: {
                _count: direction
            }
        }
    }[sortBy as string]

    const paginationOptions = sortBy === 'rating' ? {} : {
        take: runtimeConfig.public.perPage,
        skip: runtimeConfig.public.perPage * ((page as number ?? 1) - 1)
    }
    
    let items = await prisma.item.findMany({
        orderBy: orderByOptions as any,
        include: {
            reviews: true
        },
        where: {
            OR: [
                {
                    name: {
                        search: search.split(' ').join(' & '),
                        mode: 'insensitive'
                    }
                },
                {
                    name: {
                        contains: search,
                        mode: 'insensitive'
                    }
                }
            ]
        },
        ...paginationOptions as any
    })

    const count = await prisma.item.count({
        where: {
            OR: [
                {
                    name: {
                        search: search.split(' ').join(' & '),
                        mode: 'insensitive'
                    }
                },
                {
                    name: {
                        contains: search,
                        mode: 'insensitive'
                    }
                }
            ]
        }
    })

    items?.forEach((item: any, index: any) => {
        items[index] = { ...item, rating: getItemRating(item) }
    })

    if (sortBy === 'rating') {
        items?.sort((a: any, b: any) => direction === 'asc' ? a.rating - b.rating : b.rating - a.rating)
        items = items.slice(runtimeConfig.public.perPage * ((page as number ?? 1) - 1), runtimeConfig.public.perPage * ((page as number ?? 1)))
    }

    return {
        items: items,
        count: count
    }
})
