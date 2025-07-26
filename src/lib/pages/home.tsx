import { useEffect, useState } from 'react'
import currencyService from '../../lib/api/services/currency-service'
import type { Currency } from '../types/currency'
import CryptoStatsChart from '../components/chart'
import chartTypes from "../data/chart-types.json";
import Button from '../components/button';

export default function Home() {

	const [data,setData] = useState<any>(null)
	const [currency,setCurrency] = useState<string|null>(null)
	const [currencies,setCurrencies] = useState<Currency[]|null>(null);
	const [loadingCurrencies,setLoadingCurrencies] = useState<boolean>(true);
	const [loadingData,setLoadingData] = useState<boolean>(true);
	const [chartType,setChartType] = useState<any>(localStorage.getItem("chart_type")??chartTypes[0]);
    const [page,setPage] = useState(1);
    const [perPage,setPerPage] = useState(10);
    const [pagination,setPagination] = useState({ perPage: "10", currentPage: "1", from: 0, to: 10});

    useEffect(()=>{
        localStorage.setItem("chart_type",chartType);
    },[chartType])

	useEffect(()=>{
		setLoadingCurrencies(true);
		setCurrencies(null);
		setData(null);
		setCurrency(null);
		currencyService.getAll(page,perPage).then(res=>{
			setCurrencies(res.currencies)
			setCurrency(res.currencies[0].slug)
            setPagination(res.pagination)
		}).catch(error=>{
			console.error(error)
		}).finally(()=>{
			setLoadingCurrencies(false);
		})
	},[page,perPage])

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

	const isActiveCurrency = (c:Currency)=>(c.slug == currency);

	return (
		<div className='d-flex  flex-column-reverse flex-md-row w-100 h-100 align-items-center justify-content-center gap-4 p-4'>
			<div className='p-4 border border-accent bg-bg-fg rounded-2 w-100 overflow-auto h-100'>
				{loadingData ? <div className='w-100 h-100 d-flex align-items-center justify-content-center'><div className='loader'/></div>:<>
					{data ? <>
						<CryptoStatsChart chartType={chartType} setChartType={setChartType} data={data[Object.keys(data)[0]]}/>
					</> : <div className='w-100 h-100 d-flex align-items-center justify-content-center'>
						Could not load data 
					</div>}
				</>}
			</div>
			<div className='w-25 w-md-100 border border-accent bg-bg-fg flex-column rounded-2 h-100 d-flex p-1'>
			{currencies ? <>
                <div className='w-100 p-1 border-bottom border-accent align-items-center d-flex justify-content-between'>
                    <b>Page {pagination?.currentPage}</b>
					<div className='ml-auto d-flex gap-1'>
						<select value={perPage} onChange={(ev)=>setPerPage(Number(ev.target.value))}>
							{Array.from({length:3}).map((_,index)=>(<option key={index} value={(index+1)*10}>
								{(index+1)*10}
							</option>))}
						</select>
						{Number(pagination?.currentPage) > 1 && <Button onClick={()=>setPage(p=>p-1)} label='Prev'/>}
						<Button onClick={()=>setPage(p=>p+1)} label='Next'/>
					</div>
                </div>
                <div className='d-flex flex-column w-100 h-100 overflow-auto gap-1 pt-1'>
                    {currencies.map((currency,key)=>(<div role='button' className={`${isActiveCurrency(currency)?"bg-accent":""} d-flex w-100 gap-1 pointer p-1 rounded-2`} onClick={()=>setCurrency(currency.slug)} key={key}>
                        <div className='w-100'>{currency.name}</div> 
                        <b className='text-uppercase w-100 text-align-right'>{currency.symbol}</b>
                    </div>))}
                </div>
            </>:<div className='w-100 h-100 d-flex align-items-center justify-content-center'>
				{loadingCurrencies ? <div className='loader'/>:<>
					Could not load currencies
				</>}
			</div>}
			</div>
		</div>
	)
}



