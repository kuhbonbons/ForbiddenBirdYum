import Head from 'next/head';
import { NoteEditor } from '../components';

export default function Notes() {
  return (
    <div>
      <Head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>All Notes</title>
      </Head>
      <NoteEditor />
    </div>
  );
}
