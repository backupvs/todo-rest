import React, { useEffect } from 'react';
import { getTasks, removeTask, saveTask, updateTask, getAuthStatus } from './api-methods';
import styles from './App.module.css';
import AuthPanel from './components/AuthPanel/AuthPanel';
import Header from './components/Header/Header';
import TaskList from './components/TaskList/TaskList';
import TaskPanel from './components/TaskPanel/TaskPanel';

const initialAuthStatus: AuthStatus = {
    status: false
};

export const AuthStatusContext = React.createContext<AuthStatus>(initialAuthStatus);

const App: React.FC = () => {
    const [taskIdForEdit, setTaskIdForEdit] = React.useState<string | null>(null);
    const [authStatus, setAuthStatus] = React.useState<AuthStatus>({ status: false });
    const [tasks, setTasks] = React.useState<Task[]>([]);

    useEffect(() => {
        fetchAuthStatus()
            .then(() => fetchTasks());
    }, [])

    const fetchAuthStatus = async () => {
        try {
            const authStatus = await getAuthStatus();
            if (authStatus.success && authStatus.user) {
                setAuthStatus({ ...authStatus, status: true, user: authStatus.user })
            }
        } catch (err) {
            setAuthStatus({ status: false })
        }
    }

    const fetchTasks = async () => {
        try {
            const tasks = await getTasks();
            setTasks(tasks);
        } catch (err) {
            setTasks([]);
        }
    }

    const addTask = async (createTaskDto: CreateTaskDto) => {
        await saveTask(createTaskDto);
        fetchTasks();
    };

    const deleteTask = async (id: string) => {
        await removeTask(id);
        fetchTasks();
    };

    const markAsDone = async (id: string, currentStatus: boolean) => {
        await updateTask(id, { isDone: !currentStatus });
        fetchTasks();
    };

    const changeTask = async (updateTaskDto: UpdateTaskDto) => {
        if (taskIdForEdit) {
            await updateTask(taskIdForEdit, updateTaskDto);
            setTaskIdForEdit(null);
            fetchTasks();
        }
    };

    const selectTaskIdForEdit = (id: string) => {
        setTaskIdForEdit(id);
    };


    return (
        <div>
            <AuthStatusContext.Provider value={authStatus}>

                <div className={styles.header_container}>
                    <Header tasksCount={tasks.length} />
                    <AuthPanel />
                </div>
                <div className={styles.app_container}>
                    <div className={styles.container}>
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

            </AuthStatusContext.Provider>
        </div>

    );
};

export default App;