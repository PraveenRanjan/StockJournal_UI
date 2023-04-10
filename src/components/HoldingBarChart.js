import React from "react";

import {
  BarChart,
  Bar,
  Brush,
  ReferenceLine,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ComposedChart,
  Line
} from "recharts";

export default function HoldingBarChart(props) {
  const { holdingData } = props;

  return (
    <div>
      <ComposedChart
        width={500}
        height={400}
        data={holdingData}
        barSize={15}
        margin={{
          top: 10,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="date" angle={-15} interval={0} tick={{ fontSize: 'x-small', fontWeight: 'bold' }}/>
        {/* <XAxis dataKey="date" xAxisId="buy" hide /> */}
        <YAxis tick={{ fontSize: 'x-small', fontWeight: 'bold' }}/>
        <Tooltip />
        <Legend verticalAlign="top" wrapperStyle={{ lineHeight: "40px" , fontSize: 'small', fontWeight: 'bold'}} />
        <ReferenceLine y={0} stroke="#000" />
        {/* <Brush dataKey="name" height={30} stroke="#8884d8" /> */}
        {/* <Bar dataKey="totalBuyValue" fill="#82ca9d" name="Buy Value" /> */}
        {/* <Bar
        type="monotone"
        dataKey="totalBuyValue"
        xAxisId="buy"
        fill="#e8e8e8"
        barSize={25}
        activeDot={{ r: 8 }}
      /> */}
        <Bar dataKey="totalPortfolioValue" fill="#8884d8" name="Portfolio Value"/>
        <Line type="monotone" dataKey="totalPortfolioValue" stroke="#0693e3" />
      </ComposedChart>

      <ComposedChart
        width={500}
        height={400}
        data={holdingData}
        barSize={15}
        margin={{
          top: 10,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" interval={0} angle={-15} tick={{ fontSize: 'x-small', fontWeight: 'bold' }}/>
        <YAxis tick={{ fontSize: 'x-small', fontWeight: 'bold' }}/>
        <Tooltip />
        <Legend verticalAlign="top" wrapperStyle={{ lineHeight: "40px" }} />
        <ReferenceLine y={0} stroke="#000" />
        {/* <Brush dataKey="name" height={30} stroke="#8884d8" /> */}
        {/* <Bar dataKey="dayChange" fill="#82ca9d" /> */}
        <Bar dataKey="dayChgPct" fill="#8884d8" />
        <Line type="monotone" dataKey="dayChgPct" stroke="#ff7300" />

      </ComposedChart>
    </div>
  );
}