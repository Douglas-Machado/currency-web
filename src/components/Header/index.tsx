import { Swap } from "phosphor-react";
import { CurrenciesList } from "./CurrenciesList";

export function Header(){
  return(
    <div className="flex flex-col sm:flex-row justify-between relative items-center bg-[#205375] p-2">
      <Swap width={48} height={48} color="white" className="mb-2 sm:mb-0" />
      <CurrenciesList/>
    </div>
  )
}