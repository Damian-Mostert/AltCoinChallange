import { Chart } from 'react-google-charts';
import chartTypes from "../data/chart-types.json";
import type { ChartProps } from '../types/chart';
import { useWindow } from '../context/window';

export default function CryptoStatsChart({ data, chartType, setChartType }:ChartProps){
    const {width} = useWindow();
    const isMobile = width < 1000;

	return (
		<div className='w-100 h-100 d-flex flex-column'>
            <div className={`d-flex w-100 ${isMobile ? "flex-column-reverse gap-2":""}`}>
                <h2>{data.name}</h2>
                <div className={`w-100 d-flex ${isMobile?"justify-content-between":"justify-content-end"} align-items-center gap-2`}>
                    <b>Display</b>
                    <select value={chartType} onChange={(ev)=>setChartType(ev.target.value)}>
                        {chartTypes.map(val=>(<option value={val} key={val}>{val}</option>))}
                    </select>
                </div>
            </div>
            <h4>Quotes</h4>
            <div className='w-100 d-flex flex-column gap-2 pb-2'>
                {Object.keys(data.quote).map(key=>{
                    return <div className='bg-bg-fg border border-accent rounded-1 p-1' key={key}>
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
					[`Price (${Object.keys(data.quote)[0]})`,data.quote[Object.keys(data.quote)[0]].price],
					['% 90 days',data.quote[Object.keys(data.quote)[0]].percent_change_60d],
					['% 60 days',data.quote[Object.keys(data.quote)[0]].percent_change_60d],
					['% 30 days',data.quote[Object.keys(data.quote)[0]].percent_change_30d],
					['% 7 days',data.quote[Object.keys(data.quote)[0]].percent_change_7d],
					['% 24 days',data.quote[Object.keys(data.quote)[0]].percent_change_24h],
					['% 1 days',data.quote[Object.keys(data.quote)[0]].percent_change_1h],
				]}
                className='border border-accent rounded-1 overflow-hidden p-1 bg-white'
				options={{
					title: `${data.name} (${data.symbol}) Market Overview`,
					hAxis: {
						title: 'Value',
						minValue: 0,
					},
					vAxis: {
						title: 'Metric',
					},
					colors: ['#f6b55f'],
				}}
				/>
		</div>
	);
};
