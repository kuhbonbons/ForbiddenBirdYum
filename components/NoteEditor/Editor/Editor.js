import { useState } from 'react';
import dynamic from 'next/dynamic';

import shortid from 'shortid';
import styles from './Editor.module.scss';
import Heading from './Heading';

const Section = dynamic(() => import('./Section'), { ssr: false });

function formatDate(dateObj) {
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(dateObj);
}

const formatedDate = formatDate(new Date()).split(' ');

export default function Editor() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [sections, setSections] = useState([{ id: shortid.generate(), keyword: '', content: '' }]);

  const handleAddSection = () => {
    const newSection = { id: shortid.generate(), keyword: '', content: '' };
    setSections(sections.concat(newSection));
  };

  const handleRemoveSection = (e) => {
    setSections(sections.slice(0, sections.length - 1));
  };

  // eslint-disable-next-line arrow-body-style
  const renderSections = () => sections.map((section) => {
    return (
      <Section
        key={section.id}
        id={section.id}
        handleRemove={handleRemoveSection}
      />
    );
  });

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
        { renderSections() }
        <div className="add-section">
          <button type="button" onClick={handleAddSection}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z" /></svg>
          </button>
        </div>
        <div className="remove-section">
          <button type="button" onClick={handleRemoveSection}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 10h24v4h-24z" /></svg>
          </button>
        </div>
      </section>
      <section className="note-summary">
        <div id="summary" className="editable" contentEditable />
      </section>
    </div>
  );
}
