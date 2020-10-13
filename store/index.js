import { useReducer, createContext, useContext } from 'react';

const initialState = {
  isLoggedIn: false,
  session: null,
};
const Store = createContext(initialState);

const { Provider } = Store;

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer((oldState, action) => {
    switch (action.type) {
      case 'login':
        return { ...oldState, isLoggedIn: true, session: action.payload };
      default:
        throw new Error('Unknown Action');
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export const useGlobalState = () => useContext(Store);
