<script setup lang="ts">
	import PaginationComponent from '@/components/ui/PaginationComponent.vue'
	import TableElement from '@/components/ui/TableElement.vue'
	import { useTableProvider } from '@/libs/hooks/useTable'
	import type { User } from '@/types/models/user'

	const { data, setPage, setPerPage, currentPage, perPage } =
		useTableProvider<User>()
	const columns = [
		{ field: 'id', header: 'ID' },
		{ field: 'username', header: 'Username' },
		{ field: 'email', header: 'Email' },
		{ field: 'gender', header: 'Gender' },
		{ field: 'age', header: 'Age' },
	]
</script>
<template>
	<TableElement
		:data="data?.data"
		:columns="columns"
	/>
	<div class="flex items-center">
		<p>Total: {{ data?.total }}</p>
		<PaginationComponent
			:per-page="data?.per_page"
			:total-records="data?.total"
			@page-change="
				(pageState) => {
					if (currentPage !== pageState.currentPage) {
						setPage(pageState.currentPage)
					}
					if (perPage !== pageState.perPage) {
						setPerPage(pageState.perPage)
					}
				}
			"
		/>
	</div>
</template>
