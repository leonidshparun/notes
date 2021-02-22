import { MODAL_COMPONENTS } from 'config/modals.config';
import React from 'react';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { hideModal } from 'store/actions/view';
import { modalStateSelector } from 'store/selectors/index';
import styles from './modal.module.scss';

export const Modal = () => {
    const { show, type } = useSelector(modalStateSelector);
    const dispatch = useDispatch();

    if (!type) {
        return null;
    }
    const SpecificModal = MODAL_COMPONENTS[type];

    const modal = (
        <>
            <div onClick={() => dispatch(hideModal())} className={styles.backdrop} />
            <div className={styles.wrapper}>
                <div className={styles.modal}>
                    <div className={styles.header}>
                        <p>{SpecificModal.heading}</p>
                        <button onClick={() => dispatch(hideModal())}>X</button>
                    </div>
                    <div className={styles.content}>{SpecificModal.content}</div>
                </div>
            </div>
        </>
    );
    const anchor = document.getElementById('modal') || document.body;

    return show ? ReactDOM.createPortal(modal, anchor) : null;
};
