import { ReactComponent as CloseIcon } from 'assets/clear.svg';
import { MODAL_COMPONENTS } from 'config/modals.config';
import React from 'react';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { hideModal } from 'store/actions/view';
import { modalStateSelector, themeSelector } from 'store/selectors/index';
import styles from './modal.module.scss';

export const Modal = () => {
    const { show, type } = useSelector(modalStateSelector);
    const dispatch = useDispatch();
    const theme = useSelector(themeSelector);

    if (!type) {
        return null;
    }
    const SpecificModal = MODAL_COMPONENTS[type];

    const modal = (
        <>
            <div onClick={() => dispatch(hideModal())} className={styles.backdrop} />
            <div className={styles.wrapper}>
                <div className={`${styles.modal} ${styles[theme]}`}>
                    <div className={styles.header}>
                        <h3>{SpecificModal.heading}</h3>
                        <button onClick={() => dispatch(hideModal())}>
                            <CloseIcon />
                        </button>
                    </div>
                    <div className={styles.content}>{SpecificModal.content}</div>
                </div>
            </div>
        </>
    );
    const anchor = document.getElementById('modal') || document.body;

    return show ? ReactDOM.createPortal(modal, anchor) : null;
};
