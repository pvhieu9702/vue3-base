import type { FormControlInterface } from '@/types/form'

export const DEFAULT_PER_PAGE = 10

export const FORM_CONTROL_VALIDATE_ON: FormControlInterface = {
	validateOnMount: false,
	validateOnInput: false,
	validateOnChange: false,
	validateOnBlur: false,
	validateOnModelUpdate: false,
} as FormControlInterface
