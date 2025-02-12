<script setup lang="ts">
	import type { SidebarItemInterface } from '@/types/layout'
	import { ref } from 'vue'
	import AppSidebarItem from './AppSidebarItem.vue'

	const sidebarConfig = ref<SidebarItemInterface[]>([
		{
			label: 'Home',
			to: '/',
			icon: 'pi pi-home',
		},
		{
			label: 'Users',
			to: '/users',
			icon: 'pi pi-users',
		},
	])
</script>

<template>
	<ul>
		<template
			v-for="item in sidebarConfig"
			:key="item"
		>
			<AppSidebarItem :item="item" />
		</template>
	</ul>
</template>

<style scoped></style>
