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
          className="absolute overflow-auto z-10 
            sm:right-0 sm:inset-auto inset-x-0 top-[100px] sm:top-16 max-h-[800px] sm:max-h-[800px]">
          {currenciesList.map(index => {
            return(
              <div key={index.id} className="bg-[#205375] sm:hover:bg-[#112B3C] flex items-center">
                <a className="text-white py-1 sm:py-2 px-2 max-w-[40px]">{index.id}</a>
                <a className="text-white py-1 sm:py-2 px-4 text-sm text-left">{index.currencyName}</a>
              </div>
            )
          })}
        </div>
      }
  </>
  )
}