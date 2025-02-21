<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
	import { provide } from 'vue'
	import { useTable } from './useTable'
	import type { ApiListResponse } from '@/types/core'

	interface TableProviderProps<T> {
		fetchData: () => Promise<ApiListResponse<T>>
		initialFilter?: Record<string, any>
	}
	const props = defineProps<TableProviderProps<any>>()

	const tableState = useTable({
		fetchData: props.fetchData,
		initialFilter: props.initialFilter,
	})
	provide('TableProvider', tableState)
</script>

<template>
	<slot />
</template>
