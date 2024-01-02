import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [paymentDetails, setPaymentDetails] = useState(null);

  return (
    <AppContext.Provider value={{  paymentDetails, setPaymentDetails }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
