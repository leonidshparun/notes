export const MODAL_COMPONENTS: {
    [key: string]: {
        content: JSX.Element;
        heading: string;
    };
} = {
    KEYBOARD: { content: <p>KEYBOARD SHORTCUTS MODAL</p>, heading: 'Keyboard shortcuts' },
    SETTINGS: { content: <p>SETTINGS MODAL</p>, heading: 'Settings' },
};
