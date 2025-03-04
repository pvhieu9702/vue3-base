<script setup lang="ts">
	import {
		DEFAULT_PER_PAGE,
		PAGINATION_PAGE_LINK_SIZE,
		PAGINATION_PER_PAGE_OPTIONS,
	} from '@/libs/constants/common'
	import Paginator from 'primevue/paginator'

	interface PaginationProps {
		totalRecords?: number
		perPage?: number
		pageLinkSize?: number
		rowsPerPageOptions?: number[]
	}

	interface EmitsEvents {
		(
			event: 'pageChange',
			payload: { currentPage: number; perPage: number },
		): void
	}

	const props = withDefaults(defineProps<PaginationProps>(), {
		totalRecords: 0,
		perPage: DEFAULT_PER_PAGE,
		pageLinkSize: PAGINATION_PAGE_LINK_SIZE,
		rowsPerPageOptions: () => PAGINATION_PER_PAGE_OPTIONS,
	})

	const emits = defineEmits<EmitsEvents>()
</script>
<template>
	<Paginator
		:page-link-size="props.pageLinkSize"
		:rows="props.perPage"
		:rows-per-page-options="props.rowsPerPageOptions"
		:total-records="props.totalRecords"
		@page="
			(pageState) => {
				emits('pageChange', {
					currentPage: pageState.page + 1,
					perPage: pageState.rows,
				})
			}
		"
	></Paginator>
</template>
