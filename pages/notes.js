import Head from 'next/head';
import { NoteEditor } from '../components';
import withAuth from '../components/Utils/auth';

const Notes = withAuth(() => (
  <div>
    <Head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>All Notes</title>
    </Head>
    <NoteEditor />
  </div>
));

export default Notes;
