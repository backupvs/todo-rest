import { v4 as uuidv4 } from "uuid";
import { saveTaskToDb } from "./apiUtils";

const updateLocalStorage = (tasks: Task[]) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

const clearLocalTasks = () => {
    localStorage.removeItem('tasks');
}

export const saveTaskToLocalStorage = (createTaskDto: CreateTaskDto) => {
    const _id = uuidv4();
    const newTask = { ...createTaskDto, _id, isDone: false };
    const tasks = getTasksFromLocalStorage();
    tasks.push(newTask);

    updateLocalStorage(tasks);
}

export const getTasksFromLocalStorage = (): Task[] => {
    const tasks = localStorage.getItem('tasks');

    return tasks ? JSON.parse(tasks) : [];
}

export const updateTaskInLocalStorage = (id: string, updateTaskDto: UpdateTaskDto) => {
    const tasks = getTasksFromLocalStorage();
    const taskIndex = getTasksFromLocalStorage().findIndex(task => task._id === id);
    const task = tasks[taskIndex];

    if (task) {
        tasks[taskIndex] = { ...task, ...updateTaskDto };
        updateLocalStorage(tasks);
    }
}

export const removeTaskFromLocalStorage = (id: string) => {
    const tasks = getTasksFromLocalStorage();
    updateLocalStorage(tasks.filter(task => task._id !== id));
}

export const saveFromLocalStorageToDb = async () => {
    try {
        const tasks = getTasksFromLocalStorage();
        tasks.map(task => {
            const { name, description } = task;
            console.log(`saving: {${name}, ${description}}`)
            return saveTaskToDb({ name, description });
        });
        await Promise.all(tasks);
        clearLocalTasks();
    } catch (err) {
        throw(err);
    }
}