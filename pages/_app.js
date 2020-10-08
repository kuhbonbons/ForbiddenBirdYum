import '../styles/globals.scss';
import '../styles/_resets.scss';
import App from 'next/app';
import { parseCookies, setCookie } from 'nookies';
import fetch from 'isomorphic-fetch';
import jwt from 'jsonwebtoken';
import { SessionMiddleware } from '../components';
import { StoreProvider } from '../store';

const { NEXT_PUBLIC_API_URL } = process.env;

function MyApp({ Component, pageProps, session }) {
  return (
    <StoreProvider>
      <SessionMiddleware session={session}>
        <Component {...pageProps} />
      </SessionMiddleware>
    </StoreProvider>
  );
}

MyApp.getInitialProps = async (rootctx) => {
  const { ctx } = rootctx;
  const { at, rt } = parseCookies(ctx);
  let token = at;
  if (!token && rt) {
    try {
      const response = await fetch(`${NEXT_PUBLIC_API_URL}/refresh-token`, {
        headers: {
          Cookie: ctx.req.headers.cookie,
        },
        mode: 'cors',
        credentials: 'include',
      });
      token = (await response.json()).token;
      setCookie(ctx, 'at', token, {
        maxAge: 60 * 30,
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }

  const user = jwt.decode(token);
  const appProps = await App.getInitialProps(rootctx);
  if (user) {
    return {
      ...appProps,
      session: {
        id: user.id,
        email: user.email,
        username: user.username,
      },
    };
  }
  return { ...appProps };
};

export default MyApp;
