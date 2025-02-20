<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
	import FormContainer from '@/components/ui/Form/FormContainer.vue'
	import FormPasswordControl from '@/components/ui/Form/FormPasswordControl.vue'
	import FormTextControl from '@/components/ui/Form/FormTextControl.vue'
	import yup, { useSchema } from '@/libs/validation'
	import { Button } from 'primevue'
	import { ErrorMessage, Field, Form } from 'vee-validate'

	const handleSubmit = (data: any) => {
		console.log('Submitted Data:', data)
	}

	const validationSchema = useSchema(() =>
		yup.object({
			email: yup.string().email('Email không hợp lệ').required('Bắt buộc'),
			username: yup
				.string()
				.min(6, 'Vui lòng nhập ít nhất 6 ký tự và không quá 20 ký tự.')
				.max(20, 'Vui lòng nhập ít nhất 6 ký tự và không quá 20 ký tự.'),
		}),
	)

	const testValidate = useSchema(() =>
		yup.object({
			email_2: yup.string().email('Email không hợp lệ').required('Bắt buộc'),
		}),
	)
</script>
<template>
	<FormContainer
		@submit="handleSubmit"
		:validation-schema="validationSchema"
	>
		<FormTextControl
			name="email"
			label="Email"
			required
		/>
		<FormTextControl
			name="username"
			label="Username"
		/>
		<FormPasswordControl
			name="password"
			label="Password"
		/>
		<Button
			type="submit"
			severity="secondary"
			label="Submit"
		/>
	</FormContainer>
	<Form
		:validation-schema="testValidate"
		@invalid-submit="
			(err) => {
				console.log(err)
			}
		"
		@submit="handleSubmit"
	>
		<Field
			name="email_2"
			type="text"
		/>
		<ErrorMessage name="email_2" />
		<Button
			type="submit"
			severity="secondary"
			label="Submit"
		/>
	</Form>
</template>
