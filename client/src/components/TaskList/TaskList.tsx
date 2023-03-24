import React from 'react';
import Button from '../Button/Button';
import TaskItem from '../TaskItem/TaskItem';
import TaskPanel from '../TaskPanel/TaskPanel';
import styles from './TaskList.module.css'

interface TaskListProps {
    tasks: Task[]
    tasksCount: number
    pagination: Pagination
    defaultPagination: Pagination
    taskIdForEdit: string | null
    changeTask: ({ name, description }: UpdateTaskDto) => void
    isTasksLoading: boolean
    markAsDone: (id: string, currentStatus: boolean) => void
    deleteTask: (id: string) => void
    selectTaskIdForEdit: (id: string) => void
    showMore: () => void
    resetPagination: () => void
}

const TaskList: React.FC<TaskListProps> = ({
    tasks,
    taskIdForEdit,
    changeTask,
    deleteTask,
    markAsDone,
    selectTaskIdForEdit,
    showMore,
    tasksCount,
    pagination,
    defaultPagination,
    resetPagination,
    isTasksLoading
}) => {
    return (
        <div className={styles.task_list_container}>
            {tasks.map((task) => {
                if (task._id === taskIdForEdit) {
                    const { _id, __v, createdAt, updatedAt, isDone, ...updatedTaskDto } = task;
                    return <TaskPanel
                        key={task._id}
                        mode='edit'
                        changeTask={changeTask}
                        editTask={updatedTaskDto}
                    />;
                }
                return (
                    <TaskItem
                        key={task._id}
                        task={task}
                        deleteTask={deleteTask}
                        markAsDone={markAsDone}
                        selectTaskIdForEdit={selectTaskIdForEdit}
                    />
                );
            })}
            <div
                className={styles.button_container}
                style={{ visibility: isTasksLoading === false ? 'visible' : 'hidden' }}>
                {
                    pagination.limit < tasksCount &&
                    <Button color='blue' onClick={showMore}>
                        Show more
                    </Button>
                }
                {
                    pagination.limit > defaultPagination.limit &&
                    <Button color='red' onClick={resetPagination}>
                        Hide
                    </Button>
                }
            </div>
        </div>
    );
}

export default TaskList;