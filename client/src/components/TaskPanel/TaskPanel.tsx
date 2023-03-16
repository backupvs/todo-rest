import React from 'react';
import Button from '../Button/Button';
import styles from './TaskPanel.module.css';

interface AddTaskPanelProps {
    mode: 'add'
    addTask: ({ name, description }: CreateTaskDto) => void
}

interface EditTaskPanelProps {
    mode: 'edit';
    editTask: UpdateTaskDto;
    changeTask: ({ name, description }: UpdateTaskDto) => void;
}

type TaskPanelProps = AddTaskPanelProps | EditTaskPanelProps;

const DEFAULT_TASK = { name: '', description: '' };

const TaskPanel: React.FC<TaskPanelProps> = (props) => {
    const isEdit = props.mode === 'edit';
    const [task, setTask] = React.useState(isEdit ? props.editTask : DEFAULT_TASK);

    const onClick = () => {
        if (isEdit) {
            return props.changeTask(task);
        }
        props.addTask(task as CreateTaskDto);
        setTask(DEFAULT_TASK);
    };

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target;
        setTask({ ...task, [name]: value });
    };

    return (
        <div className={styles.task_panel_container}>
            <div className={styles.fields_container}>
                <div className={styles.field_container}>
                    <label htmlFor='name'>
                        <div>title</div>
                        <input
                            autoComplete='off'
                            id='name'
                            value={task.name}
                            onChange={onChange}
                            name='name'
                        />
                    </label>
                </div>
                <div className={styles.field_container}>
                    <label htmlFor='description'>
                        <div>description</div>
                        <input
                            autoComplete='off'
                            id='description'
                            value={task.description}
                            onChange={onChange}
                            name='description'
                        />
                    </label>
                </div>
            </div>
            <div className={styles.button_container}>
                {!isEdit && (
                    <Button color='blue' onClick={onClick}>
                        ADD
                    </Button>
                )}
                {isEdit && (
                    <Button color='orange' onClick={onClick}>
                        EDIT
                    </Button>
                )}
            </div>
        </div>
    );
};

export default TaskPanel;