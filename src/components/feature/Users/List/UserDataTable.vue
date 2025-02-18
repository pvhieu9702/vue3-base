<script setup lang="ts">
	import { useTableProvider } from '@/libs/hooks/useTableProvider'
	import type { User } from '@/types/models/user'

	const { data, isFetching } = useTableProvider<User>()
</script>
<template>
	<div v-if="isFetching">Đang tải...</div>
	<ul v-else>
		<!-- <p>Total: {{ data?.total }}</p> -->
		<li
			v-for="user in data?.data"
			:key="user.id"
		>
			{{ user.id }}: {{ user.first_name }} {{ user.last_name }}
		</li>
	</ul>
</template>
