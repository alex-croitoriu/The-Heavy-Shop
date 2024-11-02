export default function getItemRating(item: any) {
    if (item.reviews?.length === 0)
        return 0
    return item.reviews?.map((review: any) => review?.rating).reduce((x: any, y: any) => x + y, 0) / item.reviews?.length
}
