<script setup>

useHead({
    title: 'Login'
})

definePageMeta({
    layout: 'auth',
    middleware: 'auth',
    auth: {
        unauthenticatedOnly: true,
        navigateAuthenticatedTo: '/',
    },
})

const route = useRoute()
const { signIn } = useAuth()

const email = ref('test@theheavyshop.com')
const password = ref('password')
const errorMessage = ref()
const loading = ref(false)

async function login(provider) {
    if (provider === 'credentials') {
        loading.value = true
        errorMessage.value = null
        const { error } = await signIn('credentials', {
            email: email.value,
            password: password.value,
            redirect: false
        })
        errorMessage.value = error
        if (error)
            loading.value = false
        else {
            localStorage.setItem('syncNeeded', 'true')
            await navigateTo(route?.query?.callbackUrl, { 
                external: true
            })
        }
    }
    else {
        localStorage.setItem('syncNeeded', 'true')
        await signIn(provider, { 
            callbackUrl: route?.query?.callbackUrl,
            external: true
        })
    }
}

</script>

<template>
    <AuthCard title="Welcome back!">
        <form @submit.prevent="login('credentials')">
            <div class="flex flex-col gap-4">
                <div>
                    <Label for="email"> Email </Label>
                    <TextInput 
                        v-model="email" 
                        name="email" 
                        id="email" 
                        type="email" 
                        autocomplete="email"
                    >
                        <IconsMail class="text-white" />
                    </TextInput>
                </div>
                <div>
                    <Label for="password"> Password </Label>
                    <TextInput 
                        v-model="password" 
                        name="password" 
                        id="password" 
                        type="password"
                    >
                        <IconsKey class="text-white" />
                    </TextInput>
                    <p class="text-white text-sm font-extralight my-1 ml-2">
                        <NuxtLink to="/auth/forgot-password" class="hover:underline">
                            Forgot your password?
                        </NuxtLink>
                    </p>
                </div>
                <Error> {{ errorMessage }} </Error>
                <Button 
                    type="submit" 
                    :variant="loading ? 'loading' : 'primary'"
                >
                    LOG IN
                </Button>
            </div>
        </form>

        <div class="mt-6 flex flex-col items-center">
            <p class="text-white text-sm font-extralight my-1"> 
                Or log in using 
            </p>
            <div class="flex gap-3">
                <button 
                    @click="login('github')" 
                    aria-label="github"
                    class="text-white hover:text-gray-lightest transition duration-200"
                >
                    <IconsGitHub />
                </button>
                <button 
                    @click="login('discord')"
                    aria-label="discord"
                    class="text-white hover:text-gray-lightest transition duration-200"
                >
                    <IconsDiscord />
                </button>
            </div>
        </div>
        
        <p class="mt-6 mb-1 text-white text-sm font-extralight flex flex-wrap items-center justify-center gap-1">
            <span> Don't have an account yet? </span>
            <NuxtLink to="/auth/register" class="font-normal text-red-primary hover:underline">
                Register
            </NuxtLink>
        </p>
    </AuthCard>
</template>
