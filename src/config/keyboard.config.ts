import { createNewNote, sendNoteToTrash } from 'store/actions/data';
import {
    changeRoute,
    showModal,
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

export const UI: IUIDictionary = {
    toggleNav: {
        title: 'Menu',
        description: 'Toggle navigation and tag list',
        action: () => store.dispatch(toggleNavigationVisibility()),
        keyboardBinding: 'ctrl+alt+m',
        local: false,
    },
    toggleSidebar: {
        title: 'Toggle Sidebar',
        description: 'Toggle focus mode',
        action: () => store.dispatch(toggleSidebarVisibility()),
        keyboardBinding: 'ctrl+alt+f',
        local: false,
    },
    newNote: {
        title: 'New Note',
        description: 'Create new note',
        action: () => {
            store.dispatch(changeRoute('all'));
            store.dispatch(createNewNote());
        },
        keyboardBinding: 'ctrl+alt+n',
        local: false,
    },
    insertChecklist: {
        title: 'Insert Checklist',
        description: 'Insert checklist item',
        action: () => null,
        keyboardBinding: 'ctrl+alt+c',
        local: true,
    },
    inTrash: {
        title: 'Trash',
        description: 'Put note to the trash',
        action: () => store.dispatch(sendNoteToTrash()),
        keyboardBinding: 'ctrl+alt+d',
        local: false,
    },
    showShortcuts: {
        title: 'Keyboard shortcuts',
        description: 'Show keyboard shortcuts',
        action: () => store.dispatch(showModal('KEYBOARD')),
        keyboardBinding: 'ctrl+alt+/',
        local: false,
    },
    showSettings: {
        title: 'Settings',
        description: 'Show app settings',
        action: () => store.dispatch(showModal('SETTINGS')),
        keyboardBinding: 'ctrl+alt+s',
        local: false,
    },
};

export const ShortcutsBySections = {
    view: ['toggleNav', 'toggleSidebar'],
    'note editing': ['newNote', 'insertChecklist', 'inTrash'],
    app: ['showSettings', 'showShortcuts'],
};
