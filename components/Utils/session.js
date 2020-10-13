import { useEffect } from 'react';
import { useGlobalState } from '../../store';

const SessionMiddleware = ({ children, session }) => {
  const { dispatch } = useGlobalState();
  useEffect(() => {
    if (session) {
      dispatch({ type: 'login', payload: session });
    }
  }, [session]);
  return (
    <>
      {children}
    </>
  );
};

export default SessionMiddleware;
