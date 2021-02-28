import { createNewNote, sendNoteToTrash } from 'store/actions/data';
import {
    changeRoute,
    showModal,
    toggleInfoBlockVisibility,
    toggleNavigationVisibility,
    toggleSidebarVisibility,
} from 'store/actions/view';
import store from 'store/index';

interface IUIItem {
    title: string;
    description: string;
    action: () => void;
    keyboardBinding: string;
    local: boolean;
}

interface IUIDictionary {
    [key: string]: IUIItem;
}

export const buildTip = ({ title, keyboardBinding }: IUIItem) => {
    return `${title} · ${keyboardBinding}`;
};

export const UI: IUIDictionary = {
    toggleNav: {
        title: 'Menu',
        description: 'Toggle navigation and tag list',
        action: () => store.dispatch(toggleNavigationVisibility()),
        keyboardBinding: 'Ctrl+Alt+M',
        local: false,
    },
    toggleSidebar: {
        title: 'Toggle Sidebar',
        description: 'Toggle focus mode',
        action: () => store.dispatch(toggleSidebarVisibility()),
        keyboardBinding: 'Ctrl+Alt+F',
        local: false,
    },
    newNote: {
        title: 'New Note',
        description: 'Create new note',
        action: () => {
            store.dispatch(changeRoute('all'));
            store.dispatch(createNewNote());
        },
        keyboardBinding: 'Ctrl+Alt+N',
        local: false,
    },
    insertChecklist: {
        title: 'Insert Checklist',
        description: 'Insert checklist item',
        action: () => null,
        keyboardBinding: 'Ctrl+Alt+C',
        local: true,
    },
    inTrash: {
        title: 'Trash',
        description: 'Put note to the trash',
        action: () => store.dispatch(sendNoteToTrash()),
        keyboardBinding: 'Ctrl+Alt+D',
        local: false,
    },
    showShortcuts: {
        title: 'Keyboard shortcuts',
        description: 'Show keyboard shortcuts',
        action: () => store.dispatch(showModal('KEYBOARD')),
        keyboardBinding: 'Ctrl+Alt+/',
        local: false,
    },
    showSettings: {
        title: 'Settings',
        description: 'Show app settings',
        action: () => store.dispatch(showModal('SETTINGS')),
        keyboardBinding: 'Ctrl+Alt+S',
        local: false,
    },
    NoteInfo: {
        title: 'Note Info',
        description: 'Show note information',
        action: () => store.dispatch(toggleInfoBlockVisibility()),
        keyboardBinding: 'Ctrl+Alt+I',
        local: false,
    },
};

export const ShortcutsBySections = {
    view: ['toggleNav', 'toggleSidebar'],
    'note editing': ['newNote', 'insertChecklist', 'inTrash'],
    app: ['showSettings', 'showShortcuts'],
};
