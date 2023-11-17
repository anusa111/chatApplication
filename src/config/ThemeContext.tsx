import React, {
  createContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
interface IValue {
  dark?: boolean;
  handleTheme: () => void;
}

const defaultValue: IValue = {
  handleTheme: () => {},
  dark: false,
};
export const Theme = createContext<IValue>(defaultValue);

export const ThemeProvider = ({ children }: any) => {
  const storedTheme = localStorage.getItem("dark");
  const initialTheme = storedTheme ? JSON.parse(storedTheme) : false;
  console.log(initialTheme);
  const [dark, setDark] = useState<boolean>(initialTheme);

  useLayoutEffect(() => {
    localStorage.setItem("dark", JSON.stringify(dark));
  }, [dark]);

  const handleTheme = () => {
    setDark(!dark);
  };
  return (
    <Theme.Provider value={{ dark, handleTheme }}>{children}</Theme.Provider>
  );
};
