import React, { useEffect } from 'react';
import { getTasks, removeTask, saveTask, updateTask } from './api-methods';
import styles from './App.module.css';
import Header from './components/Header/Header';
import TaskList from './components/TaskList/TaskList';
import TaskPanel from './components/TaskPanel/TaskPanel';

const App: React.FC = () => {
    const [taskIdForEdit, setTaskIdForEdit] = React.useState<string | null>(null);
    const [tasks, setTasks] = React.useState<Task[]>([]);

    useEffect(() => {
        fetchTasks();
    }, [])

    const fetchTasks = () => {
        getTasks().then(tasks => setTasks(tasks));
    }

    const addTask = (createTaskDto: CreateTaskDto) => {
        saveTask(createTaskDto).then(() => fetchTasks())
    };

    const deleteTask = (id: string) => {
        removeTask(id).then(() => fetchTasks())
    };

    const markAsDone = (id: string, currentStatus: boolean) => {
        updateTask(id, { isDone: !currentStatus }).then(() => fetchTasks())
    };

    const selectTaskIdForEdit = (id: string) => {
        setTaskIdForEdit(id);
    };

    const changeTask = (updateTaskDto: UpdateTaskDto) => {
        if (taskIdForEdit) {
            updateTask(taskIdForEdit, updateTaskDto)
                .then(() => {
                    fetchTasks();
                    setTaskIdForEdit(null);
                })
        }
    };

    return (
        <div className={styles.app_container}>
            <div className={styles.container}>
                <Header tasksCount={tasks.length} />
                <TaskPanel mode='add' addTask={addTask} />
                <TaskList
                    taskIdForEdit={taskIdForEdit}
                    tasks={tasks}
                    deleteTask={deleteTask}
                    markAsDone={markAsDone}
                    selectTaskIdForEdit={selectTaskIdForEdit}
                    changeTask={changeTask}
                />
            </div>
        </div>
    );
};

export default App;