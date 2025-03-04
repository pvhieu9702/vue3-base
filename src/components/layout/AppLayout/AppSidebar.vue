<script setup lang="ts">
	import { APP_SIDEBAR_CONFIG } from '@/libs/config/layout'
	import AppSidebarItem from './AppSidebarItem.vue'
</script>

<template>
	<ul>
		<template
			v-for="item in APP_SIDEBAR_CONFIG"
			:key="item"
		>
			<AppSidebarItem :item="item" />
		</template>
	</ul>
</template>

<style scoped></style>
