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
  console.log('elem = ', elem );
  return (<text
    x={x}
    y={y}
    fontSize='x-small'
    fontWeight='bold'
    fill='blue'
    textAnchor="start">{formatNumber(elem[0].sellValue)}</text>
  )
};

// const gradientOffset = () => {
//   const dataMax = Math.max(...data.map((i) => i.uv));
//   const dataMin = Math.min(...data.map((i) => i.uv));

//   if (dataMax <= 0) {
//     return 0;
//   }
//   if (dataMin >= 0) {
//     return 1;
//   }

//   return dataMax / (dataMax - dataMin);
// };

// const off = gradientOffset();

export default function SummarySymbolContributionBarClosed(props) {
  const { summaryList } = props;
  // console.log('summaryList = ', summaryList);

  return (
    <div>
      {/* <ComposedChart
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
        <YAxis dataKey="symbol" type="category" interval={0} tick={{ fontSize: 'x-small', fontWeight: 'bold' }} />
        <Tooltip />
        <Legend verticalAlign="top" wrapperStyle={{ lineHeight: "10px" }} />
        <Bar dataKey="sellValue" barSize={10} fill="#cddc39" name="Sell Value" label={<CustomizedLabel />} />
        <Line dataKey="pctReturn" stroke="#ff7300" name="%Return" label={<RetPercentLabel summaryList={summaryList}/>} />

      </ComposedChart> */}
      {/* <ResponsiveContainer width="50%" height="50%"> */}
        <LineChart
          width={1700} height={300}
          data={summaryList}
          margin={{
            top: 10,
            right: 10,
            bottom: 5,
            left: 10
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="symbol" angle={90} interval={1} tick={{ fontSize: 'x-small', fontWeight: 'bold' }}/>
          <YAxis yAxisId="left" angle={-25} tick={{ fontSize: 'x-small', fontWeight: 'bold' }}/>
          <YAxis yAxisId="right" angle={80} orientation="right" tick={{ fontSize: 'x-small', fontWeight: 'bold' }} />
          <Tooltip />
          <Legend verticalAlign="top" wrapperStyle={{ lineHeight: "10px" , fontSize: 'small', fontWeight: 'bold'}}/>
          {/* <ReferenceLine x={0} stroke="#e65100" /> */}
          <Line yAxisId="left" type="monotone"  dataKey="pctReturn" stroke="#2196f3" activeDot={{ r: 2 }} name="% Profit"/>
          {/* <Line yAxisId="right" type="monotone" dataKey="sellValue" stroke="#82ca9d" name="Sell Value"/> */}
          <Line yAxisId="right" type="monotone" dataKey="profit" name="Profit" stroke="#e91e63" />
        </LineChart>
        {/* </ResponsiveContainer> */}

        <AreaChart
            width={1700} height={350}
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
            <XAxis dataKey="symbol" angle={90} interval={1} tick={{ fontSize: 'x-small', fontWeight: 'bold' }}/>
            <YAxis angle={-70} tick={{ fontSize: 'x-small', fontWeight: 'bold' }}/>
            <Tooltip />
            <Area type="monotone" dataKey="sellValue" stroke="#8884d8" fill="#8884d8" />
          </AreaChart>
          <AreaChart
            width={1700} height={350}
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
            <XAxis dataKey="symbol" angle={90} interval={1} tick={{ fontSize: 'x-small', fontWeight: 'bold' }}/>
            <YAxis angle={-70} tick={{ fontSize: 'x-small', fontWeight: 'bold' }}/>
            <Tooltip />
            {/* <defs>
            <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset={off} stopColor="#82ca9d" stopOpacity={1} />
              <stop offset={off} stopColor="red" stopOpacity={1} />
            </linearGradient>
          </defs> */}
          <Area type="monotone" dataKey="pctReturn" fill="#82ca9d" stroke="#82ca9d" />
            {/* <Area type="monotone" dataKey="pctReturn" stroke="#000" fill="url(#splitColor)"  />  */}
          {/* fill="#82ca9d"  stroke="#82ca9d"  */}
          </AreaChart>
          <AreaChart
            width={1700} height={300}
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
            <XAxis dataKey="symbol" angle={90} interval={1} tick={{ fontSize: 'x-small', fontWeight: 'bold' }}/>
            <YAxis angle={-70} tick={{ fontSize: 'x-small', fontWeight: 'bold' }}/>
            <Tooltip />
          <Area type="monotone" dataKey="profit" fill="#0693e3" stroke="#0693e3" />
          </AreaChart>
    </div>
  );
}