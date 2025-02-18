<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
	import { Form } from 'vee-validate'
	import { type ObjectSchema, type InferType } from 'yup'

	interface FormContainerProps<T extends ObjectSchema<any>> {
		initValues?: InferType<T>
		validationSchema?: Partial<T>
		onSubmit: (values: InferType<T>) => void
	}
	const { initValues, validationSchema, onSubmit } =
		defineProps<FormContainerProps<any>>()
</script>

<template>
	<Form
		:initial-values="initValues"
		:validation-schema="validationSchema"
		@submit="onSubmit"
	>
		<slot></slot>
	</Form>
</template>
