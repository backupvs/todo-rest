import React from 'react';
import Button from '../Button/Button';
import TaskItem from '../TaskItem/TaskItem';
import TaskPanel from '../TaskPanel/TaskPanel';
import styles from './TaskList.module.css'

interface TaskListProps {
    tasks: Task[]
    tasksCount: number,
    pagination: Pagination,
    markAsDone: (id: string, currentStatus: boolean) => void
    deleteTask: (id: string) => void
    selectTaskIdForEdit: (id: string) => void
    taskIdForEdit: string | null
    changeTask: ({ name, description }: UpdateTaskDto) => void,
    showMore: () => void;
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
    pagination
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
            {
                pagination.limit < tasksCount &&
                <div className={styles.button_container}>
                    <Button color='blue' onClick={showMore}>
                        Show more
                    </Button>
                </div>
            }
        </div>
    );
}




export default TaskList;