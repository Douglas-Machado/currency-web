import { AxiosResponse } from 'axios';
import { CaretDown, CaretUp } from 'phosphor-react'
import { useState, useEffect, ChangeEvent, ReactEventHandler} from "react";
import { api } from "../services/api";

import { useCurrency } from "../context/Currency"

interface ICurrency {
  id: string;
  currencyName: string;
}

interface ICurrenciesList extends Array<ICurrency>{}

export function CurrenciesList(){
  const [isClicked, setIsClicked] = useState(false)
  const [currenciesList, setCurrenciesList] = useState<ICurrenciesList>([])
  const [teste, setTeste] = useState('')
  const { from, setFrom, to, setTo } = useCurrency()

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

  function setCurrenciesOnClick(e: any){
    !from ? setFrom(e.id) : setTo(e.id)
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
          className="absolute z-10 left-0 right-0 sm:top-8 h-3/6 gap-1 cursor-pointer
          flex flex-col flex-wrap flex-1 bg-[#205375]">
          {currenciesList.map(index => {
            return(
              <div key={index.id} className="bg-[#205375] sm:hover:bg-[#112B3C] text-sm">
                <a 
                  id={index.id} 
                  onClick={(e: any) => setCurrenciesOnClick(e.target)} 
                  className="text-white py-1">
                    {index.id}
                </a>
                <a className="text-white py-1 sm:py-1 px-1 text-sm mr-1">{index.currencyName}</a>
              </div>
            )
          })}
        </div>
      }
  </>
  )
}