<script setup lang="ts">
	import { useProvideCounterStore } from '@/stores/counterStore'
	import DisplayComponent from './DisplayComponent.vue'
	import ButtonComponent from './ButtonComponent.vue'
	useProvideCounterStore(0)
</script>
<template>
	<div>
		<DisplayComponent />
		<ButtonComponent />
	</div>
</template>
