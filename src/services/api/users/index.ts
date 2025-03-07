import type { User, UserFilter } from '@/types/models/user'
import { crudService } from '../core/crudService'

export const UserApi = {
	...crudService<User, UserFilter>('users'),
	// Add other api for users resources ex: export,....
}
