import axios, { AxiosError, AxiosResponse } from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;
axios.defaults.withCredentials = true;

export const getTasksFromDb = async (): Promise<Task[]> => {
    try {
        const response: AxiosResponse<Task[]> = await axios.get(
            `${BASE_URL}/items`,
        );

        return response.data;
    } catch (err) {
        logErrors(err, 'Tasks was not received!');
        return [];
    }
};

export const saveTaskToDb = async (createTaskDto: CreateTaskDto): Promise<Task | null> => {
    try {
        const response: AxiosResponse<Task | null> = await axios.post(
            `${BASE_URL}/items`,
            createTaskDto,
        );

        return response.data;
    } catch (err) {
        logErrors(err, 'Task was not saved!');
        return null;
    }
}

export const removeTaskFromDb = async (id: string): Promise<Task | null> => {
    try {
        const response: AxiosResponse<Task | null> = await axios.delete(
            `${BASE_URL}/items/${id}`,
        );

        return response.data;
    } catch (err) {
        logErrors(err, 'Task was not removed!');
        return null;
    }
}

export const updateTaskInDb = async (id: string, updateTaskDto: UpdateTaskDto): Promise<Task | null> => {
    try {
        const response: AxiosResponse<Task | null> = await axios.patch(
            `${BASE_URL}/items/${id}`,
            updateTaskDto,
        );

        return response.data;
    } catch (err) {
        logErrors(err, 'Task was not updated!');
        return null;
    }
}

export const register = async (userDto: UserDto): Promise<User> => {
    try {
        const response: AxiosResponse<User> = await axios.post(
            `${BASE_URL}/auth/register`,
            userDto,
        );

        return response.data;
    } catch (err) {
        logErrors(err, 'User was not created!');
        throw new Error(getErrorMessage(err));
    }
}

export const login = async (userDto: UserDto): Promise<User> => {
    try {
        const response: AxiosResponse<User> = await axios.post(
            `${BASE_URL}/auth/login`,
            userDto,
        );

        return response.data;
    } catch (err) {
        logErrors(err, 'Login error!');
        throw new Error(getErrorMessage(err));
    }
}

export const logout = async (): Promise<boolean> => {
    try {
        const response: AxiosResponse<ApiResult> = await axios.get(
            `${BASE_URL}/auth/logout`,
        );

        return response.data.success;
    } catch (err) {
        logErrors(err, 'Logout error!');
        return false;
    }
}

export const getAuthStatus = async (): Promise<ApiAuthStatusResult> => {
    try {
        const response: AxiosResponse<ApiAuthStatusResult> = await axios.get(
            `${BASE_URL}/auth/login`,
        );

        return response.data;
    } catch (err) {
        logErrors(err, 'Checking auth status error!');
        throw new Error(getErrorMessage(err));
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