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

export function debounce<Params extends any[]>(
    func: (...args: Params) => any,
    timeout: number,
): (...args: Params) => void {
    let timer: NodeJS.Timeout;
    return (...args: Params) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func(...args);
        }, timeout);
    };
}
