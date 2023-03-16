import React from 'react';
import Button from '../Button/Button';
import styles from './TaskItem.module.css';

interface TaskItemProps {
    task: Task,
    markAsDone: (id: string, currentStatus: boolean) => void
    deleteTask: (id: string) => void
    selectTaskIdForEdit: (id: string) => void
}

const TaskItem: React.FC<TaskItemProps> = ({
    task,
    deleteTask,
    markAsDone,
    selectTaskIdForEdit
}) => (
    <div className={styles.task_item_container} style={{ opacity: task.isDone ? 0.7 : 1 }}>
        <div>
            <div
                aria-hidden
                style={{
                    opacity: task.isDone ? 0.5 : 1,
                    textDecoration: task.isDone ? 'line-through' : 'none'
                }}
                onClick={() => markAsDone(task._id, task.isDone)}
                className={styles.task_item_title}
            >
                {task.name}
            </div>
            <div aria-hidden className={styles.task_item_description}>
                {task.description}
            </div>
        </div>
        <div className={styles.task_item_button_container}>
            <Button color='orange' onClick={() => selectTaskIdForEdit(task._id)}>
                EDIT
            </Button>
            <Button color='red' onClick={() => deleteTask(task._id)}>
                DELETE
            </Button>
        </div>
    </div>
);

export default TaskItem;