import axios, { AxiosError, AxiosResponse } from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const getTasks = async (): Promise<Task[]> => {
    try {
        const response: AxiosResponse<ApiItemsData> = await axios.get(
            `${BASE_URL}/items`,
            {
                withCredentials: true
            }
        );
        const { data: tasks } = response.data;

        return tasks;
    } catch (err) {
        if (err instanceof AxiosError) {
            console.error('Tasks was not received!\n', 'Errors:', err.response?.data.errors);
        } else {
            console.error(err);
        }

        return [];
    }
};

export const saveTask = async (createTaskDto: CreateTaskDto): Promise<Task | null> => {
    try {
        const response: AxiosResponse<ApiItemData> = await axios.post(
            `${BASE_URL}/items`,
            createTaskDto,
            {
                withCredentials: true
            }
        );
        const { data: createdTask } = response.data;

        return createdTask;
    } catch (err) {
        if (err instanceof AxiosError) {
            console.error('Task was not saved!\n', 'Errors:', err.response?.data.errors);
        } else {
            console.error(err);
        }

        return null;
    }
}

export const removeTask = async (id: string): Promise<Task | null> => {
    try {
        const response: AxiosResponse<ApiItemData> = await axios.delete(
            `${BASE_URL}/items/${id}`,
            {
                withCredentials: true
            }
        );
        const { data: removedTask } = response.data;

        return removedTask;
    } catch (err) {
        if (err instanceof AxiosError) {
            console.error('Task was not removed!\n', 'Errors:', err.response?.data.errors);
        } else {
            console.error(err);
        }

        return null;
    }
}

export const updateTask = async (id: string, updateTaskDto: UpdateTaskDto): Promise<Task | null> => {
    try {
        const response: AxiosResponse<ApiItemData> = await axios.patch(
            `${BASE_URL}/items/${id}`,
            updateTaskDto,
            {
                withCredentials: true
            }
        );
        const { data: updatedTask } = response.data;

        return updatedTask;
    } catch (err) {
        if (err instanceof AxiosError) {
            console.error('Task was not updated!\n', 'Errors:', err.response?.data.errors);
        } else {
            console.error(err);
        }

        return null;
    }
}

export const register = async (userDto: UserDto): Promise<User | null> => {
    try {
        const response: AxiosResponse<ApiUserData> = await axios.post(
            `${BASE_URL}/auth/register`,
            userDto,
            {
                withCredentials: true
            }
        );
        const { data: createdUser } = response.data;

        return createdUser;
    } catch (err) {
        if (err instanceof AxiosError) {
            console.error('User was not created!\n', 'Errors:', err.response?.data.errors);
        } else {
            console.error(err);
        }

        return null;
    }
}

export const login = async (userDto: UserDto): Promise<User | null> => {
    try {
        const response: AxiosResponse<ApiUserData> = await axios.post(
            `${BASE_URL}/auth/login`,
            userDto,
            {
                withCredentials: true
            }
        );
        const { data: user } = response.data;

        return user;
    } catch (err) {
        if (err instanceof AxiosError) {
            console.error('Login error!\n', 'Errors:', err.response?.data.errors);
        } else {
            console.error(err);
        }

        return null;
    }
}

export const logout = async (): Promise<boolean> => {
    try {
        const response: AxiosResponse<ApiResult> = await axios.get(
            `${BASE_URL}/auth/logout`,
            {
                withCredentials: true
            }
        );

        return response.data.success;
    } catch (err) {
        if (err instanceof AxiosError) {
            console.error('Logout error!', 'Errors:', err.response?.data.errors);
        } else {
            console.error(err);
        }

        return false;
    }
}
