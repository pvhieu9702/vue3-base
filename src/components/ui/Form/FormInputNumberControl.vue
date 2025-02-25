<script setup lang="ts">
	import { InputNumber, type InputNumberProps } from 'primevue'
	import { useId } from 'vue'
	import FormLabel from './FormLabel.vue'
	import { Field } from 'vee-validate'
	import type { FormControlInterface } from '@/types/form'
	import { FORM_CONTROL_VALIDATE_ON } from '@/libs/constants/common'

	interface FormInputMaskControlProps extends FormControlInterface {
		placeholder?: string
		format?: InputNumberProps['format']
		showButtons?: InputNumberProps['showButtons']
		buttonLayout?: InputNumberProps['buttonLayout']
		mode?: InputNumberProps['mode']
		prefix?: InputNumberProps['prefix']
		suffix?: InputNumberProps['suffix']
		currencyDisplay?: InputNumberProps['currencyDisplay']
		useGrouping?: InputNumberProps['useGrouping']
		minFractionDigits?: InputNumberProps['minFractionDigits']
		maxFractionDigits?: InputNumberProps['maxFractionDigits']
		roundingMode?: InputNumberProps['roundingMode']
		min?: InputNumberProps['min']
		max?: InputNumberProps['max']
		step?: InputNumberProps['step']
	}
	const props = withDefaults(defineProps<FormInputMaskControlProps>(), {
		...FORM_CONTROL_VALIDATE_ON,
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
				<InputNumber
					:model-value="field.value"
					:id="uid"
					:placeholder="props.placeholder"
					:disabled="props.disabled"
					@update:modelValue="setValue"
					:class="['h-8', props.className]"
					:format="props.format"
					:showButtons="props.showButtons"
					:buttonLayout="props.buttonLayout"
					:mode="props.mode"
					:prefix="props.prefix"
					:suffix="props.suffix"
					:currencyDisplay="props.currencyDisplay"
					:useGrouping="props.useGrouping"
					:minFractionDigits="props.minFractionDigits"
					:maxFractionDigits="props.maxFractionDigits"
					:roundingMode="props.roundingMode"
					:min="props.min"
					:max="props.max"
					:step="props.step"
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
