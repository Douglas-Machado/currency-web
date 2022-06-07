import { createContext, useState, useContext} from "react";

const CurrencyContext = createContext({})

export interface ICurrencyType {
  from: string;
  setFrom: (from: string) => void;
  to: string;
  setTo: (from: string) => void;
}

export function CurrencyProvider({ children }: any) {
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')

  return(
    <CurrencyContext.Provider 
      value={{
        from,
        setFrom,
        to,
        setTo
      }}>
      {children}
    </CurrencyContext.Provider>
  )
}

export function useCurrency() {
  const context: any = useContext(CurrencyContext)
  const { from, setFrom, to, setTo } = context
  return { from, setFrom, to, setTo }
}