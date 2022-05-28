import { FormEvent, useState } from "react"
import { api } from "../services/api"

export function Swap(){
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [amount, setAmount] = useState(0)
  const [conversionValue, setConversionValue] = useState('')

  async function submitValue(e: FormEvent){
    e.preventDefault()
    if(!from || !to) return setConversionValue("you must insert the currencies")
    try{
      const response = await api.post('swap', {
        from: from,
        to: to,
        amount: amount
      })
      setConversionValue(response.data.value)
    }catch(e: any){
      setConversionValue(e.response.data.error)
    }
  }

  return(
    <div 
    className="flex flex-col gap-3 items-center absolute top-2/4 left-2/4 -translate-y-[50%] -translate-x-[50%]"
  >
    <form 
      onSubmit={(e) => submitValue(e)}
      className="flex justify-between flex-col sm:flex-row gap-3">
      <div>
        <input
          placeholder="ex: usd"
          onChange={e => setFrom(e.target.value)}
          className="
            bg-[#205375] text-white h-12 text-center text-2xl flex-1
            sm:w-32
            placeholder-zinc-200 placeholder-opacity-60 
            focus:outline-none focus:outline-[#F66B0E] focus:outline-1
            drop-shadow-box rounded-md"
          maxLength={3}
        />
      </div>
      <div>
        <input
          placeholder="ex: eur"
          onChange={e => setTo(e.target.value)}
          className="
            bg-[#205375] text-white h-12 text-center text-2xl flex-1
            sm:w-32
            placeholder-zinc-200 placeholder-opacity-60
            focus:outline-none focus:outline-[#F66B0E] focus:outline-1 
            drop-shadow-box rounded-md"
          maxLength={3}
        />
      </div>
      <div>
      <input
        type="number"
        step="0.1"
        placeholder="amount"
        onChange={e => setAmount(Number(e.target.value))}
        className="
          bg-[#205375] text-white h-12 text-center text-2xl flex-1
          sm:w-32
          placeholder-zinc-200 placeholder-opacity-60 
          focus:outline-none focus:outline-[#F66B0E] focus:outline-1 
          drop-shadow-box rounded-md
        "
      />
    </div>
      <button 
        type="submit" 
        className="bg-[#112B3C] sm:w-32
          border-2 border-[#F66B0E] text-white rounded-md h-12 text-2xl drop-shadow-box">
        Submit
      </button>
    </form>
    <span
      className="text-2xl h-12 flex items-center justify-center
        sm:w-72 w-full break-words 
        bg-[#205375] text-white rounded-md drop-shadow-box
      "
    >
        {conversionValue ? conversionValue : "result will be shown here"}</span>
  </div>
  )
}