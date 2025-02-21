<script setup lang="ts">
	import { Checkbox } from 'primevue'
	import { useId } from 'vue'
	import FormLabel from './FormLabel.vue'
	import { Field } from 'vee-validate'
	import type {
		CheckBoxOptionInterface,
		FormControlInterface,
	} from '@/types/form'
	import { FORM_CONTROL_VALIDATE_ON } from '@/libs/constants/common'

	interface FormCheckboxGroupControlProps extends FormControlInterface {
		options: CheckBoxOptionInterface[]
		checkAll?: boolean
	}
	const props = withDefaults(defineProps<FormCheckboxGroupControlProps>(), {
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
				<div
					v-for="item of props.options"
					class="flex items-center gap-2"
					:key="item.value"
				>
					<Checkbox
						v-model="field.value"
						:inputId="`${item.label}_${item.value}`"
						:value="item.value"
						@update:modelValue="(val) => setValue(val)"
					/>
					<label :for="`${item.label}_${item.value}`">{{ item.label }}</label>
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
