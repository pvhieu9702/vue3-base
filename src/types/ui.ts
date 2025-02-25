import type { LAYOUT } from '@/libs/constants/layout'
import type { ValueOf } from './core'

export interface UiState {
	darkMode: boolean
	currentLayout: ValueOf<typeof LAYOUT>
}
