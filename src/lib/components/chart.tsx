import { Chart } from 'react-google-charts';
import chartTypes from "../data/chart-types.json";
import type { ChartProps } from '../types/chart';
import { useWindow } from '../context/window';

export default function CryptoStatsChart({ data,chartType,setChartType }:ChartProps){
    const {width} = useWindow();
    const isMobile = width < 1000;

	return (
		<div className='w-100 h-100 d-flex flex-column'>
            <div className={`d-flex w-100 ${isMobile ? "flex-column-reverse gap-2":""}`}>
                <h2>{data.name}</h2>
                <div className={`w-100 d-flex ${isMobile?"":"justify-content-end"} align-items-center gap-2`}>
                    <b>Display</b>
                    <select value={chartType} onChange={(ev)=>setChartType(ev.target.value)}>
                        {chartTypes.map(val=>(<option value={val} key={val}>{val}</option>))}
                    </select>
                </div>
            </div>
            <h4>Quotes</h4>
            <div className='w-100 d-flex flex-column gap-2 pb-2'>
                {Object.keys(data.quote).map(key=>{
                    return <div className='bg-bg border-accent rounded-1 p-1' key={key}>
                        <b>{key}</b>
                        <div>
                        Market cap: <b>{Math.round(data.quote[key].market_cap)} {key}</b>
                        </div>
                        <div>
                        Volume (last 24h): <b>{Math.round(data.quote[key].volume_24h)} {key}</b>
                        </div>
                    </div>                    
                })}
            </div>
			<Chart
				chartType={chartType}
				width="100%"
				height="100%"
				data={[
					['Metric', 'Value'],
					['Price (USD)',data.quote[Object.keys(data.quote)[0]].price],
					['% Change 90d',data.quote[Object.keys(data.quote)[0]].percent_change_60d],
					['% Change 60d',data.quote[Object.keys(data.quote)[0]].percent_change_60d],
					['% Change 30d',data.quote[Object.keys(data.quote)[0]].percent_change_30d],
					['% Change 7d',data.quote[Object.keys(data.quote)[0]].percent_change_7d],
					['% Change 24h',data.quote[Object.keys(data.quote)[0]].percent_change_24h],
					['% Change 1h',data.quote[Object.keys(data.quote)[0]].percent_change_1h],
				]}
				options={{
					title: `${data.name} (${data.symbol}) Market Overview`,
					hAxis: {
						title: 'Value',
						minValue: 0,
					},
					vAxis: {
						title: 'Metric',
					},
					colors: ['#ff4343'],
				}}
				/>
		</div>
	);
};
