<script setup lang="ts">
	import { DatePicker, type DatePickerProps } from 'primevue'
	import { useId } from 'vue'
	import FormLabel from './FormLabel.vue'
	import { Field } from 'vee-validate'
	import type { FormControlInterface } from '@/types/form'
	import { FORM_CONTROL_VALIDATE_ON } from '@/libs/constants/common'

	interface FormCheckboxControlProps
		extends FormControlInterface,
			Omit<DatePickerProps, 'modelValue' | 'name'> {
		checkBoxLabel?: string
	}
	const props = withDefaults(defineProps<FormCheckboxControlProps>(), {
		...FORM_CONTROL_VALIDATE_ON,
		dateFormat: 'yy/mm/dd',
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

		<div class="py-2 px-2">
			<Field
				:name="props.name"
				v-slot="{ field, errorMessage, setValue }"
				:validateOnMount="props.validateOnMount"
				:validateOnInput="props.validateOnInput"
				:validateOnChange="props.validateOnChange"
				:validateOnBlur="props.validateOnBlur"
				:validateOnModelUpdate="props.validateOnModelUpdate"
			>
				<div class="flex items-center gap-2">
					<DatePicker
						:modelValue="field.value"
						v-bind="props"
						:inputId="uid"
						:class="['min-w-[176px]', props.className]"
						@update:modelValue="setValue"
					/>
					<label :for="uid">{{ props.checkBoxLabel }}</label>
				</div>
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
