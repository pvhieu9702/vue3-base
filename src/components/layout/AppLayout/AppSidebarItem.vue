<script setup lang="ts">
	import type { SidebarItemInterface } from '@/types/layout'
	import { ref, onBeforeMount } from 'vue'
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
	})
</script>

<template>
	<div v-if="props.item.to">
		<RouterLink :to="props.item?.to ? props.item.to : '#'">
			<div class="nav-item h-10 flex items-center gap-3 px-2.5">
				<i
					v-if="props.item?.icon"
					:class="props.item.icon"
				></i>
				{{ props.item.label }}
			</div>
		</RouterLink>
	</div>
</template>

<style>
	.nav-active-link .nav-item,
	.nav-exact-active-link .nav-item {
		background-color: #53eafd;
	}
</style>
