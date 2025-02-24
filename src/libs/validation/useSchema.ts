/* eslint-disable @typescript-eslint/no-explicit-any */
import { computed, type ComputedRef } from 'vue'
import { toTypedSchema } from '@vee-validate/yup'
import type { ObjectSchema } from 'yup'

export function useSchema<T extends ObjectSchema<any>>(
	getSchema: () => T,
): ComputedRef<ReturnType<typeof toTypedSchema<T>>> {
	const schema = computed(() => toTypedSchema(getSchema()))

	return schema
}
