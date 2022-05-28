import { AxiosResponse } from 'axios';
import { CaretDown, CaretUp } from 'phosphor-react'
import { useState, useEffect, Key } from "react";
import { api } from "../../services/api";

interface ICurrency {
  id: string;
  currencyName: string;
}

interface ICurrenciesList extends Array<ICurrency>{}

export function CurrenciesList(){
  const [isClicked, setIsClicked] = useState(false)
  const [currenciesList, setCurrenciesList] = useState<ICurrenciesList>([])

  useEffect(() => {
    async function getCurrencies() {
      const response: AxiosResponse = await api.get('currencies')

      setCurrenciesList(Object.values(response.data.results))
    }
    getCurrencies();
  }, []) 

  function showCurrencies(){
    isClicked === true ? setIsClicked(false) : setIsClicked(true)
  }

  return(
    <>
      <button 
      onClick={showCurrencies}
      className=" flex items-center text-xl text-white">
      Currencies
      {isClicked ? <CaretUp /> : <CaretDown /> }
      </button>

      {!isClicked ? null : 
        <div 
          className="absolute min-w-[160px] overflow-auto z-10 right-0 top-16 max-h-[818px]">
          {currenciesList.map(index => {
            return(
              <div key={index.id} className="bg-[#205375] hover:bg-opacity-70 flex items-center max-w-[250px]">
                <span className="text-white py-2 px-2 inline-block max-w-[40px]">{index.id}</span>
                <span className="text-white py-2 px-4 inline-block text-sm text-left">{index.currencyName}</span>
              </div>
            )
          })}
        </div>
      }
  </>
  )
}