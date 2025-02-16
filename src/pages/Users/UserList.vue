<script setup lang="ts">
	import { useUsers } from '@/composables/useUser'

	const { getUsers, filter } = useUsers({ page: 1, limit: 10 })
	const { data: users, isFetching } = getUsers
</script>

<template>
	<h1>Users</h1>
	<div>
		<input
			v-model="filter.first_name"
			placeholder="Tìm theo tên..."
		/>
		<select v-model="filter.gender">
			<option value="">Tất cả</option>
			<option value="male">Nam</option>
			<option value="female">Nữ</option>
		</select>
	</div>
	<div v-if="isFetching">Đang tải...</div>
	<ul v-else>
		<li
			v-for="user in users"
			:key="user.id"
		>
			{{ user.id }}: {{ user.first_name }} {{ user.last_name }}
		</li>
	</ul>
</template>

<style scoped></style>
