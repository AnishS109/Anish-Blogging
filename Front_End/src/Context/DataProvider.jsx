import { createContext, useState, useEffect } from "react";

export const DataContext = createContext(null);

const DataProvider = ({ children }) => {
  const [account, setAccount] = useState(() => {
    // Initialize `account` from localStorage
    const savedAccount = localStorage.getItem("account");
    return savedAccount ? JSON.parse(savedAccount) : { username: "", name: "" };
  });

  const [selected, setSelected] = useState();

  const [updatePostTitle, setUpdatePostTitle] = useState()

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Initialize `isAuthenticated` from localStorage
    return localStorage.getItem("isAuthenticated") === "true";
  });

  // Sync `account` with localStorage
  useEffect(() => {
    localStorage.setItem("account", JSON.stringify(account));
  }, [account]);

  // Sync `isAuthenticated` with localStorage
  useEffect(() => {
    localStorage.setItem("isAuthenticated", isAuthenticated);
  }, [isAuthenticated]);

  return (
    <DataContext.Provider
      value={{
        account,
        setAccount,
        isAuthenticated,
        setIsAuthenticated,
        selected,
        setSelected,
        updatePostTitle,
        setUpdatePostTitle
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
