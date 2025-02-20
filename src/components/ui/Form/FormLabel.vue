<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
	interface FormControlContainerProps {
		htmlFor?: string
		label?: string
		required?: boolean
		className?: string
	}
	const props = defineProps<FormControlContainerProps>()
</script>

<template>
	<div class="px-2 min-w-[100px]">
		<label
			:for="props.htmlFor"
			:class="['', props.className]"
		>
			<span>{{ props.label }}</span>
			<span
				v-if="props.required"
				:class="['', { 'text-red-500': props.required }]"
			>
				*
			</span>
		</label>
	</div>
</template>

<style scoped>
	label {
		display: block;
	}
</style>
