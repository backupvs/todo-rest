import { v4 as uuidv4 } from "uuid";
import { saveTaskToDb } from "./apiUtils";

const updateLocalStorage = (tasks: Task[]) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

const clearLocalTasks = () => {
    localStorage.removeItem('tasks');
};

export const saveTaskToLocalStorage = (createTaskDto: CreateTaskDto) => {
    const _id = uuidv4();
    const newTask = { ...createTaskDto, _id, isDone: false };
    const tasks = getTasksFromLocalStorage();
    tasks.unshift(newTask);

    updateLocalStorage(tasks);
};

export const getTasksFromLocalStorage = (pagination?: Pagination, isDone?: boolean): Task[] => {
    const tasksJson = localStorage.getItem('tasks');
    if (!tasksJson) return [];

    const tasks: Task[] = JSON.parse(tasksJson);

    if (typeof isDone === 'undefined') {
        return tasks.slice(pagination?.offset, pagination?.limit);
    }

    if (isDone) {
        return tasks
            .filter(task => task.isDone)
            .slice(pagination?.offset, pagination?.limit)
    } else {
        return tasks
            .filter(task => !task.isDone)
            .slice(pagination?.offset, pagination?.limit)
    }
};

export const updateTaskInLocalStorage = (id: string, updateTaskDto: UpdateTaskDto) => {
    const tasks = getTasksFromLocalStorage();
    const taskIndex = getTasksFromLocalStorage().findIndex(task => task._id === id);
    const task = tasks[taskIndex];

    if (task) {
        tasks[taskIndex] = { ...task, ...updateTaskDto };
        updateLocalStorage(tasks);
    }
};

export const removeTaskFromLocalStorage = (id: string) => {
    const tasks = getTasksFromLocalStorage();
    updateLocalStorage(tasks.filter(task => task._id !== id));
};

export const saveFromLocalStorageToDb = async () => {
    try {
        const tasks = getTasksFromLocalStorage();
        tasks.map(task => {
            const { name, description } = task;
            return saveTaskToDb({ name, description });
        });
        await Promise.all(tasks);
        clearLocalTasks();
    } catch (err) {
        throw (err);
    }
};

export const getTasksCountFromLocalStorage = () => getTasksFromLocalStorage().length;

export const localStorageUtils = {
    saveTaskToLocalStorage,
    getTasksFromLocalStorage,
    updateTaskInLocalStorage,
    removeTaskFromLocalStorage,
    saveFromLocalStorageToDb,
    getTasksCountFromLocalStorage
}