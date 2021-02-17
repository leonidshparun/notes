import firebase, { database } from 'api/index';
import {
    SYNC_UPDATES_WITH_SERVER,
    SYNC_UPDATES_WITH_SERVER_IMMEDIATELY
} from '../actions/data';

let saveTimer;
const debounceTime = 5000;

const sendNoteUpdates = (note, difference) => {
    const uid = firebase.auth().currentUser.uid;
    database.collection('users').doc(uid).collection('notes')
        .doc(note.id)
        .update({ ...difference })
        .then(() => {
            console.log('Document successfully updated!');
        })
        .catch((error) => {
            console.error('Error updating document: ', error);
        });
};

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
