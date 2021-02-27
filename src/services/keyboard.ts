import { UI } from 'config/keyboard.config';

interface IKeyboardConfig {
    [key: string]: () => void;
}

const useHotkeysOptions = { filterPreventDefault: false };

const keyboardActions: IKeyboardConfig = {};
const keyboardBindings: string[] = [];

Object.values(UI)
    .filter((action) => !action.local)
    .forEach((entry) => {
        const shortcut = entry.keyboardBinding;
        keyboardBindings.push(shortcut);
        keyboardActions[shortcut] = entry.action;
    });

const bindingsForamtted = keyboardBindings.join(',');

export { useHotkeysOptions, bindingsForamtted as keyboardBindings, keyboardActions };
