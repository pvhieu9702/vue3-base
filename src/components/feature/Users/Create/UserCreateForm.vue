<script setup lang="ts">
	import FormCheckboxControl from '@/components/ui/Form/FormCheckboxControl.vue'
	import FormCheckboxGroupControl from '@/components/ui/Form/FormCheckboxGroupControl.vue'
	import FormContainer from '@/components/ui/Form/FormContainer.vue'
	import FormDatePickerControl from '@/components/ui/Form/FormDatePickerControl.vue'
	import FormTextControl from '@/components/ui/Form/FormTextControl.vue'
	import yup, { useSchema } from '@/libs/validation'
	import { Button } from 'primevue'
	import { ref } from 'vue'

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleSubmit = (data: any) => {
		console.log('Submitted Data:', data)
	}

	const validationSchema = useSchema(() =>
		yup.object({
			email: yup.string().optional().email('Email không hợp lệ'),
			username: yup
				.string()
				.min(6, 'Vui lòng nhập ít nhất 6 ký tự và không quá 20 ký tự.')
				.max(20, 'Vui lòng nhập ít nhất 6 ký tự và không quá 20 ký tự.'),
		}),
	)

	const categories = ref([
		{ value: 'electronics', label: 'Electronics' },
		{ value: 'clothing', label: 'Clothing' },
		{ value: 'books', label: 'Books' },
	])
</script>
<template>
	<FormContainer
		@submit="handleSubmit"
		:validation-schema="validationSchema"
		:init-values="{
			categories: ['electronics'],
		}"
	>
		<FormTextControl
			name="username"
			label="Username"
		/>
		<FormCheckboxControl
			name="checkbox"
			check-box-label="Checked"
		/>
		<FormCheckboxGroupControl
			label="Category"
			name="categories"
			:options="categories"
		/>
		<FormDatePickerControl
			name="date"
			label="Date"
			show-icon
			size="small"
		/>

		<Button
			type="submit"
			severity="secondary"
			label="Submit"
		/>
	</FormContainer>
</template>
