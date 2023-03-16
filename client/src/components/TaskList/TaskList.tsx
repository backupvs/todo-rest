import React from 'react';
import TaskItem from '../TaskItem/TaskItem';
import TaskPanel from '../TaskPanel/TaskPanel';

interface TaskListProps {
    tasks: Task[]
    markAsDone: (id: string, currentStatus: boolean) => void
    deleteTask: (id: string) => void
    selectTaskIdForEdit: (id: string) => void
    taskIdForEdit: string | null
    changeTask: ({ name, description }: UpdateTaskDto) => void;
}

const TaskList: React.FC<TaskListProps> = ({
    tasks,
    taskIdForEdit,
    changeTask,
    deleteTask,
    markAsDone,
    selectTaskIdForEdit
}) => (
    <div>
        {tasks.map((task) => {
            if (task._id === taskIdForEdit)
                return <TaskPanel mode='edit' changeTask={changeTask} editTask={task} />;
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
    </div>
);

export default TaskList;