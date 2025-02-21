<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
	import { useForm, type GenericObject } from 'vee-validate'
	import { onMounted, watch } from 'vue'

	interface FormContainerProps<T extends GenericObject> {
		initValues?: T
		validationSchema?: any
		onSubmit: (values: T) => void
	}
	const props = defineProps<FormContainerProps<any>>()

	onMounted(() => {
		if (props.initValues) {
			if (typeof props.initValues === 'object') {
				setValues(props.initValues)
			} else if (
				typeof props.initValues === 'function' &&
				typeof props.initValues() === 'object'
			) {
				setValues(props.initValues())
			}
		}
	})

	const { handleSubmit, setValues } = useForm({
		initialValues: props.initValues,
		validationSchema: props.validationSchema,
	})

	const onHandleSubmit = handleSubmit((data: GenericObject) => {
		props.onSubmit(data)
	})

	watch(
		() => props.initValues,
		(newVal) => {
			if (newVal) {
				if (typeof newVal === 'object') {
					setValues(newVal)
				} else if (
					typeof newVal === 'function' &&
					typeof newVal() === 'object'
				) {
					setValues(newVal())
				}
			}
		},
		{ deep: true }, // Watch deep để xử lý nested objects
	)
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
