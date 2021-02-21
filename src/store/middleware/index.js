import { updateNote } from 'api/index';
import {
    SYNC_UPDATES_WITH_SERVER,
    SYNC_UPDATES_WITH_SERVER_IMMEDIATELY,
} from '../actions/data';

let saveTimer;
const debounceTime = 2000;

const sendNoteUpdates = (noteId, difference) => updateNote(noteId, difference);

const syncImmediately = ({ noteId, difference }) => {
    sendNoteUpdates(noteId, difference);
};

const syncWithDebounce = ({ noteId, difference }) => {
    if (saveTimer) {
        clearTimeout(saveTimer);
    }

    saveTimer = setTimeout(() => {
        sendNoteUpdates(noteId, difference);
    }, debounceTime);
};

export const dataSaverWithDebounce = () => (next) => (action) => {
    if (action.type === SYNC_UPDATES_WITH_SERVER) {
        syncWithDebounce(action.payload);
    }
    if (action.type === SYNC_UPDATES_WITH_SERVER_IMMEDIATELY) {
        syncImmediately(action.payload);
    }
    return next(action);
};
