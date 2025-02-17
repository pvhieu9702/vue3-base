import type { ApiListResponse, BaseFilter } from '@/types/core'
import instance from './axios'

export const crudService = <T, Filter extends BaseFilter>(
	resource: string,
) => ({
	getAll: async (
		filter: Filter = {} as Filter,
	): Promise<ApiListResponse<T>> => {
		const response = await instance.get(`/${resource}`, { params: filter })
		return response.data
	},

	getById: async (id: number): Promise<T> => {
		const response = await instance.get(`/${resource}/${id}`)
		return response.data
	},

	create: async (data: Partial<T>): Promise<T> => {
		const response = await instance.post(`/${resource}`, data)
		return response.data
	},

	update: async (id: number, data: Partial<T>): Promise<T> => {
		const response = await instance.put(`/${resource}/${id}`, data)
		return response.data
	},

	delete: async (id: number): Promise<void> => {
		await instance.delete(`/${resource}/${id}`)
		return
	},
})
