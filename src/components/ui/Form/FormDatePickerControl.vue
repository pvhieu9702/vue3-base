<script setup lang="ts">
	import { DatePicker, type DatePickerProps } from 'primevue'
	import { useId } from 'vue'
	import FormLabel from './FormLabel.vue'
	import { Field } from 'vee-validate'
	import type { FormControlInterface } from '@/types/form'
	import { FORM_CONTROL_VALIDATE_ON } from '@/libs/constants/common'

	interface FormDatePickerControlProps extends FormControlInterface {
		selectionMode?: DatePickerProps['selectionMode']
		dateFormat?: string
		inline?: boolean
		showIcon?: boolean
		minDate?: DatePickerProps['minDate']
		disabledDates?: DatePickerProps['disabledDates']
		disabledDays?: DatePickerProps['disabledDays']
		maxDateCount?: DatePickerProps['maxDateCount']
		hideOnDateTimeSelect?: DatePickerProps['hideOnDateTimeSelect']
		hideOnRangeSelection?: DatePickerProps['hideOnRangeSelection']
		manualInput?: DatePickerProps['manualInput']
		placeholder?: DatePickerProps['placeholder']
	}
	const props = withDefaults(defineProps<FormDatePickerControlProps>(), {
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
				<DatePicker
					:modelValue="field.value"
					:inputId="uid"
					:class="['min-w-[176px]', { 'h-8': !props.inline }, props.className]"
					@update:modelValue="setValue"
					:selectionMode="props.selectionMode"
					:dateFormat="props.dateFormat"
					:inline="props.inline"
					:showIcon="props.showIcon"
					:minDate="props.minDate"
					:disabledDates="props.disabledDates"
					:disabledDays="props.disabledDays"
					:maxDateCount="props.maxDateCount"
					:hideOnDateTimeSelect="props.hideOnDateTimeSelect"
					:hideOnRangeSelection="props.hideOnRangeSelection"
					:manualInput="props.manualInput"
					:placeholder="props.placeholder"
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
