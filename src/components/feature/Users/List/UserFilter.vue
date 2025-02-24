<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
	import FormContainer from '@/components/ui/Form/FormContainer.vue'
	import FormTextControl from '@/components/ui/Form/FormTextControl.vue'
	import { useTableProvider } from '@/libs/hooks/useTable'
	import yup, { useSchema } from '@/libs/validation'
	import router from '@/router'
	import type { User } from '@/types/models/user'
	import { Button } from 'primevue'

	const { setFilter } = useTableProvider<User>()

	const handleSubmit = (data: any) => {
		setFilter(data)
	}

	const validationSchema = useSchema(() =>
		yup.object({
			email: yup.string().email('Email không hợp lệ'),
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
			<FormTextControl
				name="first_name"
				label="First name"
			/>
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
