import Head from 'next/head';
import { useGlobalState } from '../store';

export default function Home() {
  const { state } = useGlobalState();
  return (
    <div>
      <Head>
        <title>FBY Homepage</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      Hello
      {' '}
      {state.session && state.session.username ? state.session.username : 'World'}
    </div>
  );
}
