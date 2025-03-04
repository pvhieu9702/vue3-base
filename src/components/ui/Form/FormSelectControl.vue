<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
	import { Select } from 'primevue'
	import { useId } from 'vue'
	import FormLabel from './FormLabel.vue'
	import { Field } from 'vee-validate'
	import type { FormControlInterface } from '@/types/form'
	import { FORM_CONTROL_VALIDATE_ON } from '@/libs/constants/common'

	interface FormSelectControlProps extends FormControlInterface {
		placeholder?: string
		options?: any[]
		showClear?: boolean
		optionLabel?: string | ((data: any) => string)
		optionValue?: string | ((data: any) => string)
	}
	const props = withDefaults(defineProps<FormSelectControlProps>(), {
		...FORM_CONTROL_VALIDATE_ON,
		optionLabel: 'label',
		optionValue: 'value',
		showClear: true,
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
				v-slot="{ field, errorMessage, setValue }"
				:validateOnMount="props.validateOnMount"
				:validateOnInput="props.validateOnInput"
				:validateOnChange="props.validateOnChange"
				:validateOnBlur="props.validateOnBlur"
				:validateOnModelUpdate="props.validateOnModelUpdate"
			>
				<Select
					v-model="field.value"
					:id="uid"
					@update:modelValue="setValue"
					:options="props.options"
					:option-label="props.optionLabel"
					:option-value="props.optionValue"
					:placeholder="props.placeholder"
					:show-clear="props.showClear"
					:disabled="props.disabled"
					:class="['min-w-[200px]', props.className]"
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
