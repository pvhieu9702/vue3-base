<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
	import { useTableProvider } from '@/libs/hooks/useTable'
	import type { User } from '@/types/models/user'
	import { Column, DataTable, type ColumnProps } from 'primevue'

	interface TableElementProps<T> {
		data?: T[]
		columns: ColumnProps[]
	}

	const props = defineProps<TableElementProps<unknown>>()
	const { isFetching } = useTableProvider<User>()
</script>

<template>
	<DataTable
		:value="props.data || []"
		:loading="isFetching"
	>
		<Column
			v-for="col of columns"
			:key="String(col.field)"
			:field="col.field"
			:header="col.header"
		></Column>
		<!-- <template #loading>
			<div class="text-center p-4 text-gray-500">
				<span>
					<i class="pi pi-spinner pi-spin mr-2"></i> Đang tải dữ liệu...
				</span>
			</div>
		</template> -->
		<template #empty>
			<div class="text-center p-4 text-gray-500">
				<span>Không có dữ liệu để hiển thị</span>
			</div>
		</template>
	</DataTable>
</template>
