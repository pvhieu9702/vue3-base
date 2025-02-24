<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
	import { useTable } from '../../libs/hooks/useTable'
	import type { ApiListResponse } from '@/types/core'

	interface TableProviderProps<T> {
		queryKey: string
		fetchData: () => Promise<ApiListResponse<T>>
		initialFilter?: Record<string, any>
	}
	const props = defineProps<TableProviderProps<any>>()

	useTable({
		key: props.queryKey,
		fetchData: props.fetchData,
		initialFilter: props.initialFilter,
	})
</script>

<template>
	<slot />
</template>
