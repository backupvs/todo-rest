import axios, { AxiosResponse } from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const getTasks = async (): Promise<Task[]> => {
    try {
        const response: AxiosResponse<ApiItemsData> = await axios.get(
            `${BASE_URL}/items`
        );

        if (response.status !== 200) {
            throw new Error(`Error! status: ${response.status}`);
        }

        const { data: { data: tasks } } = response;

        return tasks;
    } catch (err) {
        throw err;
    }
};

export const saveTask = async (createTaskDto: CreateTaskDto): Promise<Task> => {
    try {
        const response: AxiosResponse<ApiItemData> = await axios.post(
            `${BASE_URL}/items`,
            createTaskDto
        );

        if (response.status !== 201) {
            console.log(response);
            throw new Error(`Task was not saved! status: ${response.status}`);
        }

        const { data: { data: createdTask } } = response;

        return createdTask;
    } catch (err) {
        throw err;
    }
}

export const removeTask = async (id: string): Promise<Task> => {
    try {
        const response: AxiosResponse<ApiItemData> = await axios.delete(
            `${BASE_URL}/items/${id}`
        );

        if (response.status !== 200) {
            throw new Error(`Task was not removed! status: ${response.status}`);
        }

        const { data: { data: removedTask } } = response;

        return removedTask;
    } catch (err) {
        throw err;
    }
}

export const updateTask = async (id: string, updateTaskDto: UpdateTaskDto): Promise<Task> => {
    try {
        const response: AxiosResponse<ApiItemData> = await axios.patch(
            `${BASE_URL}/items/${id}`,
            updateTaskDto
        );

        if (response.status !== 200) {
            throw new Error(`Task was not updated! status: ${response.status}`);
        }

        const { data: { data: updatedTask } } = response;

        return updatedTask;
    } catch (err) {
        throw err;
    }
}
