<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
	import { Password } from 'primevue'
	import { useId } from 'vue'
	import FormLabel from './FormLabel.vue'
	import { Field } from 'vee-validate'
	import type { FormControlInterface } from '@/types/form'
	import { FORM_CONTROL_VALIDATE_ON } from '@/libs/constants/common'

	interface FormPasswordControlProps extends FormControlInterface {
		placeholder?: string
	}
	const props = withDefaults(defineProps<FormPasswordControlProps>(), {
		...FORM_CONTROL_VALIDATE_ON,
	})

	const uid = useId()
</script>

<template>
	<div class="flex items-center">
		<FormLabel
			:html-for="uid"
			v-if="props.label"
			:required="props.required"
			:label="props.label"
			:class-name="props.labelClassName"
		/>

		<div class="py-1 px-2">
			<Field
				:name="props.name"
				v-slot="{ field, errorMessage }"
				:validateOnMount="props.validateOnMount"
				:validateOnInput="props.validateOnInput"
				:validateOnChange="props.validateOnChange"
				:validateOnBlur="props.validateOnBlur"
				:validateOnModelUpdate="props.validateOnModelUpdate"
			>
				<Password
					v-bind="field"
					:id="uid"
					:placeholder="props.placeholder"
					:disabled="props.disabled"
					:class="['h-8', props.className]"
					:feedback="false"
				/>
				<div
					v-if="errorMessage && !hiddenError"
					class="text-red-500"
				>
					{{ errorMessage }}
				</div>
			</Field>
		</div>
	</div>
</template>
