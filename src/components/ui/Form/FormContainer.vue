<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
	import { useForm, type GenericObject } from 'vee-validate'

	interface FormContainerProps<T extends GenericObject> {
		initValues?: T
		validationSchema?: any
		onSubmit: (values: T) => void
	}
	const props = defineProps<FormContainerProps<any>>()

	const { handleSubmit } = useForm({
		initialValues: props.initValues,
		validationSchema: props.validationSchema,
	})

	const onHandleSubmit = handleSubmit((data: GenericObject) => {
		props.onSubmit(data)
	})
</script>

<template>
	<form
		:initial-values="props.initValues"
		:validation-schema="props.validationSchema"
		@submit="onHandleSubmit"
	>
		<slot></slot>
	</form>
</template>
