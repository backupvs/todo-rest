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
        logErrors(err, 'Tasks was not received!');
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
        logErrors(err, 'Task was not saved!');
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
        logErrors(err, 'Task was not removed!');
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
        logErrors(err, 'Task was not updated!');
        return null;
    }
}

export const register = async (userDto: UserDto): Promise<User> => {
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
        logErrors(err, 'User was not created!');
        throw new Error(getErrorMessage(err));
    }
}

export const login = async (userDto: UserDto): Promise<User> => {
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
        logErrors(err, 'Login error!');
        throw new Error(getErrorMessage(err));
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
        logErrors(err, 'Logout error!');
        return false;
    }
}

function logErrors(err: unknown, message: string) {
    if (err instanceof AxiosError) {
        console.error(message, '\nResponse:', err.response?.data);
    } else {
        console.error(err);
    }
}

function getErrorMessage(err: unknown): string {
    if (err instanceof AxiosError) {
        return err.response?.data.message;
    }

    return 'Unknown error';
}
