<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
	import { Column, DataTable, type ColumnProps } from 'primevue'

	interface TableElementProps<T> {
		data?: T[]
		columns: ColumnProps[]
	}

	const props = defineProps<TableElementProps<unknown>>()
</script>

<template>
	<DataTable :value="props.data || []">
		<Column
			v-for="col of columns"
			:key="String(col.field)"
			:field="col.field"
			:header="col.header"
		></Column>
	</DataTable>
</template>
