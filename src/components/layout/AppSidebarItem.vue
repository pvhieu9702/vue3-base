<script setup lang="ts">
	import type { SidebarItemInterface } from '@/types/layout'
	import { ref, withDefaults, defineProps, onBeforeMount } from 'vue'
	interface SidebarItemProps {
		item: SidebarItemInterface
		index?: number
		root?: boolean
		parentItemKey?: string | null
	}
	const props = withDefaults(defineProps<SidebarItemProps>(), {
		item: () => ({}),
		index: 0,
		root: true,
		parentItemKey: null,
	})

	// const isActiveMenu = ref<boolean>(false)
	const itemKey = ref<string | undefined>(undefined)
	onBeforeMount(() => {
		itemKey.value = props.parentItemKey
			? `${props.parentItemKey}-${props.index}`
			: String(props.index)
		// TODO: Handle active menu by store
	})
</script>

<template>
	<div v-if="props.item.to">
		<!-- <li> -->
		<RouterLink :to="props.item?.to ? props.item.to : '#'">
			<i
				v-if="props.item?.icon"
				:class="props.item.icon"
				class="layout-menuitem-icon"
			></i>
			{{ props.item.label }}
			<!-- <i
				class="pi pi-fw pi-angle-down layout-submenu-toggler"
				v-if="props.item.items"
			></i> -->
		</RouterLink>
		<!-- </li> -->
	</div>
</template>

<style scoped></style>
