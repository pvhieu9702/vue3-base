<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
	import FormContainer from '@/components/ui/Form/FormContainer.vue'
	import FormSelectControl from '@/components/ui/Form/FormSelectControl.vue'
	import FormTextControl from '@/components/ui/Form/FormTextControl.vue'
	import { useTableProvider } from '@/libs/hooks/useTable'
	import router from '@/router'
	import type { User } from '@/types/models/user'
	import { Button } from 'primevue'

	const { setFilter } = useTableProvider<User>()

	const handleSubmit = (data: any) => {
		setFilter(data)
	}
</script>
<template>
	<div class="flex flex-col gap-2">
		<FormContainer @submit="handleSubmit">
			<FormTextControl
				name="username"
				label="Username"
			/>
			<FormTextControl
				name="email"
				label="Email"
			/>
			<FormSelectControl
				name="gender"
				label="Gender"
				:options="[
					{
						label: 'Male',
						value: 'male',
					},
					{
						label: 'Female',
						value: 'female',
					},
					{
						label: 'Other',
						value: 'other',
					},
				]"
			/>
			<div class="flex justify-between">
				<Button
					type="submit"
					severity="secondary"
					label="Submit"
				/>
				<Button
					label="Create"
					@click="() => router.push({ name: 'createUser' })"
				/>
			</div>
		</FormContainer>
	</div>
</template>
