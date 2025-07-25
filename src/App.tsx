import { useEffect, useState } from 'react'
import './lib/styles/App.css'
import currencyService from './lib/api/services/currency-service'


type Currency ={
  id: number,
  rank: number,
  name: string,
  symbol: string,
  slug: string,
  is_active: number,
  first_historical_data: string,
  last_historical_data: string,
  platform: null
};

function App() {

  const [data,setData] = useState(null)
  const [currency,setCurrency] = useState<string>("bitcoin")
  const [currencies,setCurrencies] = useState<Currency[]>([])

  useEffect(()=>{
    currencyService.getAll().then(res=>{
      setCurrencies(res.currencies)
    }).catch(error=>{
      console.error(error)
    })
  },[])

  useEffect(()=>{
    currencyService.getDetails(currency).then(res=>{
      setData(res.data)
    }).catch(error=>{
      console.error(error)
    })
  },[currency])

  return (
    <div className='d-flex w-100 h-100 align-items-center justify-content-center gap-4 p-4'>
        <div className='p-4 border border-accent bg-bg-fg rounded-4 w-100 h-100'>
          {data && <div>{JSON.stringify(data,null,4)}</div>}
        </div>
        <div className='w-25 border border-accent bg-bg-fg rounded-4 h-100 d-flex flex-column'>
          <div className='p-2 border-bottom border-accent text-center'>
            Currency's
          </div>
          <div className='p-2'>
            {currencies ? currencies.map((currency,key)=>(<div className='d-flex w-100 gap-1 pointer' onClick={()=>setCurrency(currency.slug)} key={key}>
              <div className='w-100'>{currency.name}</div> 
              <div className='text-uppercase w-100 text-align-right'>{currency.symbol}</div>
            </div>)):<></>}
          </div>
        </div>
    </div>
  )
}

export default App
