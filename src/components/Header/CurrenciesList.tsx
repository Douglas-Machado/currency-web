import { CaretDown, CaretUp } from 'phosphor-react'
import { useState } from "react";
import { api } from "../../services/api";

export function CurrenciesList(){
  const [isClicked, setIsClicked] = useState(false)
  const [currenciesList, setCurrenciesList] = useState({})

  async function getCurrenciesList() {
    const response = await api.get('currencies')

    setCurrenciesList(response.data.results)
    if(isClicked === true) {
      setIsClicked(false)
    } else { setIsClicked(true)}
  }

  return(
    <>
      <button 
      onClick={getCurrenciesList}
      className=" flex items-center text-xl text-white">
      Currencies
      {isClicked ? <CaretUp /> : <CaretDown /> }
      </button>

      {!isClicked ? null : 
        <div 
          className="absolute min-w-[160px] overflow-auto z-10 right-0 top-16 max-h-[818px]">
          {Object.entries(currenciesList).map(([key, value]) => {
            return(
              <div key={key} className="bg-[#205375] hover:bg-opacity-70 flex items-center max-w-[250px]">
                <span className="text-white py-2 px-2 inline-block max-w-[40px]">{key}</span>
                <span className="text-white py-2 px-4 inline-block text-sm text-left">{value.currencyName}</span>
              </div>
            )
          })}
        </div>
      }
  </>
  )
}