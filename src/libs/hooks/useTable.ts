/* eslint-disable @typescript-eslint/no-explicit-any */
import { DEFAULT_PER_PAGE } from '@/libs/constants/common'
import type { ApiListResponse } from '@/types/core'
import { useQuery } from '@tanstack/vue-query'
import { inject, provide, ref, watch, type Ref } from 'vue'

interface ProviderInterface<T> {
	data: Ref<ApiListResponse<T> | undefined>
	isFetching: Ref<boolean>
	currentPage: Ref<number>
	perPage: Ref<number>
	filter: Ref<Record<string, any>>
	setFilter: (newFilter: Record<string, any>) => void
	setPage: (page: number) => void
	setPerPage: (newPerPage: number) => void
}

interface TableInterface<T> {
	key: string
	fetchData: (params: any) => Promise<ApiListResponse<T>>
	initialFilter?: Record<string, any>
}

export function useTable<T>({
	key,
	fetchData,
	initialFilter = {},
}: TableInterface<T>) {
	const currentPage = ref<number>(1)
	const perPage = ref<number>(DEFAULT_PER_PAGE)
	const filter = ref<Record<string, any>>(initialFilter)

	const queryKey = [
		`table-data-${key}`,
		{ ...filter.value },
		currentPage.value,
		perPage.value,
	]

	const { data, isFetching, refetch } = useQuery({
		queryKey,
		queryFn: () => {
			return fetchData({
				...filter.value,
				page: currentPage.value,
				limit: perPage.value,
			})
		},
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

	const returnData: ProviderInterface<T> = {
		data,
		isFetching,
		setFilter,
		setPage,
		setPerPage,
		currentPage,
		perPage,
		filter,
	}

	provide('TableProvider', returnData)

	return returnData
}

export function useTableProvider<T>() {
	const table = inject<ProviderInterface<T>>('TableProvider')
	if (!table) {
		throw new Error('useTable must be used within a <TableProvider>')
	}
	return table
}
