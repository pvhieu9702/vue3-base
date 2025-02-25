export type BaseFilter = {
	page?: number
	limit?: number
}

export interface ApiListResponse<T> {
	data: T[]
	total: number
}

export type ValueOf<T> = T[keyof T]
