import React from "react";

import {
  Bar,
  ReferenceLine,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ComposedChart,
  Line, LabelList,
} from "recharts";

export default function HoldingBarWeek(props) {
  const { holdingData } = props;

  return (
    <div>
      <ComposedChart
        width={600}
        height={330}
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
        <XAxis dataKey="date" angle={-15} interval={0} tick={{ fontSize: 'x-small', fontWeight: 'bold' }} />
        <YAxis tick={{ fontSize: 'x-small', fontWeight: 'bold' }} angle={-40} />
        <Tooltip />
        <Legend verticalAlign="top" wrapperStyle={{ lineHeight: "40px", fontSize: 'small', fontWeight: 'bold' }} />
        <ReferenceLine y={0} stroke="#000" />
        <Bar dataKey="totalPortfolioValue" fill="#8884d8" name="Portfolio Value">
          <LabelList
            dataKey="totalPortfolioValue"
            position="center"
            dy={11}
            offset="11"
            angle="-90"
            fill="#FFF"
            fontSize='small'
          />
        </Bar>
        <Line type="monotone" dataKey="totalPortfolioValue" stroke="#0693e3" name="Portfolio Trend" />
      </ComposedChart>

      <ComposedChart
        width={600}
        height={330}
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
        <XAxis dataKey="date" interval={0} angle={-15} tick={{ fontSize: 'x-small', fontWeight: 'bold' }} />
        <YAxis tick={{ fontSize: 'x-small', fontWeight: 'bold' }} />
        <Tooltip />
        <Legend verticalAlign="top" wrapperStyle={{ lineHeight: "40px" , fontSize: 'small', fontWeight: 'bold' }} />
        <ReferenceLine y={0} stroke="#000" />
        <Bar dataKey="dayChgPct" fill="#8884d8" name="Weekly Change(%)">
          <LabelList
            dataKey="dayChgPct"
            position="center"
            dy={11}
            offset="11"
            angle="-90"
            fill="#FFF"
            fontSize='small'
          />
        </Bar>
        <Line type="monotone" dataKey="dayChgPct" stroke="#ff7300" name="Weekly Change(%) Trend" />
      </ComposedChart>
    </div>
  );
}