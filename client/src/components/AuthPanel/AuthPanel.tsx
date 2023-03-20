import React from 'react';
import Button from '../Button/Button';
import BaseModalWrapper from '../ModalPopup/BaseModalWrapper';
import styles from './AuthPanel.module.css';
import { AuthStatusContext } from '../../App';
import { login, logout, register } from '../../api-methods';

const DEFAULT_USER = { username: '', password: '' };
const initialUserDtoContext: UserDtoContextType = {
    userDto: DEFAULT_USER,
    setUserDto: () => {},
};

export const UserDtoContext = React.createContext<UserDtoContextType>(initialUserDtoContext);


const AuthPanel = () => {
    const [userDto, setUserDto] = React.useState<UserDto>(DEFAULT_USER);
    const [isModalVisible, setIsModalVisible] = React.useState<boolean>(false);
    const [modalType, setModalType] = React.useState<'Register' | 'Login' | null>(null);
    const [errorMsg, setErrorMsg] = React.useState<string | null>(null);
    const { user } = React.useContext(AuthStatusContext);

    const toggleLoginModal = () => {
        setIsModalVisible(wasModalVisible => !wasModalVisible);
        setModalType('Login');
    }

    const toggleRegisterModal = () => {
        setIsModalVisible(wasModalVisible => !wasModalVisible);
        setModalType('Register');
    }

    const registerHandler = async (userDto: UserDto) => {
        try {
            await register(userDto);
            setIsModalVisible(false);
            setErrorMsg(null);
            setUserDto(DEFAULT_USER);
        } catch (err) {
            setErrorMsg((err as Error).message);
        }
    }

    const loginHandler = async (userDto: UserDto) => {
        try {
            await login(userDto);
            setIsModalVisible(false);
            setErrorMsg(null);
            setUserDto(DEFAULT_USER);
            window.location.reload();
        } catch (err) {
            setErrorMsg((err as Error).message);
        }
    }

    const logoutHandler = async () => {
        await logout();
        window.location.reload();
    }

    return (
        <div>
            <UserDtoContext.Provider value={{ userDto, setUserDto }}>

                <div className={styles.auth_panel_container}>
                    {!user && (
                        <div className={styles.auth_panel_button_container}>
                            <Button color='blue' onClick={toggleLoginModal}>
                                LOGIN
                            </Button>
                            <Button color='blue' onClick={toggleRegisterModal}>
                                REGISTER
                            </Button>
                        </div>
                    )}

                    {user && (
                        <div className={styles.auth_panel_button_container}>
                            <div className={styles.greet_message}>Hi, {user.username}!</div>
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
                        errorMsg={errorMsg}
                    />
                </div >

            </UserDtoContext.Provider>
        </div>
    )
}

export default AuthPanel;