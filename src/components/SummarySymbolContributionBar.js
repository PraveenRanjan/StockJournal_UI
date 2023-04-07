import React from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

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

export default function SummarySymbolContributionBar(props) {
  const { summaryList } = props;
  return (
    <div>
          <BarChart
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
          <Bar dataKey="totalCurrValue" barSize={12} fill="#cddc39" name="Current Value" label={<CustomizedLabel />}/>
        </BarChart>
    </div>
  );
}