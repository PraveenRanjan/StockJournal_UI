import React from "react";

import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ComposedChart,
  Line,
} from "recharts";
import { roundNumber } from '../util'

function CustomizedLabel(props) {
  const { x, y, fill, value } = props;
  return (<text
    x={x}
    y={y}
    fontSize='x-small'
    fontWeight='bold'
    fill='purple'
    textAnchor="start">{value}</text>
  )
};

function CustomizedLabelBuyValue(props) {
  const { x, y, fill, value } = props;
  return (<text
    x={x}
    y={y}
    fontSize='x-small'
    fontWeight='bold'
    fill='purple'
    position='right'
    textAnchor="end">{value}</text>
  )
};

function PercentLabel(props) {
  const { x, y, fill, value, total } = props;
  return (<text
    x={x}
    y={y}
    fontSize='x-small'
    fontWeight='bold'
    fill='blue'
    textAnchor="start">{roundNumber(value / total * 100)}</text>
  )
};

export default function SummarySymbolContributionBar(props) {
  const { summaryList } = props;
  const total = summaryList?.reduce((result, entry) => (result + entry.totalCurrValue), 0);

  return (
    <div>
      <ComposedChart
        layout="vertical"
        width={500}
        height={750}
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
        <XAxis type="number" tick={{ fontSize: 'x-small', fontWeight: 'bold' }}/>
        <YAxis dataKey="symbol" type="category" angle={-15} interval={0}  tick={{ fontSize: 'x-small', fontWeight: 'bold' }} />
        <YAxis dataKey="symbol" type="category" yAxisId="buyValue" hide />

        <Tooltip />
        <Legend verticalAlign="top" wrapperStyle={{ lineHeight: "10px" , fontSize: 'small', fontWeight: 'bold'}} />
        <Bar dataKey="totalCurrValue" barSize={10} fill="#cddc39" name={`Current Value: ${total}`} label={<CustomizedLabel />} />
        {/* <Bar dataKey="buyValue" barSize={16} yAxisId="buyValue" fill="#f0efea" name="Buy Value" label={<CustomizedLabelBuyValue />} /> */}
        <Line dataKey="totalCurrValue" stroke="#ff7300" name="%Contribution" label={<PercentLabel total={total} />} />
      </ComposedChart>
    </div>
  );
}