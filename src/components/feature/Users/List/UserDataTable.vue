<script setup lang="ts">
	import TableElement from '@/components/ui/TableElement.vue'
	import { useTableProvider } from '@/libs/hooks/useTable'
	import type { User } from '@/types/models/user'

	const { data } = useTableProvider<User>()
	const columns = [
		{ field: 'id', header: 'ID' },
		{ field: 'first_name', header: 'First name' },
		{ field: 'last_name', header: 'Last name' },
		{ field: 'gender', header: 'Gender' },
	]
</script>
<template>
	<TableElement
		:data="data?.data"
		:columns="columns"
	></TableElement>
</template>
