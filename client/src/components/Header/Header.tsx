import React from 'react';
import styles from './Header.module.css';

interface HeaderProps {
    tasksCount: number
}

const Header: React.FC<HeaderProps> = ({ tasksCount }) => {
    return (
        <div className={styles.header_container}>
            <h1 className={styles.header_title}>
                Todo list <b>{tasksCount}</b> task(s)
            </h1>
        </div>
    )
}

export default Header;