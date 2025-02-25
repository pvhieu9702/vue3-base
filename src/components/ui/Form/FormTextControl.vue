<script setup lang="ts">
	import { InputText } from 'primevue'
	import { useId, type InputTypeHTMLAttribute } from 'vue'
	import FormLabel from './FormLabel.vue'
	import { Field } from 'vee-validate'
	import type { FormControlInterface } from '@/types/form'
	import { FORM_CONTROL_VALIDATE_ON } from '@/libs/constants/common'

	interface FormTextControlProps extends FormControlInterface {
		placeholder?: string
		fluid?: boolean
		type?: InputTypeHTMLAttribute
	}
	const props = withDefaults(defineProps<FormTextControlProps>(), {
		...FORM_CONTROL_VALIDATE_ON,
		type: 'text',
	})

	const uid = useId()
</script>

<template>
	<div class="flex items-center w-full">
		<FormLabel
			:html-for="uid"
			v-if="props.label"
			:required="props.required"
			:label="props.label"
			:class-name="props.labelClassName"
		/>

		<div class="py-2 px-2 grow">
			<Field
				:name="props.name"
				v-slot="{ field, errorMessage }"
				:validateOnMount="props.validateOnMount"
				:validateOnInput="props.validateOnInput"
				:validateOnChange="props.validateOnChange"
				:validateOnBlur="props.validateOnBlur"
				:validateOnModelUpdate="props.validateOnModelUpdate"
			>
				<InputText
					v-bind="field"
					:id="uid"
					:type="props.type"
					:placeholder="props.placeholder"
					:disabled="props.disabled"
					:class="['h-8', props.className]"
					:fluid="props.fluid"
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
