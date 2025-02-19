<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
	import FormProvider from '@/components/providers/FormProvider'
	import FormTextControl from '@/components/ui/Form/FormTextControl.vue'
	import { Button, Card } from 'primevue'

	const handleSubmit = (data: any) => {
		console.log('Submitted Data:', data)
	}
</script>
<template>
	<FormProvider @submit="handleSubmit">
		<Card style="width: 25rem; overflow: hidden">
			<template #content>
				<FormTextControl
					name="email"
					label="Email"
					:label-class-name="'mr-2'"
				/>
				<FormTextControl
					name="username"
					label="Username"
					:label-class-name="'mr-2'"
				/>
				<!-- <FormControlContainer label="Password">
					<Password
						name="email"
						type="text"
						placeholder="Password"
						:feedback="false"
					/>
				</FormControlContainer> -->
				<Button
					type="submit"
					severity="secondary"
					label="Submit"
				/>
			</template>
		</Card>
	</FormProvider>
</template>
