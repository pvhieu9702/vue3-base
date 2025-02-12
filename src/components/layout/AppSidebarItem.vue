<script setup lang="ts">
	import type { SidebarItemInterface } from '@/types/layout'
	import { defineProps } from 'vue'
	interface SidebarItemProps {
		item: SidebarItemInterface
	}
	const props = defineProps<SidebarItemProps>()

	// const isActiveMenu = ref<boolean>(false)
</script>

<template>
	<!-- <div v-if="props.item.to"> -->
		<li>
			<RouterLink :to="props.item?.to ? props.item.to : '#'">
			<i
				v-if="props.item?.icon"
				:class="props.item.icon"
				class="layout-menuitem-icon"
			></i>
				{{ props.item.label }}
			<i
				class="pi pi-fw pi-angle-down layout-submenu-toggler"
				v-if="props.item.items"
			></i>
		</RouterLink>
		</li>
	<!-- </div> -->
</template>

<style scoped></style>
