/* eslint-disable @typescript-eslint/no-explicit-any */
import { DEFAULT_PER_PAGE } from '@/libs/constants/common'
import type { ApiListResponse } from '@/types/core'
import { useQuery } from '@tanstack/vue-query'
import { ref, watch } from 'vue'

interface TableInterface<T> {
	fetchData: (params: any) => Promise<ApiListResponse<T>>
	initialFilter?: Record<string, any>
}
export function useTable<T>({
	fetchData,
	initialFilter = {},
}: TableInterface<T>) {
	const currentPage = ref<number>(1)
	const perPage = ref<number>(DEFAULT_PER_PAGE)
	const filter = ref<Record<string, any>>(initialFilter)

	const queryKey = [
		'table-data',
		{ ...filter.value },
		currentPage.value,
		perPage.value,
	]

	const { data, isFetching, refetch } = useQuery({
		queryKey,
		queryFn: () =>
			fetchData({
				...filter.value,
				page: currentPage.value,
				limit: perPage.value,
			}),
	})

	const setFilter = (newFilter: Record<string, any>) => {
		filter.value = newFilter
		currentPage.value = 1
	}

	const setPage = (page: number) => {
		currentPage.value = page
	}

	const setPerPage = (newPerPage: number) => {
		perPage.value = newPerPage
		currentPage.value = 1
	}

	watch([filter, currentPage, perPage], () => {
		refetch()
	})

	return {
		data,
		isFetching,
		setFilter,
		setPage,
		setPerPage,
		currentPage,
		perPage,
	}
}
