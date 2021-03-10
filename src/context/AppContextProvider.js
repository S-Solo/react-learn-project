import React, { useReducer } from 'react';
import { AppContext, initialState } from './AppContext';
import appReducer from './appReducer';

const AppContextProvider = ({ children }) => {
    // const [state, setState] = useState(initialState);
    const [state, dispatch] = useReducer(appReducer, initialState);

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;
