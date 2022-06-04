import { CurrenciesList } from "./components/CurrenciesList"
import { Swap } from "./components/Swap"

import { CurrencyProvider } from "./context/Currency"

function App() {
  return (
    <CurrencyProvider>
      <div className="flex flex-col items-center">
        <CurrenciesList />
        <Swap/>
      </div>
    </CurrencyProvider>
  )
}

export default App
