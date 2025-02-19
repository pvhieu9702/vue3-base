
import type { FormContextInterface } from '@/types/hook'
import { inject } from 'vue'

export function useFormProvider() {
	const table =
		inject<FormContextInterface>('formContext')
	if (!table) {
		throw new Error('useFormProvider must be used within a <FormProvider>')
	}
	return table
}
