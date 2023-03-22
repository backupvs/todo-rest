/* Task */

interface Task {
    name: string
    description: string
    _id: string
    isDone: boolean
    createdAt?: string
    updatedAt?: string
    __v?: number
}

/* User */

interface User {
    _id: string
    username: string
    items: Task[]
    __v: number
}

/* DTOs */

type CreateTaskDto = Pick<Task, 'name' | 'description'>;

interface UpdateTaskDto extends Partial<CreateTaskDto> {
    isDone?: boolean
}

interface UserDto {
    username: string
    password: string
}

/* ModalType */

type ModalType = 'Register' | 'Login' | null;

/* UserDto Context */
interface UserDtoContextType {
    userDto: UserDto
    setUserDto: (userDto: UserDto) => void
};

/* AuthStatus */

interface AuthStatus {
    status: boolean
    user?: User
}

/* ApiData */

interface ApiResult {
    success: boolean
}

type ApiAuthStatusResult = AuthStatus & ApiResult;