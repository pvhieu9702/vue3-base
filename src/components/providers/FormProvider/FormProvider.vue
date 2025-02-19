<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
	import type { FormContextInterface } from '@/types/hook'
	import { toTypedSchema } from '@vee-validate/yup'
	import { Form, useForm, type GenericObject } from 'vee-validate'
	import { provide } from 'vue'
	import { object, string } from 'yup'

	interface FormContainerProps<T extends GenericObject> {
		initValues?: T
		validationSchema?: any
		onSubmit: (values: T) => void
	}
	const props = defineProps<FormContainerProps<any>>()

	const { handleSubmit, values, errors, defineField } = useForm({
		initialValues: props.initValues,
		validationSchema: toTypedSchema(
			object({
				email: string().required().email(),
			}),
		),
		validateOnMount: false,
	})

	const onHandleSubmit = handleSubmit((data: GenericObject) => {
		props.onSubmit(data)
	})

	const formContext: FormContextInterface = {
		values,
		errors,
		defineField,
	}

	provide('formContext', formContext)
</script>

<template>
	<Form
		:initial-values="props.initValues"
		:validation-schema="props.validationSchema"
		@submit="(e: GenericObject) => onHandleSubmit(e)"
	>
		<slot></slot>
	</Form>
</template>
