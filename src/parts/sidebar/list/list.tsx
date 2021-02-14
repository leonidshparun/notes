import { ReactComponent as PinIcon } from 'assets/pin.svg';
import React, { useEffect, useState } from 'react';
import styles from './list.module.scss';

const NOTES: any[] = [
    {
        text: 'Voluptate dolore incididunt quis incididunt aute et irure dolor tempor proident nisi sunt.',
        pinned: true,
        id: '0001',
    },
    {
        text: 'Non eu irure non tempor ex ullamco Lorem dolore ut id et non.',
        pinned: false,
        id: '0002',
    },
    {
        text: 'Et enim est occaecat elit consectetur esse.',
        pinned: true,
        id: '0003',
    },
    {
        text: `Laborum ea duis quis ullamco dolor mollit mollit laborum est dolore reprehenderit non.
            Commodo ad ex tempor consectetur. Mollit fugiat dolor exercitation Lorem et officia culpa cillum amet ipsum reprehenderit. 
            Culpa aliquip minim et Lorem dolor mollit amet incididunt amet laboris excepteur ipsum. 
            Elit in sint ex sint elit occaecat minim proident exercitation est sint sint minim. 
            Lorem tempor irure aliquip eu excepteur nostrud et.`,
        pinned: false,
        id: '0004',
    },
    {
        text: `In voluptate nostrud reprehenderit in nulla Lorem eiusmod eu cillum. 
      Aliquip nulla sunt esse tempor mollit exercitation exercitation minim esse deserunt. 
      Lorem eiusmod cillum adipisicing id ex ipsum labore esse pariatur officia duis minim eu dolore. 
      Elit minim sint in minim.`,
        pinned: false,
        id: '0005',
    },
    {
        text: `Anim voluptate dolore eiusmod magna exercitation. 
        Laborum incididunt ea ipsum ipsum laboris. 
        Cupidatat cupidatat excepteur nisi laboris sint nostrud velit ipsum sunt reprehenderit do aute ut aliquip. 
        Quis laboris nostrud officia non adipisicing duis aliqua tempor nisi velit.`,
        pinned: false,
        id: '0006',
    },
    {
        text: `In voluptate nostrud reprehenderit in nulla Lorem eiusmod eu cillum. 
      Aliquip nulla sunt esse tempor mollit exercitation exercitation minim esse deserunt. 
      Lorem eiusmod cillum adipisicing id ex ipsum labore esse pariatur officia duis minim eu dolore. 
      Elit minim sint in minim.`,
        pinned: true,
        id: '0007',
    },
    {
        text: `Anim voluptate dolore eiusmod magna exercitation. 
        Laborum incididunt ea ipsum ipsum laboris. 
        Cupidatat cupidatat excepteur nisi laboris sint nostrud velit ipsum sunt reprehenderit do aute ut aliquip. 
        Quis laboris nostrud officia non adipisicing duis aliqua tempor nisi velit.`,
        pinned: false,
        id: '0008',
    },
];

interface EnumNotesItem {
    text: string;
    pinned: boolean;
    id: string;
}

const asyncFetch = async (delay: number) => {
    const promise = await new Promise<Array<EnumNotesItem>>((resolve, reject) => {
        setTimeout(() => {
            // const isEven = Math.ceil(Math.random() * 10) % 2 === 0
            // if (isEven) {
            resolve(NOTES);
            // } else {
            // reject('Something went wrong')
            // }
        }, delay);
    });
    return promise;
};

const List = () => {
    const [activeNoteId, setActiveNoteId] = useState('');
    const [data, setData] = useState<Array<EnumNotesItem>>([]);
    const [isError, setError] = useState('');
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await asyncFetch(2000);
                setData(res);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>{isError}</p>;
    return (
        <ul className={styles.container}>
            {data
                .sort((note) => (note.pinned ? -1 : 1))
                .map((note, idx) => (
                    <li
                        key={idx}
                        className={`
                        ${styles.item} 
                        ${activeNoteId === note.id ? styles.active : ''}
                    `}
                        onClick={() => setActiveNoteId(note.id)}
                    >
                        <button
                            onClick={() => {
                                const updatedNote = { ...data[idx], pinned: !data[idx].pinned };
                                const updatedNotes = data.map((x, _idx) => (idx === _idx ? updatedNote : x));
                                setData(updatedNotes);
                                setActiveNoteId(note.id);
                            }}
                            className={note.pinned ? styles.pinned : ''}
                        >
                            <PinIcon />
                        </button>
                        <div className={styles.card}>
                            {note.text.split(/\r?\n/).map((line: string, idx: number) => (
                                <p key={idx}>{line}</p>
                            ))}
                        </div>
                    </li>
                ))}
        </ul>
    );
};

export default List;
