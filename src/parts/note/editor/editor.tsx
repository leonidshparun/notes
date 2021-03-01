import { UI } from 'config/keyboard.config';
import React, {
    forwardRef,
    Ref,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { useDispatch, useSelector } from 'react-redux';
import { EditorUtils } from 'services/editor';
import { useDebounce } from 'services/hooks';
import { updateNoteText } from 'store/actions/data';
import { noteTextSelector } from 'store/selectors/index';
import styles from './editor.module.scss';

type NoteProps = { noteId: string };
type RefProp = Ref<{ checkListToggle: () => void }>;

const Editor = forwardRef<any, any>((props: NoteProps, ref: RefProp) => {
    const text = useSelector(noteTextSelector(props.noteId));
    const dispatch = useDispatch();
    const [noteInput, setNoteInput] = useState(text);
    const debouncedNoteInput = useDebounce(noteInput, 500);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    const passArguments = (
        fn: (
            input: HTMLTextAreaElement | null,
            text: string,
            setText: React.Dispatch<any>,
        ) => void,
    ) => fn(inputRef.current, noteInput, setNoteInput);

    useEffect(() => {
        setNoteInput(text);
    }, [text]);

    useEffect(() => {
        if (debouncedNoteInput) {
            dispatch(updateNoteText(debouncedNoteInput));
        }
    }, [debouncedNoteInput, dispatch]);

    useImperativeHandle(ref, () => ({
        checkListToggle: () => passArguments(EditorUtils.toggleLineIntoChecklistItem),
    }));

    useHotkeys(
        UI.insertChecklist.keyboardBinding,
        () => passArguments(EditorUtils.toggleLineIntoChecklistItem),
        { enableOnTags: ['TEXTAREA'] },
    );

    return (
        <section className={styles.textInput}>
            <textarea
                ref={inputRef}
                onClick={(e) => {
                    passArguments(EditorUtils.toggleCheckboxState);
                    e.preventDefault();
                }}
                onChange={(e) => setNoteInput(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        passArguments(EditorUtils.insertCheckBoxAtNewLine);
                    }
                }}
                value={noteInput}
            />
        </section>
    );
});

export default Editor;
