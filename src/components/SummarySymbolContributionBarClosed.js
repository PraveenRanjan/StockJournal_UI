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
} from "recharts";
import { formatNumber, roundNumber } from '../util'

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

export default function SummarySymbolContributionBarClosed(props) {
  const { summaryList } = props;
  console.log('summaryList = ', summaryList);

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
        {/* <LineChart
          width={500}
          height={600}
          data={summaryList}
          margin={{
            top: 10,
            right: 10,
            bottom: 5,
            left: 10
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="symbol" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip />
          <Legend />
          <Line yAxisId="left" type="monotone" dataKey="pctReturn" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line yAxisId="right" type="monotone" dataKey="sellValue" stroke="#82ca9d" />
        </LineChart> */}
        {/* </ResponsiveContainer> */}

        <AreaChart
            width={500}
            height={200}
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
            <XAxis dataKey="symbol" interval={0}/>
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="sellValue" stroke="#8884d8" fill="#8884d8" />
          </AreaChart>

        <p>Maybe some other content</p>


          <AreaChart
            width={500}
            height={200}
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
            <XAxis dataKey="symbol" interval={0}/>
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="pctReturn" stroke="#82ca9d" fill="#82ca9d" />
          </AreaChart>
    </div>
  );
}