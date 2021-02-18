import firebase from 'firebase';

const config = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    databaseURL: process.env.REACT_APP_DB,
    projectId: process.env.REACT_APP_PID,
    storageBucket: process.env.REACT_APP_SB,
    messagingSenderId: process.env.REACT_APP_SID,
    appId: process.env.REACT_APP_APPID,
};

firebase.initializeApp(config);

export const database = firebase.firestore();

const getNotesCollectionRef = () => {
    const uid = firebase.auth().currentUser.uid;
    return database.collection('users').doc(uid).collection('notes');
};

const getNoteRef = (id) => getNotesCollectionRef().doc(id);

export const updateNote = (note, difference) =>
    getNoteRef(note.id)
        .update({
            ...difference,
            lastUpdate: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(() => console.log('Document successfully updated!'))
        .catch((error) => console.error('Error updating document: ', error));

export const createNote = (onSuccess) => {
    const uid = firebase.auth().currentUser.uid;
    const newNote = {
        text: '',
        pinned: false,
        trash: false,
        author: uid,
        tags: [],
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    };
    getNotesCollectionRef()
        .add(newNote)
        .then((docRef) => onSuccess(docRef, newNote))
        .catch((error) => console.error('Error adding document: ', error));
};

export const fetchNotes = async () => {
    const notes = [];
    await getNotesCollectionRef()
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const { text, pinned, trash, createdAt, lastUpdate, tags } = doc.data();
                notes.push({
                    tags,
                    createdAt,
                    lastUpdate,
                    text,
                    pinned,
                    trash,
                    id: doc.id,
                });
            });
        })
        .catch((error) => console.log(error)); // не ловит!!!
    return notes;
};

export const deleteNote = (noteId, onSuccess) =>
    getNoteRef(noteId)
        .delete()
        .then((docRef) => onSuccess(docRef))
        .catch((error) => console.error('Error adding document: ', error));

export const addNoteTag = (noteId, tag, onSuccess) =>
    getNoteRef(noteId)
        .update({
            tags: firebase.firestore.FieldValue.arrayUnion(tag),
            lastUpdate: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then((docRef) => onSuccess(docRef))
        .catch((error) => console.error('Error updating document: ', error));

export const removeNoteTag = (noteId, tag, onSuccess) =>
    getNoteRef(noteId)
        .update({
            tags: firebase.firestore.FieldValue.arrayRemove(tag),
            lastUpdate: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then((docRef) => onSuccess(docRef))
        .catch((error) => console.error('Error updating document: ', error));

export default firebase;
