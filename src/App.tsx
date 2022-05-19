import { FormEvent, useState } from "react"
import { api } from "./services/api"

function App() {
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [amount, setAmount] = useState(0)
  const [conversionValue, setConversionValue] = useState('')

  async function submitValue(e: FormEvent){
    e.preventDefault()
    if(!from || !to) return setConversionValue("you must insert the currencies")
    const response = await api.post('swap', {
      from: from,
      to: to,
      amount: amount
    })
    setConversionValue(response.data.value)
  }

  return (
    <div 
      className="flex flex-col gap-3 items-center absolute top-2/4 left-2/4 -translate-y-[50%] -translate-x-[50%]"
    >
      <form 
        onSubmit={(e) => submitValue(e)}
        className="flex justify-between gap-3">
        <div>
          <input
            placeholder="ex: usd"
            onChange={e => setFrom(e.target.value)}
            className="bg-[#205375] text-white w-40 h-12 text-center text-2xl rounded-md
            placeholder-zinc-200 placeholder-opacity-60 focus:outline-none focus:outline-[#F66B0E]"
            maxLength={3}
          />
        </div>
        <div>
          <input
            placeholder="ex: eur"
            onChange={e => setTo(e.target.value)}
            className="bg-[#205375] text-white w-40 h-12 text-center text-2xl rounded-md
            placeholder-zinc-200 placeholder-opacity-60 focus:outline-none focus:outline-[#F66B0E] align-middle"
            maxLength={3}
          />
        </div>
        <div>
        <input
          placeholder="amount"
          onChange={e => setAmount(Number(e.target.value))}
          className="bg-[#205375] text-white w-40 h-12 text-center text-2xl rounded-md
              placeholder-zinc-200 placeholder-opacity-60 focus:outline-none focus:outline-[#F66B0E]
            "
        />
      </div>
      <button 
        type="submit" 
        className="bg-[#F66B0E] text-white rounded-md w-40 h-12 text-2xl">Submit</button>
      </form>
      <span
        className="
          w-3/5 h-12 text-2xl text-center inline-block align-middle
          bg-[#205375] text-white rounded-md pt-1
        "
      >
          {conversionValue ? conversionValue : "result will be shown here"}</span>
    </div>
  )
}

export default App
