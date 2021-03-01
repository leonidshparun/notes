export const editHelpers = {
    splitLineByLineBreaks: (line: string) => line.split(/\r?\n|\r/),
    isLineContainCheckbox: (line: string) => /☑|☐/.test(line),
    setCursorPosition: (
        inputRef: HTMLTextAreaElement | HTMLInputElement,
        position: number,
    ) => {
        inputRef.setSelectionRange(position, position);
    },
};

type UtilAction = (
    input: HTMLTextAreaElement | null,
    text: string,
    setText: React.Dispatch<any>,
) => void;

interface IUTILS {
    toggleCheckboxState: UtilAction;
    insertCheckBoxAtNewLine: UtilAction;
    toggleLineIntoChecklistItem: UtilAction;
}

export const EditorUtils: IUTILS = {
    toggleCheckboxState(textarea, text, setText) {
        if (textarea) {
            if (window.getSelection()?.toString()) return;
            const cursorPosition = textarea.selectionStart;
            let selectionOffset = cursorPosition === 0 ? 0 : 1;
            const selectionSubstring: string[] = text
                .substr(cursorPosition - selectionOffset, selectionOffset + 1)
                .split('\n');
            const closetoSelection = selectionSubstring[selectionSubstring.length - 1];

            if (!editHelpers.isLineContainCheckbox(closetoSelection)) {
                return;
            }

            const lines = editHelpers.splitLineByLineBreaks(
                text.substr(0, cursorPosition + 1),
            );
            const linePosition = lines.length - 1;
            const selectedLine = lines[linePosition];

            const fullStringToArray = editHelpers.splitLineByLineBreaks(text);

            let replaced = '';
            if (/☑/.test(selectedLine)) {
                replaced = fullStringToArray[linePosition].replace('☑', '☐');
            } else {
                replaced = fullStringToArray[linePosition].replace('☐', '☑');
            }
            fullStringToArray[linePosition] = replaced;
            setText(fullStringToArray.join('\n'));
            textarea?.blur();
            setTimeout(() => {
                if (textarea) {
                    editHelpers.setCursorPosition(textarea, cursorPosition);
                    textarea?.focus();
                }
            }, 0);
        }
    },

    insertCheckBoxAtNewLine(textarea, text, setText) {
        if (textarea) {
            const cursorPosition = textarea?.selectionStart;
            const lines = editHelpers.splitLineByLineBreaks(
                text.substr(0, cursorPosition),
            );
            const linePosition = lines.length - 1;

            const selectedLine = lines[linePosition];
            if (editHelpers.isLineContainCheckbox(selectedLine)) {
                let updatedInput = '';
                let cursorOffset = 0;
                if (selectedLine === '☐ ') {
                    updatedInput =
                        text.slice(0, cursorPosition - 2) + text.slice(cursorPosition);
                    cursorOffset = -2;
                } else {
                    updatedInput =
                        text.slice(0, cursorPosition) +
                        '\n☐ ' +
                        text.slice(cursorPosition);
                    cursorOffset = 3;
                }
                setText(updatedInput);
                textarea?.blur();
                setTimeout(() => {
                    if (textarea) {
                        editHelpers.setCursorPosition(
                            textarea,
                            cursorPosition + cursorOffset,
                        );
                        textarea?.focus();
                    }
                }, 0);
            }
        }
    },

    toggleLineIntoChecklistItem(textarea, text, setText) {
        if (textarea) {
            const cursorPosition = textarea.selectionStart;
            const lines = editHelpers.splitLineByLineBreaks(
                text.substr(0, cursorPosition),
            );
            const cursorLinePosition = lines.length - 1;
            let cursorOffset = 0;
            const transformedText = editHelpers
                .splitLineByLineBreaks(text)
                .map((line, idx) => {
                    if (idx === cursorLinePosition) {
                        if (editHelpers.isLineContainCheckbox(line)) {
                            cursorOffset = -2;
                            return `${line.replace(/☑ |☐ /, '')}\n`;
                        }
                        cursorOffset = 2;
                        return `☐ ${line}\n`;
                    }
                    return `${line}\n`;
                })
                .join('')
                .replace(/\n+$/g, '');
            setText(transformedText);
            setTimeout(() => {
                if (textarea) {
                    editHelpers.setCursorPosition(
                        textarea,
                        cursorPosition + cursorOffset,
                    );
                    textarea?.focus();
                }
            }, 0);
        }
    },
};
