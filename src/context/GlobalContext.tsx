"use client";
import {
  useReducer,
  useContext,
  createContext,
  Dispatch,
  useEffect,
} from "react";

type TState = {
  langCode: string;
};

const initialState: TState = {
  langCode: "",
};

const reducer = (state: TState, action: any) => {
  switch (action.type) {
    case "SET_LANG_CODE":
      localStorage.setItem("sifmax-lang-code", action.payload);
      return { ...state, langCode: action.payload };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};
const GlobalStateContext = createContext(initialState);
const GlobalDispatchContext = createContext({} as Dispatch<any>);

export const GlobalProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    const savedLangCode = localStorage.getItem("sifmax-lang-code");
    if (savedLangCode) {
      dispatch({ type: "SET_LANG_CODE", payload: savedLangCode });
    }
  }, []);
  return (
    <GlobalDispatchContext.Provider value={dispatch}>
      <GlobalStateContext.Provider value={state}>
        {children}
      </GlobalStateContext.Provider>
    </GlobalDispatchContext.Provider>
  );
};

export const useAppContext = () => useContext(GlobalStateContext);
export const useAppDispatch = () => useContext(GlobalDispatchContext);
