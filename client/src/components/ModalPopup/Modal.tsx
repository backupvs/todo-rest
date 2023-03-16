import React from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';

interface ModalProps {
    type: ModalType
    onBackdropClick: () => void
    children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({
    onBackdropClick,
    type,
    children
}) => {

    return ReactDOM.createPortal(
        <div className={styles.overlay} onClick={onBackdropClick}>
            <div onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>, document.getElementById('modal-root')!
    );
};

export default Modal;