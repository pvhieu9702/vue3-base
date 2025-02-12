<script setup lang="ts">
	import {
		Button,
		ColorPicker,
		DatePicker,
		MultiSelect,
		Slider,
	} from 'primevue'
	import { ref } from 'vue'

	interface City {
		name: string
		code: string // Hoặc các thuộc tính khác của thành phố
	}

	const date = ref<Date | undefined>(undefined)
	const cities: City[] = [
		{ name: 'New York', code: 'NY' },
		{ name: 'London', code: 'LDN' },
		{ name: 'Paris', code: 'PRS' },
		{ name: 'Tokyo', code: 'TKO' },
		{ name: 'Hanoi', code: 'HAN' },
		{ name: 'Ho Chi Minh', code: 'HCM' },
	]
</script>

<template>
	<div class="about">
		<h1>This is an about page</h1>
		<Button>Verify</Button>
		<Button>Verifyư</Button>
		<ColorPicker />
		<DatePicker
			v-model="date"
			dateFormat="yy/mm/dd"
			inline
		/>
		<Slider class="w-56" />
		<MultiSelect
			:options="cities"
			optionLabel="name"
			filter
			placeholder="Select Cities"
			:maxSelectedLabels="3"
			class="w-full md:w-80"
		/>
	</div>
</template>

<style scoped></style>
