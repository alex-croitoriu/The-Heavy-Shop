<script setup>

const isOpen = defineModel()

</script>

<template>
	<Teleport to="body">
		<HeadlessTransitionRoot appear :show="isOpen" as="template">
			<HeadlessDialog as="div" @close="() => isOpen = false" class="relative z-50">
				<HeadlessTransitionChild
					as="template" 
					enter="duration-200 ease-out" 
					enter-from="opacity-0" 
					enter-to="opacity-100" 
					leave="duration-200 ease-in" 
					leave-from="opacity-100" 
					leave-to="opacity-0"
				>
					<div class="fixed inset-0 bg-black/[.69]" />
				</HeadlessTransitionChild>
				<div class="fixed inset-0 overflow-y-auto">
					<div class="flex min-h-full items-center justify-center p-2 sm:p-4 text-center">
						<HeadlessTransitionChild 
							as="template" 
							enter="duration-300 ease-out" 
							enter-from="opacity-0 scale-95" 
							enter-to="opacity-100 scale-100" 
							leave="duration-200 ease-in" 
							leave-from="opacity-100 scale-100" 
							leave-to="opacity-0 scale-95"
						>
							<HeadlessDialogPanel class="flex flex-col text-white max-w-md w-full transform overflow-hidden rounded-2xl bg-gray-dark p-3 pt-10 sm:p-4 sm:pt-11 text-left align-middle">
								<button 
									@click="() => isOpen = false"
									aria-label="close"
									class="absolute top-4 right-4 outline-none" 
								>
									<IconsClose class="text-white hover:text-gray-lightest transition duration-200" />
								</button>
								<HeadlessDialogTitle as="h3" class="text-xl sm:text-2xl text-center max-w-xs sm:max-w-sm mx-auto mb-4">
									<slot name="title" />
								</HeadlessDialogTitle>
								<slot name="content" /> 
							</HeadlessDialogPanel>
						</HeadlessTransitionChild>
					</div>
				</div>
			</HeadlessDialog>
		</HeadlessTransitionRoot>
	</Teleport>
</template>
