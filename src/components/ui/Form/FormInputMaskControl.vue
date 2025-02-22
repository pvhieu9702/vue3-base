<script setup lang="ts">
	import { InputMask, type InputMaskProps } from 'primevue'
	import { useId } from 'vue'
	import FormLabel from './FormLabel.vue'
	import { Field } from 'vee-validate'
	import type { FormControlInterface } from '@/types/form'
	import { FORM_CONTROL_VALIDATE_ON } from '@/libs/constants/common'

	interface FormInputMaskControlProps extends FormControlInterface {
		placeholder?: string
		slotChar?: InputMaskProps['slotChar']
		autoClear?: InputMaskProps['autoClear']
		unmask?: InputMaskProps['unmask']
		mask?: InputMaskProps['mask']
	}
	const props = withDefaults(defineProps<FormInputMaskControlProps>(), {
		...FORM_CONTROL_VALIDATE_ON,
		slotChar: '_',
		unmask: false,
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

		<div class="py-2 px-2">
			<Field
				:name="props.name"
				v-slot="{ field, errorMessage }"
				:validateOnMount="props.validateOnMount"
				:validateOnInput="props.validateOnInput"
				:validateOnChange="props.validateOnChange"
				:validateOnBlur="props.validateOnBlur"
				:validateOnModelUpdate="props.validateOnModelUpdate"
			>
				<InputMask
					v-bind="field"
					:id="uid"
					:placeholder="props.placeholder"
					:disabled="props.disabled"
					:class="['h-8', props.className]"
					:slotChar="props.slotChar"
					:autoClear="props.autoClear"
					:unmask="props.unmask"
					:mask="props.mask"
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
