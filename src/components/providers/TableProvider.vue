<script setup lang="ts">
	import { table } from '@/composables/table'
	import { defineProps, provide } from 'vue'

	const props = defineProps({
		fetchData: {
			type: Function,
			required: true,
		},
		initFilter: Object,
	})

	const tableState = table({
		fetchData: props.fetchData,
		initFilter: props.initFilter,
	})
	provide('TableProvider', tableState)
</script>

<template>
	<slot />
</template>
