import { UI } from 'config/keyboard.config';
import React from 'react';
import { useHotkeys } from 'react-hotkeys-hook';

interface IKeyboardConfig {
    [key: string]: () => void;
}

const useHotkeysOptions = {
    filterPreventDefault: false,
};

const Keyboard = () => {
    const keyboardActions: IKeyboardConfig = {};
    const keyboardBindings: string[] = [];

    Object.values(UI)
        .filter((action) => !action.local)
        .forEach((entry) => {
            const shortcut = entry.keyboardBinding;
            keyboardBindings.push(shortcut);
            keyboardActions[shortcut] = entry.action;
        });

    useHotkeys(
        keyboardBindings.join(','),
        (e, handler) => keyboardActions[handler.key](),
        useHotkeysOptions,
    );
    return (
        <footer>
            <button onClick={UI.showShortcuts.action}>Keyboard Shortcuts</button>
        </footer>
    );
};

export default Keyboard;
