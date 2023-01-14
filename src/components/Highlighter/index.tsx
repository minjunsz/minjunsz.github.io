import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

export default function Highlighter({ children }): JSX.Element {
    return (
        <span className={clsx(styles.highlight)}>
            {children}
        </span>
    );
}