import { ReactComponent as CloseIcon } from 'assets/clear.svg';
import { MODAL_COMPONENTS } from 'config/modals.config';
import React from 'react';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { hideModal } from 'store/actions/view';
import { modalStateSelector } from 'store/selectors/index';
import styles from './modal.module.scss';

export const Modal = () => {
    const dispatch = useDispatch();

    const { show, type } = useSelector(modalStateSelector);
    if (!type) return null;

    const SelectedModal = MODAL_COMPONENTS[type];

    const modal = (
        <>
            <div onClick={() => dispatch(hideModal())} className={styles.backdrop} />
            <div className={styles.wrapper}>
                <div className={styles.modal}>
                    <div className={styles.header}>
                        <h3>{SelectedModal.heading}</h3>
                        <button onClick={() => dispatch(hideModal())}>
                            <CloseIcon />
                        </button>
                    </div>
                    <div className={styles.content}>{SelectedModal.content}</div>
                </div>
            </div>
        </>
    );
    const anchor = document.getElementById('modal') || document.body;

    return show ? ReactDOM.createPortal(modal, anchor) : null;
};
