export const editorUtlits = {
    splitLineByLineBreaks: (line: string) => line.split(/\r?\n|\r/),
    isLineContainCheckbox: (line: string) => /☑|☐/.test(line),
    setCursorPosition: (
        inputRef: HTMLTextAreaElement | HTMLInputElement,
        position: number,
    ) => {
        inputRef.setSelectionRange(position, position);
    },
};
