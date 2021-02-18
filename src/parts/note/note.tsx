import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store/interfaces';
import Editor from './editor/editor';
import Heading from './heading/heading';
import styles from './note.module.scss';
import Tags from './tags/tags';

type RefType = { checkListToggle: () => void };

const Note = () => {
    const data = useSelector((state: RootState) => state.data.activeNote);
    const editorRef = useRef<RefType>();
    const switchLineCheckListMode = () => editorRef.current?.checkListToggle();

    return (
        <section className={styles.container}>
            {data && (
                <>
                    <Heading
                        handleCheckListModeBtnClick={switchLineCheckListMode}
                        noteId={data.id}
                    />
                    <Editor data={data.text} ref={editorRef} />
                    <Tags data={data.tags} noteId={data.id} />
                </>
            )}
        </section>
    );
};

export default Note;
