/* Header */

interface HeaderProps {
    tasksCount: number
}

/* DTOs */

interface CreateTaskDto {
    name: string
    description: string
}

interface UpdateTaskDto extends Partial<CreateTaskDto> {
    isDone?: boolean
}

/* Task */

interface Task extends CreateTaskDto {
    _id: string
    isDone: boolean
    createdAt?: string
    updatedAt?: string
}

interface TaskItemProps {
    task: Task,
    markAsDone: (id: string, currentStatus: boolean) => void
    deleteTask: (id: string) => void
    selectTaskIdForEdit: (id: string) => void
}

/* TaskList */

interface TaskListProps {
    tasks: Task[]
    markAsDone: (id: string, currentStatus: boolean) => void
    deleteTask: (id: string) => void
    selectTaskIdForEdit: (id: string) => void
    taskIdForEdit: string | null
    changeTask: ({ name, description }: UpdateTaskDto) => void;
}

/* TaskPanel */

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

/* Button */

interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
    color: 'orange' | 'blue' | 'red'
}

/* AuthPanel */

// interface AuthPanelProps = {
//     loginHandler: ()
// }

/* Modal */

type ModalType = 'register' | 'login' | null;

interface BaseModalWrapperProps {
    type: ModalType
    isModalVisible: boolean
    onBackdropClick: () => void
}

interface ModalProps {
    type: ModalType
    isModalVisible: boolean
    onBackdropClick: () => void
    // children: React.ReactNode
}

/* ApiData */

interface ApiItemsData {
    data: Task[]
}

interface ApiItemData {
    data: Task
}