import { useToast } from 'vue-toastification'

const toast = useToast()

export default function useCart() {
    const loggedIn = useStatus()
    const bus = useEventBus('count')
    
    async function getIds() {
        if (loggedIn) {
            const { data } = await useFetch('/api/user/cart')
            return (data.value as any).map((entry: any) => { 
                return { 
                    id: entry.item.id, 
                    size: entry.size,
                    quantity: entry.quantity
                }
            })
        }
        else if (import.meta.client) {
            return JSON.parse(localStorage.getItem('cart') ?? '[]')
        }
    }

    async function getCount() {
        const ids = await getIds()
        return ids?.map((id: any) => id.quantity).reduce((x: any, y: any) => x + y, 0)
    }
    
    async function getItems() {
        if (loggedIn) {
            const headers = useRequestHeaders(['cookie'])
            const { data } = await useFetch('/api/user/cart', {
                query: useQuery(),
                headers
            })
            return data.value?.map((entry: any) => {
                return {
                    ...entry.item,
                    size: entry.size,
                    quantity: entry.quantity
                }
            })
        }
        else if (import.meta.client) {
            const ids = await getIds()
            const { data } = await useFetch('/api/guest/cart', {
                query: { 
                    ids: ids,
                    ...useQuery()
                }
            })
            return data.value?.map((entry: any) => {
                return {
                    ...entry.item,
                    size: entry.size,
                    quantity: entry.quantity
                }
            })
        }
    }

    async function addItem(id: string, size: string, shouldHaveSize: boolean) {
        if (!size && !shouldHaveSize)
            size = 'universal'
        const ids = await getIds()
        const item = ids.find((item: any) => item.id === id && item.size === size)
        if (item && item?.quantity >= 10)
            throw createError({
                statusCode: 400,
                statusMessage: 'Items are limited to 10 per order.'
            })
        if (!size && shouldHaveSize) {
            throw createError({
                statusCode: 400,
                statusMessage: 'You must select a size first.'
            })
        }
        if (loggedIn) {
            await useFetch('/api/user/cart', {
                method: 'POST',
                query: {
                    entries: [
                        { id: id, size: size } 
                    ] 
                }
            })
        }
        else if (import.meta.client) {
            const ids = await getIds()
            const index = ids.findIndex((item: any) => item.id === id && item.size === size)
            if (index !== -1) 
                ids[index].quantity += 1
            else {
                ids.push({
                    id: id,
                    size: size,
                    quantity: 1
                })
            }
            localStorage.setItem('cart', JSON.stringify(Array.from(ids)))
        }
        bus.emit('cart')
        toast.success("Item added to cart!")
    }

    async function removeItem(id: string, size: string) {
        if (loggedIn) {
            await useFetch('/api/user/cart', {
                method: 'DELETE',
                query: {
                    id: id,
                    size: size
                }
            })
        }
        else if (import.meta.client) {
            const ids = await getIds()
            const index = ids.findIndex((item: any) => item.id === id && item.size === size)
            if (index !== -1) {
                ids.splice(index, 1)
                localStorage.setItem('cart', JSON.stringify(Array.from(ids)))
            }
        }
        bus.emit('cart')
        toast.success("Item removed from cart!")
    }
    
    async function updateItem(id: string, size: string, quantity: number, type: string) {
        if (quantity <= 1 && type === 'decrement')
            await removeItem(id, size)
        else if (quantity >= 10 && type === 'increment')
            throw createError({
                statusCode: 400,
                statusMessage: 'Items are limited to 10 per order.'
            })
        else {
            if (loggedIn) {
                await useFetch('/api/user/cart', {
                    method: 'PUT',
                    query: {
                        id: id,
                        size: size,
                        type: type
                    }
                })
            }
            else if (import.meta.client) {
                const ids = await getIds()
                const index = ids.findIndex((item: any) => item.id === id && item.size === size)
                if (type === 'increment')
                    ids[index].quantity += 1
                else if (type === 'decrement')
                    ids[index].quantity -= 1
                localStorage.setItem('cart', JSON.stringify(Array.from(ids)))
            }
            bus.emit('cart')
            toast.success("Item quantity updated!")
        }
    }

    async function syncItems() {
        let entries = localStorage.getItem('cart')
        if (JSON.parse(entries as string)?.length) {
            await useFetch('/api/user/cart', {
                method: 'POST',
                query: {
                    entries: entries
                }
            })
            localStorage.removeItem('cart')
            bus.emit('cart')
            return true
        }
        return false
    }

    return { getItems, getIds, getCount, syncItems, addItem, removeItem, updateItem }
}
