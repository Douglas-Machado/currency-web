import { Swap } from "phosphor-react";
import { CurrenciesList } from "./CurrenciesList";

export function Header(){
  return(
    <div className="flex justify-between relative items-center bg-[#205375] p-2">
      <Swap width={48} height={48} color="white" />
      <CurrenciesList/>
    </div>
  )
}