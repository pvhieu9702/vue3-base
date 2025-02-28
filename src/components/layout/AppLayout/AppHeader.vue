<script setup lang="ts">
	import { RouterLink } from 'vue-router'
	import { useUiStore } from '@/stores/uiStore'
	import { Button, Menu } from 'primevue'
	import type { MenuItem } from 'primevue/menuitem'
	import { ref } from 'vue'
	import { handleLogout } from '@/libs/helpers/auth'

	const uiStore = useUiStore()

	const handleToggleDarkMode = () => {
		// uiStore.toggleDarkMode()
		document.documentElement.classList.toggle('dark-theme')
	}

	const userMenu = ref()

	const meuItems = ref<MenuItem[]>([
		{
			label: 'Logout',
			icon: 'pi pi-sign-out',
			command: () => handleLogout(),
		},
	])

	const menuToggle = (event: MouseEvent) => {
		userMenu.value.toggle(event)
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
					{ 'pi-moon': uiStore.darkMode, 'pi-sun': !uiStore.darkMode },
					'cursor-pointer',
				]"
				@click="handleToggleDarkMode"
			></i>
			<Button
				type="button"
				variant="text"
				icon="pi pi-user"
				@click="menuToggle"
				aria-haspopup="true"
				aria-controls="overlay_menu"
			/>
			<Menu
				ref="userMenu"
				id="overlay_menu"
				:model="meuItems"
				:popup="true"
				class="w-5"
			/>
		</div>
	</div>
</template>

<style scoped></style>
