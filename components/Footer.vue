<template>
    <div class="w-screen h-14">
        <div class="px-3 md:px-10 max-w-5xl xl:max-w-8xl mx-auto text-white h-full">
            <Separator class="!py-2 !pt-0" />
            <div class="justify-between mx-4 md:mx-6 gap-2 h-14 flex items-center -mt-2">
                <p class="text-sm md:text-base font-light underline-effect">
                    © 2025 Alex Croitoriu
                </p>
                <div class="flex items-center gap-2.5 md:gap-3.5">
                    <NuxtLink 
                        to="https://github.com/alex-croitoriu" 
                        target="_blank" 
                        aria-label="github"
                        class="text-white hover:text-gray-lightest transition duration-200"
                    >
                        <IconsGitHub class="!size-6 md:!size-7" />
                    </NuxtLink>
                    <NuxtLink 
                        to="https://discord.com/users/273850522157580288" 
                        target="_blank" 
                        aria-label="discord"
                        class="text-white hover:text-gray-lightest transition duration-200"
                    >
                        <IconsDiscord class="!size-6 md:!size-7" />
                    </NuxtLink>
                    <NuxtLink 
                        to="https://www.linkedin.com/in/alex-croitoriu-939486328/" 
                        target="_blank" 
                        aria-label="linkedin"
                        class="text-white hover:text-gray-lightest transition duration-200"
                    >
                        <IconsLinkedIn class="!size-5 md:!size-6" />
                    </NuxtLink>
                    <NuxtLink 
                        to="mailto:alexcroitoriu2005@gmail.com" 
                        target="_blank"
                        aria-label="email"
                        class="text-white hover:text-gray-lightest transition duration-200"
                    >
                        <IconsMail variant="solid" class="!size-6 md:!size-7" />
                    </NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

.underline-effect {
    position: relative;
}
.underline-effect::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 1px;
    border-radius: 100px;
    background-color: #FFFFFF;
    bottom: 0;
    left: 0;
    transform-origin: right;
    transform: scaleX(0);
    transition: transform .4s;
}
.underline-effect:hover::before {
    transform-origin: left;
    transform: scaleX(1);
}

</style>
