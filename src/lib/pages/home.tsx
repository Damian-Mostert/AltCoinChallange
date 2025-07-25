import { useEffect, useState } from 'react'
import currencyService from '../../lib/api/services/currency-service'
import type { Currency } from '../types/currency'

export default function Home() {

  const [data,setData] = useState(null)
  const [currency,setCurrency] = useState<string|null>(null)
  const [currencies,setCurrencies] = useState<Currency[]|null>(null);
  const [loadingCurrencies,setLoadingCurrencies] = useState<boolean>(true);
  const [loadingData,setLoadingData] = useState<boolean>(true);

  useEffect(()=>{
    setLoadingCurrencies(true);
    currencyService.getAll().then(res=>{
      setCurrencies(res.currencies)
      setCurrency(res.currencies[0].slug)
    }).catch(error=>{
      console.error(error)
    }).finally(()=>{
        setLoadingCurrencies(false);
    })
  },[])

  useEffect(()=>{
    setLoadingData(true);
    if(!currency)return;
    currencyService.getDetails(currency).then(res=>{
      setData(res.data)
    }).catch(error=>{
      console.error(error)
    }).finally(()=>{
        setLoadingData(false)
    })
  },[currency])

  return (
    <div className='d-flex w-100 h-100 align-items-center justify-content-center gap-4 p-4'>
        <div className='p-4 border border-accent bg-bg-fg rounded-4 w-100 h-100'>
          {loadingData ? <div className='w-100 h-100 d-flex align-items-center justify-content-center'><div className='loader'/></div>:<>
              {data ? <div>{JSON.stringify(data,null,4)}</div> : <div className='w-100 h-100 d-flex align-items-center justify-content-center'>
                Could not load data    
            </div>}
          </>}
        </div>
        <div className='w-25 border border-accent bg-bg-fg flex-column rounded-4 h-100 d-flex p-4'>
        {currencies ? <>{currencies.map((currency,key)=>(<div className='d-flex w-100 gap-1 pointer p-1' onClick={()=>setCurrency(currency.slug)} key={key}>
            <div className='w-100'>{currency.name}</div> 
            <b className='text-uppercase w-100 text-align-right'>{currency.symbol}</b>
        </div>))}</>:<div className='w-100 h-100 d-flex align-items-center justify-content-center'>
            {loadingCurrencies ? <div className='loader'/>:<>
                Could not load currencies
            </>}
        </div>}
        </div>
    </div>
  )
}
