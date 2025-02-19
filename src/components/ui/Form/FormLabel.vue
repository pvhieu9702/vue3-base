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
	<label
		:for="props.htmlFor"
		:class="['', props.className]"
	>
		<span>{{ props.label }}</span>
		<span v-if="props.required">*</span>
	</label>
</template>
