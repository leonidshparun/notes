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

export const usersRef = database.collection('users');
export const notesRef = database.collection('notes');

export const updateNote = (note, difference) => {
    const uid = firebase.auth().currentUser.uid;
    database
        .collection('users')
        .doc(uid)
        .collection('notes')
        .doc(note.id)
        .update({
            ...difference,
            lastUpdate: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {
            console.log('Document successfully updated!');
        })
        .catch((error) => {
            console.error('Error updating document: ', error);
        });
};

export const createNote = (onSuccess) => {
    const uid = firebase.auth().currentUser.uid;
    const newNote = {
        text: '',
        pinned: false,
        trash: false,
        author: uid,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    };
    database
        .collection('users')
        .doc(uid)
        .collection('notes')
        .add(newNote)
        .then((docRef) => onSuccess(docRef, newNote))
        .catch((error) => {
            console.error('Error adding document: ', error);
        });
};

export const fetchNotes = async () => {
    const uid = firebase.auth().currentUser.uid;
    const notes = [];
    await database
    .collection('users')
    .doc(uid)
    .collection('notes')
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const { text, pinned, trash, createdAt, lastUpdate } = doc.data();
            notes.push({ createdAt, lastUpdate, text, pinned, trash, id: doc.id });
        });
    })
    .catch(error => {
        console.log(error) // не ловит!!!
    });
    return notes
}


export default firebase;
