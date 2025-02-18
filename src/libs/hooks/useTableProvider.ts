import type { ApiListResponse } from '@/types/core'
import type { UseQueryReturnType } from '@tanstack/vue-query'
import { inject } from 'vue'

export function useTableProvider<T>() {
	const table =
		inject<UseQueryReturnType<ApiListResponse<T>, unknown>>('TableProvider')
	if (!table) {
		throw new Error('useTable must be used within a <TableProvider>')
	}
	return table
}
