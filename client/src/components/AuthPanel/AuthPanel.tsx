import React from 'react';
import Button from '../Button/Button';
import BaseModalWrapper from '../ModalPopup/BaseModalWrapper';
import styles from './AuthPanel.module.css';


const AuthPanel = () => {
    const [isModalVisible, setModalVisible] = React.useState<boolean>(false);
    const [modalType, setModalType] = React.useState<'register' | 'login' | null>(null);

    const toggleLoginModal = () => {
        setModalVisible(wasModalVisible => !wasModalVisible);
        setModalType('login');
    }

    const toggleRegisterModal = () => {
        setModalVisible(wasModalVisible => !wasModalVisible);
        setModalType('register');
    }

    return (
        <div className={styles.auth_panel_container}>
            <div className={styles.auth_panel_button_container}>
                <Button color='blue' onClick={toggleLoginModal}>
                    LOGIN
                </Button>
                <Button color='blue' onClick={toggleRegisterModal}>
                    REGISTER
                </Button>

                <BaseModalWrapper
                    isModalVisible={isModalVisible}
                    onBackdropClick={() => setModalVisible(false)}
                    type={modalType}
                />
            </div>

        </div>
    )
}

export default AuthPanel;