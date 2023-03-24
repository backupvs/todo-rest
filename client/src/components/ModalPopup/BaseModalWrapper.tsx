import React from 'react';
import { UserDtoContext } from '../AuthPanel/AuthPanel';
import Button from '../Button/Button';
import Modal from './Modal';
import styles from './Modal.module.css';
import { FaQuestionCircle } from 'react-icons/fa';

interface BaseModalWrapperProps {
    title: string | null
    type: ModalType
    isModalVisible: boolean
    onBackdropClick: () => void
    registerHandler: (userDto: UserDto) => void
    loginHandler: (userDto: UserDto) => void,
    errorMsg: string | null,
    successMsg: string | null,
    isValidationError: boolean
}

const BaseModalWrapper: React.FC<BaseModalWrapperProps> = ({
    onBackdropClick,
    isModalVisible,
    type,
    title,
    registerHandler,
    loginHandler,
    errorMsg,
    successMsg,
    isValidationError
}) => {
    const { userDto, setUserDto } = React.useContext(UserDtoContext);
    if (!isModalVisible) return null;

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUserDto({ ...userDto, [name]: value });
    };

    const onClick = () => {
        if (type === 'Register') {
            registerHandler(userDto);
        }

        if (type === 'Login') {
            loginHandler(userDto);
        }
    }

    const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key !== 'Enter') return;

        if (type === 'Register') {
            registerHandler(userDto);
        }

        if (type === 'Login') {
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
                        {errorMsg || successMsg}
                        {isValidationError && (
                            <span className={styles.tooltip}>
                                <FaQuestionCircle size={16} />
                                <ul className={styles.tooltip_rules}>
                                    <li>Username must start with a letter</li>
                                    <li>Username length: 3-20</li>
                                    <li>Username must only contain a-Z, 0-9, '_'</li>
                                    <li>Username must end with a letter or number</li>
                                    <li>Password length: 8</li>
                                </ul>
                            </span>
                        )}
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