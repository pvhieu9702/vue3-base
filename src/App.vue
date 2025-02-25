<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
	import { computed } from 'vue'
	import { RouterView } from 'vue-router'
	import { LAYOUT } from './libs/constants/layout'
	import { useUiStore } from './stores/uiStore'
	import type { ValueOf } from './types/core'
	import AppLayout from './components/layout/AppLayout/AppLayout.vue'
	import PublicLayout from './components/layout/PublicLayout/PublicLayout.vue'

	// Mapping layout
	const layouts: Record<ValueOf<typeof LAYOUT>, any> = {
		[LAYOUT.DEFAULT]: AppLayout,
		[LAYOUT.PUBLIC]: PublicLayout,
	}

	const currentLayout = computed(
		() => layouts[useUiStore().currentLayout || LAYOUT.PUBLIC],
	)
</script>

<template>
	<component :is="currentLayout">
		<RouterView />
	</component>
</template>
