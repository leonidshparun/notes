import React, { useCallback, useRef } from 'react';
import { useSelector } from 'react-redux';
import { activeNoteIdSelector, mediaTypeSelector } from 'store/selectors/index';
import Editor from './editor/editor';
import Heading from './heading/heading';
import styles from './note.module.scss';
import Tags from './tags/tags';

type RefType = { checkListToggle: () => void };

const Note = () => {
    const activeNoteId = useSelector(activeNoteIdSelector);
    const editorRef = useRef<RefType>(null);

    const switchLineMode = useCallback(() => editorRef.current?.checkListToggle(), []);

    const isDesktop = useSelector(mediaTypeSelector) === 'full';

    return (
        <section
            className={`
                ${styles.container} 
                ${!isDesktop ? styles.minified : ''}`}
        >
            {activeNoteId && (
                <>
                    <Heading handleCheckListModeBtnClick={switchLineMode} />
                    <Editor noteId={activeNoteId} ref={editorRef} />
                    <Tags noteId={activeNoteId} />
                </>
            )}
        </section>
    );
};

export default Note;
