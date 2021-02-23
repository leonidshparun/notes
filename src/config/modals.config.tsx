import KeyboardModal from 'screens/modals/keyboard/keyboard';

export const MODAL_COMPONENTS: {
    [key: string]: {
        content: JSX.Element;
        heading: string;
    };
} = {
    KEYBOARD: { content: <KeyboardModal />, heading: 'Keyboard shortcuts' },
    SETTINGS: { content: <p>SETTINGS MODAL</p>, heading: 'Settings' },
};
