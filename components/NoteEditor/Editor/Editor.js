import { useState } from 'react';

import styles from './Editor.module.scss';
import Section from './Section';
import Heading from './Heading';

function formatDate(dateObj) {
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(dateObj);
}

export default function Editor() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const formatedDate = formatDate(new Date()).split(' ');

  return (
    <div className="editor">
      <header className={styles.header}>
        <div className={`${styles.headings} ${styles.wordbreak}`}>
          <Heading name="title" placeholder="Title" value={title} setValue={setTitle} />
          <Heading name="description" placeholder="Note description" value={description} setValue={setDescription} />
        </div>
        <div className={styles.date}>
          <span className="note-month">{ formatedDate[0] }</span>
          <span className="note-day">{ formatedDate[1] }</span>
        </div>
      </header>
      <section className="note-body">
        <Section />
        <div className="add-section">
          <button type="button">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z" /></svg>
          </button>
        </div>
      </section>
      <section className="note-summary">
        <div id="summary" className="editable" contentEditable />
      </section>
    </div>
  );
}
