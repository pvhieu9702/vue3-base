<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
	import { computed } from 'vue'
	import { RouterView, useRoute } from 'vue-router'
	import { LAYOUT } from './libs/constants/layout'
	import type { ValueOf } from './types/core'
	import AppLayout from './components/layout/AppLayout/AppLayout.vue'
	import PublicLayout from './components/layout/PublicLayout/PublicLayout.vue'

	const route = useRoute()
	// Mapping layout
	const layouts: Record<ValueOf<typeof LAYOUT>, any> = {
		[LAYOUT.DEFAULT]: AppLayout,
		[LAYOUT.PUBLIC]: PublicLayout,
	}

	const currentLayout = computed(
		() =>
			layouts[(route?.meta?.layout as keyof typeof LAYOUT) ?? LAYOUT.DEFAULT],
	)
</script>

<template>
	<component :is="currentLayout">
		<RouterView />
	</component>
</template>
