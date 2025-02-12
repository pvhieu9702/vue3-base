<script setup lang="ts">
	import { RouterLink } from 'vue-router'
	import { useCounterStore } from '@/stores/uiStore'

	const uiStore = useCounterStore()

	const handleToggleDarkMode = () => {
		// uiStore.toggleDarkMode()
		document.documentElement.classList.toggle('dark-theme')
	}
</script>

<template>
	<div class="flex items-center justify-between h-full px-4">
		<RouterLink
			to="/"
			class="layout-topbar-logo"
		>
			<div>
				<img
					alt="Vue logo"
					class="logo"
					src="@/assets/logo.svg"
					width="40"
				/>
			</div>
		</RouterLink>
		<div class="flex gap-4 items-center">
			<i
				:class="[
					'pi',
					{ 'pi-moon': uiStore.isDarkMode, 'pi-sun': !uiStore.isDarkMode },
					'cursor-pointer',
				]"
				@click="handleToggleDarkMode"
			></i>
			<button
				type="button"
				class="layout-topbar-action cursor-pointer"
			>
				<i class="pi pi-user"></i>
			</button>
		</div>
	</div>
</template>

<style scoped></style>
