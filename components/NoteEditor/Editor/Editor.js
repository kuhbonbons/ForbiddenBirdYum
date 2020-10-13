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
  const [summary, setSummary] = useState('');

  const handleAddSection = () => {
    const newSection = { id: shortid.generate(), keyword: '', content: '' };
    setSections([...sections, newSection]);
  };

  const handleRemoveSection = (e) => {
    const sectionId = e.currentTarget.dataset.target;

    if (sections.length === 1) return;

    if (sectionId) {
      setSections(sections.filter((section) => section.id !== sectionId));
    } else {
      setSections(sections.slice(0, sections.length - 1));
    }
  };

  const handleInput = (e) => {
    const { id } = e.currentTarget.parentElement.dataset;
    const key = (e.currentTarget.classList[0].match(/Editor_content.+/))
      ? 'content' : 'keyword';

    const updatedSections = sections.map((section) => {
      if (section.id === id) {
        const updated = {
          ...section,
          [key]: e.currentTarget.innerHTML,
        };

        return updated;
      }
      return section;
    });

    setSections(updatedSections);
  };

  const handleSummary = (e) => {
    setSummary(e.currentTarget.innerHTML);
  };

  const renderSections = () => sections.map((section) => (
    <Section
      key={section.id}
      id={section.id}
      handleInput={handleInput}
      handleRemove={handleRemoveSection}
    />
  ));

  return (
    <div className={styles.editor}>
      <header className={styles.header}>
        <div className={`${styles.headings} ${styles.wordbreak}`}>
          <Heading name="title" placeholder="Title" value={title} setValue={setTitle} />
          <Heading name="description" placeholder="Note description" value={description} setValue={setDescription} />
        </div>
        <div className={styles.date}>
          <span className={styles['note-month']}>{ formatedDate[0] }</span>
          <span className={styles['note-day']}>{ formatedDate[1] }</span>
        </div>
      </header>
      <section className={styles.body}>
        { renderSections() }
        <div className={styles['section-controls']}>
          <button type="button" className={styles.control} onClick={handleAddSection}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z" /></svg>
          </button>
          <button type="button" className={styles.control} onClick={handleRemoveSection}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 10h24v4h-24z" /></svg>
          </button>
        </div>
      </section>
      <section className="note-summary">
        <div className={styles.summary} onInput={handleSummary} contentEditable />
      </section>
    </div>
  );
}
