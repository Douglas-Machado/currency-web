import { Swap, CaretDown, CaretUp } from "phosphor-react";
import { useState } from "react";
import { api } from "../services/api";

export function Header(){
  const [isClicked, setIsClicked] = useState(false)
  const [currenciesList, setCurrenciesList] = useState({})

  async function getCurrenciesList() {
    const response = await api.get('currencies')
    console.log(Object.values(response.data))

    setCurrenciesList(response.data)
    if(isClicked === true) {
      setIsClicked(false)
    } else { setIsClicked(true)}


  }

  return(
    <div className="flex justify-between relative items-center bg-[#205375] p-2">
      <Swap width={48} height={48} color="white"/>

      <button 
        onClick={getCurrenciesList}
        className=" flex items-center text-xl text-white">
        Currencies
        {isClicked ? <CaretUp /> : <CaretDown /> }
      </button>

      <div 
        className="absolute min-w-[160px] overflow-auto z-10 right-0 top-16 max-h-screen">
        {Object.keys(currenciesList).map((key) => {
          return(
            <div className="bg-[#205375] hover:bg-opacity-70">
              <span className="text-white py-3 px-4 inline-block">{key}</span>
            </div>
          )
        })}
      </div>
        
    </div>
  )
}