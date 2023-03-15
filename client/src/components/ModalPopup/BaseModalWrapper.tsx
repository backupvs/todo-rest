import React from 'react';
import Modal from './Modal';

const BaseModalWrapper: React.FC<BaseModalWrapperProps> = ({
    onBackdropClick,
    isModalVisible,
    type
}) => {
    if (!isModalVisible) return null;

    return (
        <Modal
            onBackdropClick={onBackdropClick}
            isModalVisible={isModalVisible}
            type={type}
        />
    )
}

export default BaseModalWrapper;