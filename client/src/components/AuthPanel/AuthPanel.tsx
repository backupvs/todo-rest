import React from 'react';
import Button from '../Button/Button';
import BaseModalWrapper from '../ModalPopup/BaseModalWrapper';
import styles from './AuthPanel.module.css';
import { UserContext } from '../../App';
import { login, logout, register } from '../../api-methods';

const AuthPanel = () => {
    const [isModalVisible, setIsModalVisible] = React.useState<boolean>(false);
    const [modalType, setModalType] = React.useState<'Register' | 'Login' | null>(null);
    const { userId, setUserId } = React.useContext(UserContext);

    const toggleLoginModal = () => {
        setIsModalVisible(wasModalVisible => !wasModalVisible);
        setModalType('Login');
    }

    const toggleRegisterModal = () => {
        setIsModalVisible(wasModalVisible => !wasModalVisible);
        setModalType('Register');
    }

    const registerHandler = async (userDto: UserDto) => {
        register(userDto).then(user => {
            console.log('registered:', user);
            if (user) setIsModalVisible(false);
        });
    }

    const loginHandler = async (userDto: UserDto) => {
        login(userDto).then(user => {
            setUserId(user?._id || userId);
            console.log('user:', user);
            if (user) setIsModalVisible(false);
        });
    }

    const logoutHandler = async () => {
        logout().then(result => {
            console.log('result of logout:', result);
            setUserId('');
        })
    }

    return (
        <div className={styles.auth_panel_container}>

            {!userId && (
                <div className={styles.auth_panel_button_container}>
                    <Button color='blue' onClick={toggleLoginModal}>
                        LOGIN
                    </Button>
                    <Button color='blue' onClick={toggleRegisterModal}>
                        REGISTER
                    </Button>
                </div>
            )}

            {userId && (
                <div className={styles.auth_panel_button_container}>
                    <Button color='red' onClick={logoutHandler}>
                        LOGOUT
                    </Button>
                </div>
            )}
            <BaseModalWrapper
                title={modalType}
                isModalVisible={isModalVisible}
                onBackdropClick={() => setIsModalVisible(false)}
                type={modalType}
                registerHandler={registerHandler}
                loginHandler={loginHandler}
            />
        </div>
    )
}

export default AuthPanel;