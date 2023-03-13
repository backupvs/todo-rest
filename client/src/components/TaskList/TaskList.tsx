import React from 'react';
import TaskItem from '../TaskItem/TaskItem';
import TaskPanel from '../TaskPanel/TaskPanel';

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