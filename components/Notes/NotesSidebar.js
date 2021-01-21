import { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import styles from './NotesSidebar.module.scss';
import { useGlobalState } from '../../store';
import { formatDate } from '../../utils/helpers';

const MediumAndDown = dynamic(import('../Utils/Queries').then((mod) => mod.MediumAndDown), { ssr: false });

const NotesSidebar = ({ notes, setSelected, selectedId }) => {
  const { state } = useGlobalState();
  const [open, toggleOpen] = useState(true);
  const handleMediaChange = (match) => {
    toggleOpen(!match);
  };
  return (
    <>
      {!open ? (
        <MediumAndDown callback={handleMediaChange}>
          <div className={styles['sidebar-toggle']}>
            <button className={styles['sidebar-toggle-button']} onClick={() => toggleOpen(!open)} type="button">
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 17h-12v-2h12v2zm0-4h-12v-2h12v2zm0-4h-12v-2h12v2z" /></svg>
            </button>
          </div>
        </MediumAndDown>
      ) : (
        <div className={styles.sidebar}>
          <div className={styles['sidebar-header']}>
            <h3>{`${state.session?.username}'s Notes`}</h3>
            <MediumAndDown callback={handleMediaChange}>
              <button className={styles['sidebar-close-button']} type="button" onClick={() => toggleOpen(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="1em" height="1em" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.151 17.943l-4.143-4.102-4.117 4.159-1.833-1.833 4.104-4.157-4.162-4.119 1.833-1.833 4.155 4.102 4.106-4.16 1.849 1.849-4.1 4.141 4.157 4.104-1.849 1.849z" /></svg>
              </button>
            </MediumAndDown>
          </div>
          {notes.length ? notes.map((note, index) => (
            <div
              tabIndex={index}
              role="menuitem"
              onKeyPress={() => {}}
              onClick={() => setSelected(note)}
              className={`${styles['sidebar-items']} ${selectedId === note.id ? styles['sidebar-items-selected'] : ''}`}
              key={note.id}
            >
              <div className={styles['sidebar-items-header']}>
                <h4 className={styles['sidebar-items-title']}>{note.title}</h4>
                <span className={styles['sidebar-items-date']}>
                  {formatDate(new Date(note.createdAt), {
                    format: { month: 'short', day: 'numeric', year: 'numeric' },
                  })}
                </span>
              </div>
              <p className={styles['sidebar-items-description']}>
                {note.description || 'No description provided...'}
              </p>
            </div>
          )) : (
            <div className={styles['sidebar-notfound']}>
              <span>
                {' '}
                No notes found,
                {' '}
                <Link href="/notes/create" shallow><span className={styles['sidebar-notfound-link']}>create</span></Link>
                {' '}
                a note to view it.
              </span>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default NotesSidebar;
