import { useState } from 'react';
import NoteRenderer from './NoteRenderer';
import NotesSidebar from './NotesSidebar';
import styles from './NoteViewer.module.scss';

const NoteView = ({ notes }) => {
  const [selectedNote, setSelectedNote] = useState(notes.length ? notes[0] : null);
  return (
    <div className={styles.noteviewer}>
      <NotesSidebar selectedId={selectedNote?.id} setSelected={setSelectedNote} notes={notes} />
      <NoteRenderer note={selectedNote} />
    </div>
  );
};

export default NoteView;
