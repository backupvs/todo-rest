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
        <div className={styles.overlay} onMouseDown={onBackdropClick}>
            <div onMouseDown={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>, document.getElementById('modal-root')!
    );
};

export default Modal;