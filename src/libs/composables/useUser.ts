import { UserApi } from '@/services/api/users'
import type { User, UserFilter } from '@/types/models/user'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { ref } from 'vue'

export const useUsers = (initialFilter: UserFilter = {}) => {
	const queryClient = useQueryClient()
	const filter = ref<UserFilter>(initialFilter)

	const getUsers = useQuery({
		queryKey: ['list-user', filter],
		queryFn: () => UserApi.getAll(filter.value),
	})

	const getUserById = (id: number) =>
		useQuery({
			queryKey: ['detail-user', id],
			queryFn: () => UserApi.getById(id),
			enabled: !!id,
		})

	const createUser = useMutation({
		mutationFn: UserApi.create,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['list-user'] })
		},
	})

	const updateUser = useMutation({
		mutationFn: ({ id, data }: { id: number; data: Partial<User> }) =>
			UserApi.update(id, data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['list-user'] })
		},
	})

	const deleteUser = useMutation({
		mutationFn: UserApi.delete,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['list-user'] })
		},
	})

	const setFilter = (newFilter: UserFilter) => {
		filter.value = { ...filter.value, ...newFilter }
	}

	return {
		getUsers,
		getUserById,
		createUser,
		updateUser,
		deleteUser,
		setFilter,
		filter,
	}
}
