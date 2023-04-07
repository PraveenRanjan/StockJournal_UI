import React from "react";

import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
} from "recharts";
import {roundNumber } from '../util'

function CustomizedLabel(props) {
    const {x, y, fill, value} = props;
   	return (<text 
               x={x} 
               y={y} 
               fontSize='x-small'
               fontWeight='bold'
               fill='purple'
               textAnchor="start">{value}</text>
    )
};

function PercentLabel(props) {
  const {x, y, fill, value} = props;
   return (<text 
             x={x} 
             y={y} 
             fontSize='x-small'
             fontWeight='bold'
             fill='purple'
             textAnchor="start">{roundNumber(value)}%</text>
  )
};

export default function SummarySymbolContributionBarClosed(props) {
  const { summaryList } = props;
  console.log('summaryList = ', summaryList);

  return (
    <div>
          <ComposedChart
          layout="vertical"
          width={500}
          height={600}
          data={summaryList}
          barSize={1}
          margin={{
            top: 10,
            right: 20,
            bottom: 5,
            left: 40
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis type="number" />
          <YAxis dataKey="symbol" type="Number" interval={0} scale="point" tick={{ fontSize: 'x-small', fontWeight: 'bold' }}/>
          <Tooltip />
          <Legend verticalAlign="top" wrapperStyle={{ lineHeight: "10px" }} />
          <Bar dataKey="sellValue" barSize={12} fill="#cddc39" name="Sell Value" label={<CustomizedLabel />}/>
          <Line dataKey="pctReturn" stroke="#ff7300" name="%Return" label={<PercentLabel/>} />
        </ComposedChart>
    </div>
  );
}