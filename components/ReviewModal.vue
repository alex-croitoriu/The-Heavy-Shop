<script setup>

import { useToast } from 'vue-toastification'

const route = useRoute()
const toast = useToast()

const reviewId = ref()
const itemId = ref(route.params.id)
const rating = ref(0)
const hoverRating = ref(0)
const review = ref()
const action = ref()
const isOpen = ref(false)
const errorMessage = ref()

const bus = useEventBus('modal')
bus.on(function(event, data) {
    if (['addReview', 'editReview'].includes(event)) {
		action.value = event
		isOpen.value = true
		rating.value = hoverRating.value = data.rating
		review.value = data.review
		reviewId.value = data.id
		errorMessage.value = null
	}
})

async function addReview() {
	errorMessage.value = null
    const { error } = await useFetch('/api/review', {
        method: 'POST',
        body: {
            rating: rating.value,
			review: review.value?.trim(),
			itemId: itemId.value
        }
    })
	errorMessage.value = error.value?.data.statusMessage
	if (!error.value) {
		await refreshNuxtData('item')
		toast.success('Review added successfully!')
		errorMessage.value = null
		isOpen.value = false
	}
}

async function editReview() {
    const { error } = await useFetch(`/api/review/${reviewId.value}`, {
        method: 'PUT',
		body: {
			rating: rating.value,
			review: review.value?.trim()
		}
    })
	if (error.value?.data.statusCode === 401) {
		errorMessage.value = null
		isOpen.value = false
		toast.error(error.value?.data.statusMessage)
	}
	else {
		errorMessage.value = error.value?.data.statusMessage
		if (!error.value) {
			await refreshNuxtData('item')
			toast.success('Review edited successfully!')
			errorMessage.value = null
			isOpen.value = false
		}
	}
}

</script>

<template>
	<Modal v-model="isOpen">
		<template #title>
			{{ action === 'addReview' ? 'Add a review' : 'Edit review' }}
		</template>
		<template #content>
			<form @submit.prevent="() => {
				if (action === 'addReview')
					addReview()
				else
					editReview()
				}
			">
				<div class="flex flex-col gap-4">
					<div class="flex hover:cursor-pointer w-fit mx-auto" @mouseleave="() => hoverRating = rating">
						<template v-for="n in parseInt(hoverRating)">
							<IconsStar 
								class="text-yellow-primary !size-7" 
								@mouseover="() => hoverRating = n" 
								@click="() => rating = hoverRating" 
							/>
						</template>
						<template v-for="n in 5 - parseInt(hoverRating)">
							<IconsStar 
								class="text-gray-light !size-7" 
								@mouseover="() => hoverRating = hoverRating + n" 
								@click="() => rating = hoverRating" 
							/>
						</template>
					</div>
					<div class="flex flex-col">
						<Label for="review"> Review </Label>
						<textarea 
							v-model="review" 
							name="review" 
							id="review" 
							type="text" 
							class="scrollbar h-24 px-3.5 py-2.5 w-full text-sm text-white outline-none hover:outline-none border-0 focus:ring-[1.5px] focus:ring-inset focus:ring-red-primary transition duration-200 bg-gray-primary focus:bg-gray-dark rounded-xl resize-none" 
						/>
					</div>
					<Error class="mx-auto"> {{ errorMessage }} </Error>
					<Button v-if="action === 'addReview'" type="submit">
						<IconsReview class="!size-4" />
						<span> ADD REVIEW </span>
					</Button>
					<Button v-else type="submit">
						<IconsPencil />
						<span> EDIT REVIEW </span>
					</Button>
				</div>
			</form>
		</template>
	</Modal>
</template>

<style scoped>

.scrollbar::-webkit-scrollbar {
    width: 11px;
}

</style>
