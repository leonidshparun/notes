import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useDebounce } from 'services/hooks';
import { editorUtlits as editor } from 'services/utils';
import { updateNoteText } from 'store/actions/data';
import { EnumNotesItem } from 'store/interfaces';
import Heading from './heading/heading';
import styles from './note.module.scss';

type NoteProps = { data: EnumNotesItem[]; noteId: string };

const Note = ({ data, noteId }: NoteProps) => {
    const dispatch = useDispatch();
    const [noteInput, setNoteInput] = useState('');
    const debouncedNoteInput = useDebounce(noteInput, 500);

    const inputRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (debouncedNoteInput) {
            dispatch(updateNoteText(debouncedNoteInput));
        }
    }, [debouncedNoteInput, dispatch]);

    useEffect(() => {
        const activeNote = data.find((note: EnumNotesItem) => note.id === noteId);
        const text = activeNote ? activeNote.text : '';
        setNoteInput(text);
        inputRef.current?.focus();
    }, [data, noteId]);

    const toggleLineIntoChecklistItem = () => {
        if (inputRef.current) {
            const cursorPosition = inputRef.current.selectionStart;
            const lines = editor.splitLineByLineBreaks(
                noteInput.substr(0, cursorPosition),
            );
            const cursorLinePosition = lines.length - 1;
            let cursorOffset = 0;
            const transformedText = editor
                .splitLineByLineBreaks(noteInput)
                .map((line, idx) => {
                    if (idx === cursorLinePosition) {
                        if (editor.isLineContainCheckbox(line)) {
                            cursorOffset = -2;
                            return `${line.replace(/☑ |☐ /, '')}\n`;
                        }
                        cursorOffset = 2;
                        return `☐ ${line}\n`;
                    }
                    return `${line}\n`;
                })
                .join('');
            setNoteInput(transformedText);
            setTimeout(() => {
                if (inputRef.current) {
                    editor.setCursorPosition(
                        inputRef.current,
                        cursorPosition + cursorOffset,
                    );
                }
            }, 0);
        }
    };

    const toggleCheckboxState = () => {
        if (inputRef.current) {
            if (window.getSelection()?.toString()) return;
            const cursorPosition = inputRef.current.selectionStart;
            let selectionRange = cursorPosition >= 2 ? 2 : 1;

            const closetoSelection = noteInput.substr(
                cursorPosition - selectionRange,
                selectionRange,
            );
            console.log(closetoSelection);
            if (!editor.isLineContainCheckbox(closetoSelection)) {
                return;
            }

            const lines = editor.splitLineByLineBreaks(
                noteInput.substr(0, cursorPosition),
            );
            const linePosition = lines.length - 1;
            const selectedLine = lines[linePosition];

            const fullStringToArray = editor.splitLineByLineBreaks(noteInput);
            let replaced = '';
            if (/☑/.test(selectedLine)) {
                replaced = fullStringToArray[linePosition].replace('☑', '☐');
            } else {
                replaced = fullStringToArray[linePosition].replace('☐', '☑');
            }
            fullStringToArray[linePosition] = replaced;
            setNoteInput(fullStringToArray.join('\n'));
            inputRef.current?.blur();
            setTimeout(() => {
                if (inputRef.current) {
                    editor.setCursorPosition(inputRef.current, cursorPosition);
                }
            }, 0);
        }
    };

    const insertCheckBoxAtNewLine = () => {
        if (inputRef.current) {
            const cursorPosition = inputRef.current?.selectionStart;
            const lines = editor.splitLineByLineBreaks(
                noteInput.substr(0, cursorPosition),
            );
            const linePosition = lines.length - 1;

            const selectedLine = lines[linePosition];
            if (/☑|☐/.test(selectedLine)) {
                let updatedInput = '';
                let cursorOffset = 0;
                if (selectedLine === '☐ ') {
                    updatedInput =
                        noteInput.slice(0, cursorPosition - 2) +
                        noteInput.slice(cursorPosition);
                    cursorOffset = -2;
                } else {
                    updatedInput =
                        noteInput.slice(0, cursorPosition) +
                        '\n☐ ' +
                        noteInput.slice(cursorPosition);
                    cursorOffset = 3;
                }
                setNoteInput(updatedInput);
                inputRef.current?.blur();
                setTimeout(() => {
                    if (inputRef.current) {
                        editor.setCursorPosition(
                            inputRef.current,
                            cursorPosition + cursorOffset,
                        );
                    }
                }, 0);
            }
        }
    };

    return (
        <section className={styles.container}>
            {noteId ? <>
            <Heading handleCheckListModeBtnClick={toggleLineIntoChecklistItem} />

            <section className={styles.textInput}>
                <textarea
                    ref={inputRef}
                    className={styles.input}
                    onClick={(e) => {
                        toggleCheckboxState();
                        e.preventDefault();
                    }}
                    onChange={(e) => setNoteInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            insertCheckBoxAtNewLine();
                        }
                    }}
                    value={noteInput}
                />
            </section>

            <footer>Add a tag...</footer> </>
            : ''}
        </section>
    );
};

export default Note;
