import React from 'react';
import { UserDtoContext } from '../AuthPanel/AuthPanel';
import Button from '../Button/Button';
import Modal from './Modal';
import styles from './Modal.module.css';

interface BaseModalWrapperProps {
    title: string | null
    type: ModalType
    isModalVisible: boolean
    onBackdropClick: () => void
    registerHandler: (userDto: UserDto) => void
    loginHandler: (userDto: UserDto) => void,
    errorMsg: string | null,
    successMsg: string | null
}

const BaseModalWrapper: React.FC<BaseModalWrapperProps> = ({
    onBackdropClick,
    isModalVisible,
    type,
    title,
    registerHandler,
    loginHandler,
    errorMsg,
    successMsg
}) => {
    const { userDto, setUserDto } = React.useContext(UserDtoContext);
    const [validationError, setValidationError] = React.useState('');
    if (!isModalVisible) return null;

    const handleValidation = () => {
        if (!userDto.username) {
            setValidationError('username is required');
            return false;
        }

        if (!userDto.password) {
            setValidationError('password is required');
            return false;
        }

        if (userDto.password.length < 8 && type === 'Register') {
            setValidationError('password should contain at least 8 characters');
            return false;
        }

        setValidationError('');
        return true;
    };

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUserDto({ ...userDto, [name]: value });
    };

    const onClick = () => {
        const isValid = handleValidation();

        if (type === 'Register' && isValid) {
            registerHandler(userDto);
        }

        if (type === 'Login' && isValid) {
            loginHandler(userDto);
        }
    }

    const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key !== 'Enter') return;
        const isValid = handleValidation();

        if (type === 'Register' && isValid) {
            registerHandler(userDto);
        }

        if (type === 'Login' && isValid) {
            loginHandler(userDto);
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
                                value={userDto.username}
                                onChange={onChange}
                                name='username'
                                onKeyDown={(event) => onKeyDown(event)}
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
                                value={userDto.password}
                                onChange={onChange}
                                name='password'
                                onKeyDown={(event) => onKeyDown(event)}
                            />
                        </label>
                    </div>
                </div>

                <div className={styles.button_container}>

                    <div className={successMsg ? styles.success_message : styles.error_message}>
                        {validationError || errorMsg || successMsg}
                    </div>

                    <Button color='blue' onClick={onClick}>
                        {type?.toUpperCase()}
                    </Button>
                </div>
            </div>
        </Modal >
    )
}

export default BaseModalWrapper;