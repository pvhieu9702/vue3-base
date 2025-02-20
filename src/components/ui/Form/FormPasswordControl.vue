<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
	import { Password } from 'primevue'
	import { useId } from 'vue'
	import FormLabel from './FormLabel.vue'
	import { useField } from 'vee-validate'

	interface FormInputProps {
		name: string
		placeholder?: string
		label?: string
		required?: boolean
		disabled?: boolean
		labelClassName?: string
		className?: string
		hiddenError?: boolean
	}
	const props = defineProps<FormInputProps>()

	const uid = useId()
	const { value, errorMessage } = useField<string | null>(() => props.name)
</script>

<template>
	<div class="flex items-center">
		<FormLabel
			:html-for="uid"
			v-if="props.label"
			:required="props.required"
			:label="props.label"
			:class-name="props.labelClassName"
		/>

		<div class="py-1 px-2">
			<Password
				:input-id="uid"
				v-model="value"
				:placeholder="props.placeholder"
				:disabled="props.disabled"
				:class="['h-8', props.className]"
				:feedback="false"
			/>
			<div
				v-if="errorMessage && !hiddenError"
				class="text-red-500"
			>
				{{ errorMessage }}
			</div>
		</div>
	</div>
</template>
