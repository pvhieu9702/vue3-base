<script setup lang="ts">
	import LoginForm from '@/components/feature/Login/LoginForm.vue'
	import IconLogo from '@/components/icons/IconLogo.vue'
	import FormContainer from '@/components/ui/Form/FormContainer.vue'
	import { LAYOUT } from '@/libs/constants/layout'
	import yup, { useSchema } from '@/libs/validation'
	import router from '@/router'
	import { useAuthStore } from '@/stores/authStore'
	import { useUiStore } from '@/stores/uiStore'

	interface LoginInterface {
		email: string
		password: string
		remember?: boolean
	}

	const validationSchema = useSchema(() =>
		yup.object({
			email: yup
				.string()
				.required('Email là trường bắt buộc')
				.email('Email không hợp lệ'),
			password: yup
				.string()
				.required('Password là trường bắt buộc')
				.min(6, 'Vui lòng nhập ít nhất 6 ký tự và không quá 20 ký tự.')
				.max(20, 'Vui lòng nhập ít nhất 6 ký tự và không quá 20 ký tự.'),
		}),
	)

	const handleSubmit = (data: LoginInterface) => {
		console.log(data)
		useAuthStore().login('admin')
		router.push({ name: 'home' })
		useUiStore().setLayout(LAYOUT.DEFAULT)
	}
</script>

<template>
	<div class="flex bg-surface-500 px-6 h-dvh md:px-12 lg:px-20">
		<div
			class="bg-surface-0 p-6 shadow rounded-border w-full lg:w-6/12 mx-auto my-auto"
		>
			<div class="text-center mb-8">
				<IconLogo />
				<div class="text-surface-900 text-3xl font-medium mb-4">
					Welcome Back
				</div>
				<span class="text-surface-600 font-medium leading-normal"
					>Don't have an account?</span
				>
				<a class="font-medium no-underline ml-2 text-primary cursor-pointer"
					>Create today!</a
				>
			</div>

			<FormContainer
				@submit="handleSubmit"
				:validation-schema="validationSchema"
			>
				<LoginForm />
			</FormContainer>
		</div>
	</div>
</template>
