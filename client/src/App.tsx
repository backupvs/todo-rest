import React from 'react';
import { apiUtils } from './utils/apiUtils';
import { localStorageUtils } from './utils/localStorageUtils';
import styles from './App.module.css';
import AuthPanel from './components/AuthPanel/AuthPanel';
import Header from './components/Header/Header';
import TaskList from './components/TaskList/TaskList';
import TaskPanel from './components/TaskPanel/TaskPanel';
import ClipLoader from "react-spinners/ClipLoader";

const initialAuthStatus: AuthStatus = {
    status: false
};

const DEFAULT_PAGINATION: Pagination = {
    offset: 0,
    limit: 10
};

export const AuthStatusContext = React.createContext<AuthStatus>(initialAuthStatus);

const App: React.FC = () => {
    const [taskIdForEdit, setTaskIdForEdit] = React.useState<string | null>(null);
    const [authStatus, setAuthStatus] = React.useState<AuthStatus>(initialAuthStatus);
    const [tasks, setTasks] = React.useState<Task[]>([]);
    const [tasksCount, setTasksCount] = React.useState<number>(0);
    const [pagination, setPagination] = React.useState<Pagination>(DEFAULT_PAGINATION);
    const [isAuthLoading, setIsAuthLoading] = React.useState<boolean>(true);
    const [isTasksLoading, setIsTasksLoading] = React.useState<boolean>(false);

    const addTask = async (createTaskDto: CreateTaskDto) => {
        authStatus.status
            ? (await apiUtils.saveTaskToDb(createTaskDto))
            : localStorageUtils.saveTaskToLocalStorage(createTaskDto);
            
        await fetchTasks();
    };

    const deleteTask = async (id: string) => {
        authStatus.status
            ? (await apiUtils.removeTaskFromDb(id))
            : localStorageUtils.removeTaskFromLocalStorage(id);

        await fetchTasks();
    };

    const markAsDone = async (id: string, currentIsDone: boolean) => {
        authStatus.status
            ? (await apiUtils.updateTaskInDb(id, { isDone: !currentIsDone }))
            : localStorageUtils.updateTaskInLocalStorage(id, { isDone: !currentIsDone });

        await fetchTasks();
    };

    const changeTask = async (updateTaskDto: UpdateTaskDto) => {
        if (taskIdForEdit) {
            authStatus.status
                ? (await apiUtils.updateTaskInDb(taskIdForEdit, updateTaskDto))
                : localStorageUtils.updateTaskInLocalStorage(taskIdForEdit, updateTaskDto);

            setTaskIdForEdit(null);
            await fetchTasks();
        }
    };

    const selectTaskIdForEdit = (id: string) => {
        setTaskIdForEdit(id);
    };

    const showMore = () => {
        let limit = pagination.limit + DEFAULT_PAGINATION.limit;

        if (limit > tasksCount) {
            limit = tasksCount;
        }

        setPagination({ ...pagination, limit });
    }

    const resetPagination = () => {
        setPagination(DEFAULT_PAGINATION);
    }

    const fetchAuthStatus = async () => {
        try {
            const authStatus = await apiUtils.getAuthStatus();
            if (authStatus.success && authStatus.user) {
                setAuthStatus({ ...authStatus, status: true, user: authStatus.user });
            }
        } catch (err) {
            setAuthStatus({ status: false })
        }
    };

    const fetchTasks = React.useCallback(async () => {
        try {
            const tasks = authStatus.status
                ? (await apiUtils.getTasksFromDb(pagination))
                : localStorageUtils.getTasksFromLocalStorage(pagination);
            setTasks(tasks);
        } catch (err) {
            setTasks([]);
        }
    }, [authStatus, pagination]);

    const fetchTasksCount = React.useCallback(async () => {
        try {
            const total = authStatus.status
                ? (await apiUtils.getTasksCountFromDb())
                : localStorageUtils.getTasksCountFromLocalStorage();

            setTasksCount(total);
        } catch (err) {
            setTasksCount(0);
        }
    }, [authStatus.status]);

    React.useEffect(() => {
        fetchAuthStatus()
            .then(() => {
                setIsAuthLoading(false);
            })
    }, []);

    React.useEffect(() => {
        setIsTasksLoading(true);
        fetchTasks()
            .then(() => {
                setIsTasksLoading(false);
            })
    }, [authStatus, pagination, fetchTasks]);

    React.useEffect(() => {
        fetchTasksCount()
    }, [authStatus, tasks, fetchTasksCount]);

    return (
        <div>
            <AuthStatusContext.Provider value={authStatus}>

                <div className={styles.header_container}>
                    <Header
                        tasksCount={tasksCount}
                    />
                    {!isAuthLoading && <AuthPanel />}
                </div>
                <div className={styles.app_container}>
                    <div className={styles.container}>
                        <TaskPanel mode='add' addTask={addTask} />
                        <div className={styles.loading_container}>
                            <ClipLoader
                                color={'#5094d4'}
                                loading={isTasksLoading}
                                size={35}
                            />
                        </div>
                        <TaskList
                            taskIdForEdit={taskIdForEdit}
                            tasks={tasks}
                            deleteTask={deleteTask}
                            markAsDone={markAsDone}
                            selectTaskIdForEdit={selectTaskIdForEdit}
                            changeTask={changeTask}
                            showMore={showMore}
                            tasksCount={tasksCount}
                            pagination={pagination}
                            defaultPagination={DEFAULT_PAGINATION}
                            resetPagination={resetPagination}
                            isTasksLoading={isTasksLoading}
                        />
                    </div>
                </div>

            </AuthStatusContext.Provider>
        </div>

    );
};

export default App;