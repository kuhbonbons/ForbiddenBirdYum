import Head from 'next/head';
import { NoteEditor, withAuth } from '../../components';

const Create = withAuth(() => (
  <div>
    <Head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>All Notes</title>
    </Head>
    <NoteEditor />
  </div>
));

export default Create;
