import { updateNote } from 'api/index';
import {
    SYNC_UPDATES_WITH_SERVER,
    SYNC_UPDATES_WITH_SERVER_IMMEDIATELY,
} from '../actions/data';

let saveTimer;
const debounceTime = 5000;

const sendNoteUpdates = (note, difference) => updateNote(note, difference);

const syncImmediately = ({ note, difference }) => {
    sendNoteUpdates(note, difference);
};

const syncWithDebounce = ({ note, difference }) => {
    if (saveTimer) {
        clearTimeout(saveTimer);
    }

    saveTimer = setTimeout(() => {
        sendNoteUpdates(note, difference);
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
