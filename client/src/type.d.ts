/* Task */

interface Task extends CreateTaskDto {
    _id: string
    isDone: boolean
    createdAt?: string
    updatedAt?: string
}

/* User */

interface User extends Omit<UserDto, 'password'> {
    _id: string
}

/* DTOs */

interface CreateTaskDto {
    name: string
    description: string
}

interface UpdateTaskDto extends Partial<CreateTaskDto> {
    isDone?: boolean
}

interface UserDto {
    username: string
    password: string
}

/* ModalType */

type ModalType = 'Register' | 'Login' | null;

/* UserId Context */

interface UserContextType {
    userId: string
    setUserId: (userId: string) => void
};

/* ApiData */

interface ApiItemsData {
    data: Task[]
}

interface ApiItemData {
    data: Task
}

interface ApiUserData {
    data: User
}

interface ApiResult {
    success: boolean
}