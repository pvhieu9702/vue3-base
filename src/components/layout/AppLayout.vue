<script setup lang="ts">
	import AppHeader from './AppHeader.vue'
	import AppSidebar from './AppSidebar.vue'
	import AppFooter from './AppFooter.vue'
</script>
<template>
	<div class="app-layout">
		<div class="header">
			<AppHeader />
		</div>
		<div class="sidebar">
			<AppSidebar />
		</div>
		<main class="main-content">
			<div class="pb-8 flex-auto">
				<router-view></router-view>
			</div>
			<AppFooter />
		</main>
	</div>
</template>

<style scoped>
	.app-layout {
		display: grid;
		grid-template-columns: 200px 1fr;
		grid-template-rows: 60px 1fr;
		grid-template-areas:
			'header header'
			'sidebar main-content';
		height: 100vh;
	}

	.header {
		grid-area: header;
		background-color: #f0f0f0;
		padding: 10px;
	}

	.sidebar {
		grid-area: sidebar;
		background-color: #e0e0e0;
		padding: 10px;
	}

	.main-content {
		grid-area: main-content;
		overflow-y: auto;
		padding: 0 20px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
</style>
