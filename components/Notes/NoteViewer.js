import { useState } from 'react';
import NoteRenderer from './NoteRenderer';
import NotesSidebar from './NotesSidebar';
import ServerError from '../Misc/ServerError';
import styles from './NoteViewer.module.scss';

const NoteView = ({ notes, error }) => {
  const [selectedNote, setSelectedNote] = useState(notes.length ? notes[0] : null);
  return (
    <div className={styles.noteviewer}>
      {error ? (
        <ServerError error={error.message} />
      ) : (
        <>
          <NotesSidebar selectedId={selectedNote?.id} setSelected={setSelectedNote} notes={notes} />
          <NoteRenderer note={selectedNote} />
        </>
      )}
    </div>
  );
};

export default NoteView;
