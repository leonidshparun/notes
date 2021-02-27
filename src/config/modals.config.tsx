import KeyboardModal from 'screens/modals/keyboard/keyboard';
import SettingsModal from 'screens/modals/settings/settings';

export const MODAL_COMPONENTS: {
    [key: string]: {
        content: JSX.Element;
        heading: string;
    };
} = {
    KEYBOARD: { content: <KeyboardModal />, heading: 'Keyboard shortcuts' },
    SETTINGS: { content: <SettingsModal />, heading: 'Settings' },
};
