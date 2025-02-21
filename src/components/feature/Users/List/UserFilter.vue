<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
	import FormContainer from '@/components/ui/Form/FormContainer.vue'
	import yup, { useSchema } from '@/libs/validation'
	import router from '@/router'
	import { Button } from 'primevue'

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
</script>
<template>
	<div class="flex flex-col gap-2">
		<FormContainer
			@submit="handleSubmit"
			:validation-schema="validationSchema"
		>
			<Button
				type="submit"
				severity="secondary"
				label="Submit"
			/>
		</FormContainer>
		<Button
			label="Create"
			@click="() => router.push({ name: 'createUser' })"
		/>
	</div>
</template>
