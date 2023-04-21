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
  Scatter,
  LineChart,
  ResponsiveContainer,
  AreaChart,
  Area,
  ReferenceLine,
} from "recharts";
import { formatNumber, roundNumber } from '../../util'

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

function RetPercentLabel(props) {
  const { x, y, fill, value, summaryList } = props;
  const elem = summaryList.filter(summary => summary.pctReturn == value)
  console.log('elem = ', elem);
  return (<text
    x={x}
    y={y}
    fontSize='x-small'
    fontWeight='bold'
    fill='blue'
    textAnchor="start">{formatNumber(elem[0].sellValue)}</text>
  )
};

export default function SummaryAreaChart(props) {
  const { summaryList } = props;
  // console.log('summaryList = ', summaryList);

  return (
    <>
      <AreaChart
        width={1500}
        height={300}
        data={summaryList}
        syncId="anyId"
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="symbol" angle={75} interval={0} tick={{ fontSize: 'x-small', fontWeight: 'bold' }} />
        <YAxis angle={-25} tick={{ fontSize: 'x-small', fontWeight: 'bold' }} />
        <Tooltip />
        <Legend verticalAlign="top" wrapperStyle={{ lineHeight: "10px", fontSize: 'small', fontWeight: 'bold' }} />
        <ReferenceLine y={0} stroke="#000" />
        <Area type="monotone" dataKey="sellValue" stackId="1" stroke="#8884d8" fill="#8884d8" />
        <Area type="monotone" dataKey="totalCurrValue" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
      </AreaChart>

      <AreaChart
        width={1500}
        height={300}
        data={summaryList}
        syncId="anyId"
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="symbol" angle={75} interval={0} tick={{ fontSize: 'x-small', fontWeight: 'bold' }} />
        <YAxis angle={-25} tick={{ fontSize: 'x-small', fontWeight: 'bold' }} />
        <Tooltip />
        <Legend verticalAlign="top" wrapperStyle={{ lineHeight: "10px", fontSize: 'small', fontWeight: 'bold' }} />
        <ReferenceLine y={0} stroke="#000" />
        <Area type="monotone" dataKey="pctReturn" stackId="1" stroke="#8884d8" fill="#8884d8" />
        <Area type="monotone" dataKey="unrealizedProfitPct" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
      </AreaChart>
    </>
  );
}