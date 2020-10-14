import { useState } from 'react';
import dynamic from 'next/dynamic';
import styles from './NotesSidebar.module.scss';
import { useGlobalState } from '../../store';

const MediumAndDown = dynamic(import('../Utils/Queries').then((mod) => mod.MediumAndDown), { ssr: false });

const formatDate = (date) => new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(date));

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
                <span className={styles['sidebar-items-date']}>{formatDate(note.createdAt)}</span>
              </div>
              <p className={styles['sidebar-items-description']}>
                {note.description || 'No description provided...'}
              </p>
            </div>
          )) : (
            <div className={styles['sidebar-error']}>
              <button onClick={() => window.location.reload()} className={styles['sidebar-error-button']} type="button">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="1em" height="1em" viewBox="0 0 24 24"><path d="M23 12c0 1.042-.154 2.045-.425 3h-2.101c.335-.94.526-1.947.526-3 0-4.962-4.037-9-9-9-1.706 0-3.296.484-4.655 1.314l1.858 2.686h-6.994l2.152-7 1.849 2.673c1.684-1.049 3.659-1.673 5.79-1.673 6.074 0 11 4.925 11 11zm-6.354 7.692c-1.357.826-2.944 1.308-4.646 1.308-4.962 0-9-4.038-9-9 0-1.053.191-2.06.525-3h-2.1c-.271.955-.425 1.958-.425 3 0 6.075 4.925 11 11 11 2.127 0 4.099-.621 5.78-1.667l1.853 2.667 2.152-6.989h-6.994l1.855 2.681z" /></svg>
              </button>
              <span> Error while loading Notes </span>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default NotesSidebar;
