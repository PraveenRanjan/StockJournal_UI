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
  Line, LabelList, Label
} from "recharts";

export default function HoldingBarDaily(props) {
  const { holdingData } = props;

  const renderCustomizedLabelPct = (props) => {
    const { content, ...rest } = props;
    return <Label {...rest} fontSize='x-small' fontWeight="Bold"  />;
  };
  

  return (
    <div>
      <ComposedChart
        width={950}
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
        <XAxis dataKey="date" angle={50} interval={0} tick={{ fontSize: 'x-small', fontWeight: 'bold' }} />
        <YAxis tick={{ fontSize: 'x-small', fontWeight: 'bold' }} angle={-40} />
        <YAxis type="number" angle={75} yAxisId="%profit" orientation="right" tick={{ fontSize: 'x-small', fontWeight: 'bold' }} />
        <Tooltip />
        <Legend verticalAlign="top" wrapperStyle={{ lineHeight: "40px", fontSize: 'small', fontWeight: 'bold' }} />
        <ReferenceLine y={0} stroke="#000" />
        <Line yAxisId="%profit" type="monotone" dataKey="profitPct" name="%Profit" stroke="#00796b" />
        <Bar dataKey="totalPortfolioValue" fill="#8884d8" name="Portfolio Value"
        >
          <LabelList
            dataKey="totalPortfolioValue"
            position="center"
            dy={11}
            offset="11"
            angle="-90"
            fill="#FFF"
            fontSize='small'
          />

            <LabelList
            dataKey="profitPct"
            position="top"
            // angle="-90"
            fill="#00796b"
            fontSize='x-small'
            fontWeight="Bold"
            content={renderCustomizedLabelPct}
          />
        </Bar>
        <Line type="monotone" dataKey="totalPortfolioValue" stroke="#0693e3" name="Portfolio Trend" />
      </ComposedChart>

      <ComposedChart
        width={950}
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
        <XAxis dataKey="date" interval={0} angle={70} tick={{ fontSize: 'x-small', fontWeight: 'bold' }} />
        <YAxis tick={{ fontSize: 'x-small', fontWeight: 'bold' }} />
        <Tooltip />
        <Legend verticalAlign="top" wrapperStyle={{ lineHeight: "40px" , fontSize: 'small', fontWeight: 'bold' }} />
        <ReferenceLine y={0} stroke="#000" />
        <Bar dataKey="dayChgPct" fill="#8884d8" name="Day Change(%)">
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
        <Line type="monotone" dataKey="dayChgPct" stroke="#ff7300" name="Day Change(%) Trend" />
      </ComposedChart>
    </div>
  );
}