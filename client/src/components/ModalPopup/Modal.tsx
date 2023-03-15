import React from 'react';
import ReactDOM from 'react-dom';

const Modal: React.FC<ModalProps> = ({
    onBackdropClick,
    isModalVisible,
    type
}) => {
    if (!isModalVisible) return null;

    return ReactDOM.createPortal(
        <div onClick={onBackdropClick}>
            <span>I'm {type} a modal</span>
        </div>, document.getElementById('modal-root')!
    );
};

export default Modal;