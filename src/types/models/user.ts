import type { BaseFilter } from '../core'

export interface User {
	id: number
	first_name: string
	last_name: string
	gender: string
}

export type UserFilter = BaseFilter & {
	first_name?: string
	gender?: 'male' | 'female'
}
