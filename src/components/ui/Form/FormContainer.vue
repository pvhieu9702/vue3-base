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
				methods.setValues(props.initValues)
			} else if (
				typeof props.initValues === 'function' &&
				typeof props.initValues() === 'object'
			) {
				methods.setValues(props.initValues())
			}
		}
	})

	const methods = useForm({
		initialValues: props.initValues,
		validationSchema: props.validationSchema,
	})

	const onHandleSubmit = async (event: Event) => {
		try {
			event.preventDefault()
			methods.handleSubmit(props.onSubmit)()
		} catch (err) {
			console.log(err)
		}
	}

	watch(
		() => props.initValues,
		(newVal) => {
			if (newVal) {
				if (typeof newVal === 'object') {
					methods.setValues(newVal)
				} else if (
					typeof newVal === 'function' &&
					typeof newVal() === 'object'
				) {
					methods.setValues(newVal())
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
		@submit.prevent="onHandleSubmit"
	>
		<slot></slot>
	</form>
</template>
