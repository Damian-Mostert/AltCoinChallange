import { Chart } from 'react-google-charts';
import chartTypes from "../data/chart-types.json";
import type { ChartProps } from '../types/chart';

export default function CryptoStatsChart({ data,chartType,setChartType }:ChartProps){

	return (
		<div className='w-100 h-100 d-flex flex-column'>
			<div className='w-100 d-flex justify-content-end'>
				<select value={chartType} onChange={(ev)=>setChartType(ev.target.value)}>
					{chartTypes.map(val=>(<option value={val} key={val}>{val}</option>))}
				</select>
			</div>
            <div>
                <div>
                  Market cap: <b>{Math.round(data.quote[Object.keys(data.quote)[0]].market_cap)} {Object.keys(data.quote)[0]}</b>
                </div>
                <div>
                   Volume (last 24h): <b>{Math.round(data.quote[Object.keys(data.quote)[0]].volume_24h)} {Object.keys(data.quote)[0]}</b>
                </div>

            </div>
			<Chart
				chartType={chartType}
				width="100%"
				height="100%"
				data={[
					['Metric', 'Value'],
					['Price (USD)',data.quote[Object.keys(data.quote)[0]].price],
					['% Change 1h',data.quote[Object.keys(data.quote)[0]].percent_change_1h],
					['% Change 24h',data.quote[Object.keys(data.quote)[0]].percent_change_24h],
					['% Change 7d',data.quote[Object.keys(data.quote)[0]].percent_change_7d],
					['% Change 30d',data.quote[Object.keys(data.quote)[0]].percent_change_30d],
					['% Change 60d',data.quote[Object.keys(data.quote)[0]].percent_change_60d],
					['% Change 90d',data.quote[Object.keys(data.quote)[0]].percent_change_60d],
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
					colors: ['#75a8ff'],
				}}
				/>
		</div>
	);
};
