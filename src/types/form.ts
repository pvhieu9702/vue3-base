import type { VNodeChild } from 'vue'

export interface FormControlInterface {
	name: string
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

export interface CheckBoxOptionInterface {
	label: string | VNodeChild
	value: string | number
	disabled?: boolean
}
