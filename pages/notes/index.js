import { NoteViewer, withAuth } from '../../components';

const { NEXT_PUBLIC_API_URL } = process.env;

const Notes = withAuth(({ notes }) => (
  <NoteViewer notes={notes} />
));

Notes.getInitialProps = async (ctx) => {
  try {
    const response = await fetch(`${NEXT_PUBLIC_API_URL}/notes`, {
      credentials: 'include',
      mode: 'cors',
      headers: {
        Cookie: ctx.req.headers.cookie,
      },
    });

    if (!response.ok) {
      throw await response.json();
    }
    const { notes } = await response.json();
    return {
      notes,
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return {
      notes: [],
    };
  }
};

export default Notes;
