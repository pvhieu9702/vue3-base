<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
	import { InputText } from 'primevue'
	import { useId } from 'vue'
	import FormLabel from './FormLabel.vue'
	import { Field } from 'vee-validate'

	interface FormInputProps {
		name: string
		placeholder?: string
		label?: string
		required?: boolean
		disabled?: boolean
		labelClassName?: string
		className?: string
		hiddenError?: boolean
		validateOnMount?: boolean
		validateOnInput?: boolean
		validateOnChange?: boolean
		validateOnBlur?: boolean
		validateOnModelUpdate?: boolean
	}
	const props = withDefaults(defineProps<FormInputProps>(), {
		validateOnMount: false,
		validateOnInput: false,
		validateOnChange: false,
		validateOnBlur: false,
		validateOnModelUpdate: false,
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
					type="text"
					:placeholder="props.placeholder"
					:disabled="props.disabled"
					:class="['h-8', props.className]"
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
