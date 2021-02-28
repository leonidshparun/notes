import React from 'react';
import styles from './toggleButton.module.scss';

type ToggleButtonProps = { action: () => void; state: boolean };

const ToggleButton = ({ action, state }: ToggleButtonProps) => (
    <button
        onClick={action}
        className={`${styles.togglePinBtn} ${state ? styles.pinned : ''}`}
    />
);

export default ToggleButton;
