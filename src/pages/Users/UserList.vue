<script setup lang="ts">
	import UserDataTable from '@/components/feature/Users/List/UserDataTable.vue'
	import UserFilter from '@/components/feature/Users/List/UserFilter.vue'
	import TableProvider from '@/components/providers/TableProvider.vue'
	import { UserApi } from '@/services/api/users'
</script>

<template>
	<h1>Users</h1>
	<TableProvider
		:fetch-data="UserApi.getAll"
		query-key="table-user"
	>
		<UserFilter />
		<UserDataTable />
	</TableProvider>
</template>

<style scoped></style>
