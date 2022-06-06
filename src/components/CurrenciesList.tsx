import { AxiosResponse } from 'axios';
import { CaretDown, CaretUp } from 'phosphor-react'
import React, { useState, useEffect} from "react";
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
  const { from, setFrom, setTo } = useCurrency()

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

  function setCurrenciesOnClick(e: React.ChangeEvent<HTMLInputElement>){
    let currencyText: (string | null | undefined)  = e.target.id
    if(!currencyText) currencyText = e.target.firstChild?.firstChild?.nodeValue

    !from ? setFrom(currencyText) : setTo(currencyText)
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
          className="absolute z-10 left-0 right-0 sm:top-8 h-4/6 gap-1 cursor-pointer sm:max-w-screen
          flex flex-col flex-wrap flex-1 bg-[#205375]">
          {currenciesList.map(index => {
            return(
              <div 
                key={index.id} 
                className="bg-[#205375] hover:bg-[#112B3C] text-sm"
                onClick={(e: any) => setCurrenciesOnClick(e)} 
              >
                <a 
                  id={index.id} 
                  className="text-white py-1">
                    {index.id} | {index.currencyName}
                </a>
              </div>
            )
          })}
        </div>
      }
  </>
  )
}