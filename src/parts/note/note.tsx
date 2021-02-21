import React, { useCallback, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store/interfaces';
import Editor from './editor/editor';
import Heading from './heading/heading';
import styles from './note.module.scss';
import Tags from './tags/tags';

type RefType = { checkListToggle: () => void };

const Note = () => {
    const activeNoteId = useSelector((state: RootState) => state.data.activeNoteId);

    const editorRef = useRef<RefType>(null);
    const switchCheckListMode = useCallback(
        () => editorRef.current?.checkListToggle(),
        [],
    );

    return (
        <section className={styles.container}>
            {activeNoteId && (
                <>
                    <Heading handleCheckListModeBtnClick={switchCheckListMode} />
                    <Editor noteId={activeNoteId} ref={editorRef} />
                    <Tags noteId={activeNoteId} />
                </>
            )}
        </section>
    );
};

export default Note;
