export type BaseFilter = {
	page?: number
	per_page?: number
}

export interface ApiListResponse<T> {
	data: T[]
	page: number
	per_page: number
	total: number
	total_pages: number
}

export type RequestError = {
	status?: string | number
	errors?: {
		[key: string]: string
	}
	message?: string
}

export type ValueOf<T> = T[keyof T]
