<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
	import { InputText } from 'primevue'
	import { computed, useId } from 'vue'
	import { useFormProvider } from '@/libs/hooks/useFormProvider'
	import FormLabel from './FormLabel.vue'
	import { ErrorMessage } from 'vee-validate'

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

	const formContext = useFormProvider()
	const uid = useId()

	const [field, fieldAttrs] = formContext.defineField(props.name)
</script>

<template>
	<div>
		<FormLabel
			:html-for="uid"
			v-if="props.label"
			:required="props.required"
			:label="props.label"
			:class-name="props.labelClassName"
		/>

		<InputText
			v-model="field"
			v-bind="fieldAttrs"
			type="text"
			:placeholder="props.placeholder"
			:disabled="props.disabled"
		/>
		<div
			v-if="formContext.errors.value[props.name]"
			class="text-red-500"
		>
			{{ formContext.errors.value[props.name] }}
		</div>
	</div>
</template>
