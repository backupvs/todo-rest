import React from 'react';
import styles from './Header.module.css';

interface HeaderProps {
    tasksCount: number,
}

const Header: React.FC<HeaderProps> = ({ tasksCount }) => {
    return (
        <div className={styles.header_title_container}>
            <div className={styles.header_title}>
                Todo list
            </div>
            <div className={styles.header_title}>
                Total: <b>{tasksCount}</b> task{tasksCount !== 1 && ('s')}
            </div>
        </div>
    )
};

export default Header;