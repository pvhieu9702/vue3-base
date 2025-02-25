<script setup lang="ts">
	import FormCheckboxControl from '@/components/ui/Form/FormCheckboxControl.vue'
	import FormLabel from '@/components/ui/Form/FormLabel.vue'
	import FormTextControl from '@/components/ui/Form/FormTextControl.vue'
	import Button from 'primevue/button'
</script>
<template>
	<FormLabel
		label="Email"
		class-name="text-surface-900 font-medium"
		class="!px-0"
	/>
	<FormTextControl
		name="email"
		placeholder="Email address"
		class-name="w-full h-12"
	/>
	<FormLabel
		label="Password"
		class-name="text-surface-900 font-medium"
		class="!px-0"
	/>
	<FormTextControl
		name="password"
		type="password"
		class-name="w-full h-12"
	/>
	<div class="flex items-center justify-between mb-12">
		<FormCheckboxControl
			name="remember"
			check-box-label="Remember me"
		/>

		<a
			class="font-medium no-underline ml-2 text-primary text-right cursor-pointer"
		>
			Forgot password?
		</a>
	</div>
	<Button
		label="Sign In"
		type="submit"
		icon="pi pi-user !text-xl !leading-none"
		class="w-full"
	/>
</template>
