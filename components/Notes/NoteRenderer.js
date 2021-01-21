import styles from './NoteRenderer.module.scss';

const NoteRenderer = ({ note }) => (
  <div className={styles.noterenderer}>
    <h1>{note?.title}</h1>
    <p>
      {note?.description}
    </p>
  </div>
);

export default NoteRenderer;
