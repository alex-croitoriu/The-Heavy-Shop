<script setup>

const props = defineProps({
    variant: {
        type: String,
        default: 'outline'
    }
})

</script>

<template>

    <svg v-if="variant === 'outline'" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" class="size-5">
        <rect x="48" y="96" width="416" height="320" rx="40" ry="40" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" />
        <polyline points="112 160 256 272 400 160" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" />
    </svg>

    <svg v-else-if="variant === 'solid'" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="size-5">
        <path d="M424,80H88a56.06,56.06,0,0,0-56,56V376a56.06,56.06,0,0,0,56,56H424a56.06,56.06,0,0,0,56-56V136A56.06,56.06,0,0,0,424,80Zm-14.18,92.63-144,112a16,16,0,0,1-19.64,0l-144-112a16,16,0,1,1,19.64-25.26L256,251.73,390.18,147.37a16,16,0,0,1,19.64,25.26Z" />
    </svg>

</template>
