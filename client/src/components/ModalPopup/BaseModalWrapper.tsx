import React from 'react';
import Button from '../Button/Button';
import Modal from './Modal';
import styles from './Modal.module.css';

interface BaseModalWrapperProps {
    title: string | null
    type: ModalType
    isModalVisible: boolean
    onBackdropClick: () => void
    registerHandler: (userDto: UserDto) => void
    loginHandler: (userDto: UserDto) => void
}

const DEFAULT_USER = { username: '', password: '' };

const BaseModalWrapper: React.FC<BaseModalWrapperProps> = ({
    onBackdropClick,
    isModalVisible,
    type,
    title,
    registerHandler,
    loginHandler
}) => {
    const [user, setUser] = React.useState<UserDto>(DEFAULT_USER);
    if (!isModalVisible) return null;

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
    };

    const onClick = () => {
        switch (type) {
            case 'Register':
                registerHandler(user); break;
            case 'Login':
                loginHandler(user); break;
            default: break;
        }
    }

    return (
        <Modal
            onBackdropClick={onBackdropClick}
            type={type}
        >
            <div className={styles.modal_container}>
                <div className={styles.close_button} onClick={onBackdropClick}>
                    <div className={styles.close_sign} />
                </div>
                <div className={styles.modal_header}> {title} </div>


                <div className={styles.fields_container}>
                    <div className={styles.field_container}>
                        <label htmlFor='username'>
                            <div>username</div>
                            <input
                                autoComplete='off'
                                id='username'
                                value={user.username}
                                onChange={onChange}
                                name='username'
                            />
                        </label>
                    </div>
                    <div className={styles.field_container}>
                        <label htmlFor='password'>
                            <div>password</div>
                            <input
                                type='password'
                                autoComplete='off'
                                id='password'
                                value={user.password}
                                onChange={onChange}
                                name='password'
                            />
                        </label>
                    </div>
                </div>
                <div className={styles.button_container}>
                    <Button color='blue' onClick={onClick}>
                        {type?.toUpperCase()}
                    </Button>
                </div>
            </div>
        </Modal>
    )
}

export default BaseModalWrapper;